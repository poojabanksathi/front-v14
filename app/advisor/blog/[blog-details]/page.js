import LoaderComponent from "@/app/client/component/Partners/LoaderComponent/LoaderComponent";
import { BASE_URL, BLOG, BUSINESSCATEGORY } from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CommonBreadCrumbComponent = dynamic(
  () =>
    import(
      "@/app/client/component/common/CommonList/CommonBreadCrumbComponent"
    ),
  { ssr: false }
);

const CreditNewsDetails = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/CreditNews/CreditNewsDetails/CreditNewsDetails"
    ),
  { ssr: false }
);

async function getData(params) {
  const lang_id = 1;
  const blog_url_slug = params["blog-details"];
  const credit_url_slug = params["blog-details"].split("/")[0];

  const req3 = { lang_id: lang_id };
  const newsDetailsReq = { blog_url_slug: blog_url_slug };
  const newsListReq = {
    blog_url_slug: credit_url_slug,
    identifier: "category",
    offset: 0,
    limit: 10,
  };
  const requestParams = {
    lang_id: lang_id,
    business_category_url_slug: "advisor",
    offset: 0,
    limit: 10,
  };

  const response1 = await Axios.post(
    BASE_URL + BUSINESSCATEGORY.productCategoryLanguage,
    req3
  )
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      console.log("error while fetching data", error);
    });

  const newsListData = await Axios.post(BASE_URL + BLOG.newsList, newsListReq)
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      console.log("Error while fetching news list data", error);
    });

  const newsDetailsData = await Axios.post(
    BASE_URL + BLOG?.blogPostDetail,
    newsDetailsReq
  )
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      console.log("error while fetching data", error);
    });

  return {
    businessCategorydata: response1 || null,
    newsDetailsData: newsDetailsData || null,
    newsListData: newsListData || null,
    blogUrl: blog_url_slug,
    initialOffSet: requestParams?.offset,
  };
}

export default async function NewsDetails({ params }) {
  const { newsDetailsData, blogUrl, newsListData } = await getData(params);

  return (
    <>
                <Suspense fallback={<LoaderComponent />}>

      <div>
        <div className="bg-[#F4F8FB] h-auto">
          <CommonBreadCrumbComponent
            link1="/advisor"
            link1Name="Advisor"
            link2="/advisor/blog"
            link2Name="Blog"
            link3={`/advisor/blog/${blogUrl}`}
            link3Name={blogUrl}
            title="Advisor Blog Details"
          />
          <CreditNewsDetails
            blogUrl={blogUrl}
            newsDetailsData={newsDetailsData}
            newsListData={newsListData}
            advisorPage={true}
          />
        </div>
      </div>
      </Suspense>
    </>
  );
}
