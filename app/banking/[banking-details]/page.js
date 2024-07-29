import BankingDetailsClient from "@/app/client/component/Pages/BankingClient/BankingDetailsClient";
import { BASE_URL, BLOG } from "@/utils/alljsonfile/service";
import Axios from "axios";

export async function getPageData(slug) {

  const blog_url_slug = slug?.["banking-details"];
  const banking = "banking";

  const newsDetailsReq = {
    blog_url_slug: blog_url_slug,
  };
  const newsListReq = {
    blog_url_slug: banking,
    identifier: "category",
    offset: 0,
    limit: 10,
  };

  try {

    const [newsListData, newsDetailsData] = await Promise.all([
      Axios.post(BASE_URL + BLOG.newsList, newsListReq),
      Axios.post(BASE_URL + BLOG?.blogPostDetail, newsDetailsReq),
    ]).then((responses) => responses.map((response) => response.data));

    return {
      newsDetailsData: newsDetailsData || null,
      newsListData: newsListData || null,
    };
  } catch (error) {
    return {
      props: {
        notFound: false,
      },
    };
  }
}
const BankingPage = async ({params}) => {
  const { newsDetailsData, newsListData } = await getPageData(params);
  return (
    <>
      <BankingDetailsClient
        newsDetailsData={newsDetailsData}
        newsListData={newsListData}
        blogUrl={params?.["banking-details"]}

      />
    </>
  );
};

export default BankingPage;
