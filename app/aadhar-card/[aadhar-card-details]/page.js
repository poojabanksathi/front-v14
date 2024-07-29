import AadharCardDetailsClient from "@/app/client/component/Pages/AadharCardClient/AadharCardDetailsClient";
import { BASE_URL, BLOG } from "@/utils/alljsonfile/service";
import Axios from "axios";

export async function generateMetadata({ params }) {
  const newsDetailsReq = {
    blog_url_slug: params.slug,
  };

  const newsDetailsData = await Axios.post(
    BASE_URL + BLOG?.blogPostDetail,
    newsDetailsReq
  )
    .then((res) => res?.data)
    .catch((error) => {
      console.log("error while fetching data", error);
      return null;
    });

  return {
    title: newsDetailsData?.data?.meta_title || "Default Title",
    description:
      newsDetailsData?.data?.meta_description || "Default Description",
  };
}

async function getPageData(slug) {
  const aadharSlug = "aadhar-card";

  const newsDetailsReq = { blog_url_slug: slug };
  const newsListReq = {
    blog_url_slug: aadharSlug,
    identifier: "category",
    offset: 0,
    limit: 10,
  };

  const [newsListData, newsDetailsData] = await Promise.all([
    Axios.post(BASE_URL + BLOG.newsList, newsListReq)
      .then((res) => res?.data)
      .catch((error) => {
        console.log("Error while fetching news list data", error);
        return null;
      }),
    Axios.post(BASE_URL + BLOG?.blogPostDetail, newsDetailsReq)
      .then((res) => res?.data)
      .catch((error) => {
        console.log("error while fetching data", error);
        return null;
      }),
  ]);

  return { newsListData, newsDetailsData };
}

export default async function Page({ params }) {
  const { newsListData, newsDetailsData } = await getPageData(params.slug);

  return (
    <AadharCardDetailsClient
      newsDetailsData={newsDetailsData}
      blogUrl={params.slug}
      newsListData={newsListData}
    />
  );
}
