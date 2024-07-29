import AadharCardClient from "@/app/client/component/Pages/AadharCardClient/AadharCardClient";
import { BASE_URL, BLOG, COMMON } from "@/utils/alljsonfile/service";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoaderComponent from "../client/component/Partners/LoaderComponent/LoaderComponent";

const AadharDetails = dynamic(
  () => import("@/app/client/component/Layout/AadharDetails"),
  {
    ssr: false,
  }
);

const KnowledgebaseBreadcrumb = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/knowledgeBaseDetail/KnowledgebreadCrumb/KnowledgebreadCrumb"
    ),
  {
    ssr: false,
  }
);

async function getAadharCardData() {
  try {
    const lang_id = 1;
    const blog_url_slug = "aadhar-card";

    const metaDetailsParams = {
      lang_id: lang_id,
      page_url_slug: blog_url_slug,
    };

    const newsReq = {
      blog_url_slug: blog_url_slug,
      identifier: "category",
      offset: 0,
      limit: 10,
    };

    const metaResponse = await fetch(BASE_URL + COMMON.metaDetailPage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metaDetailsParams),
    });

    const newsResponse = await fetch(BASE_URL + BLOG.newsList, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newsReq),
    });

    if (!metaResponse.ok || !newsResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const [metaData, newsData] = await Promise.all([
      metaResponse.json(),
      newsResponse.json(),
    ]);

    return {
      businessmetaheadtag: metaData.data || null,
      CreditNewsList: newsData.data || [],
    };
  } catch (error) {
    console.error("Error fetching Aadhar Card data:", error);
    return {
      businessmetaheadtag: null,
      CreditNewsList: [],
      businessCategorydata: [],
    };
  }
}

const AadharCardPage = async () => {
  const { businessmetaheadtag } = await getAadharCardData();

  return (
    <>
            <Suspense fallback={<LoaderComponent />}>

      <AadharCardClient>
        <div>
          <div className="bg-[#F4F8FB] h-auto">
            <div className="bg-[#F4F8FB] pl-4">
              <KnowledgebaseBreadcrumb />
            </div>
            <AadharDetails businessmetaheadtag={businessmetaheadtag} />
          </div>
        </div>
      </AadharCardClient>
      </Suspense>
    </>
  );
};

export default AadharCardPage;
