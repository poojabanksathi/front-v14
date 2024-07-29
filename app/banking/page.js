import {
  BASE_URL,
  BLOG,
  BUSINESSCATEGORY,
  COMMON,
} from "@/utils/alljsonfile/service";
import Axios from "axios";
import BankingClient from "../client/component/Pages/BankingClient/BankingClient";

export async function generateMetadata() {
  const metaDetailsParams = {
    lang_id: 1,
    page_url_slug: "banking",
  };

  const metaTagsData = await Axios.post(
    BASE_URL + COMMON?.metaDetailPage,
    metaDetailsParams
  )
    .then((res) => res.data?.data)
    .catch(() => null);

  return {
    title: metaTagsData?.meta_title || "Banking Blogs",
    description:
      metaTagsData?.meta_description || "Explore banking news and blogs",
  };
}

async function getPageData() {
  const lang_id = 1;
  const blog_url_slug = "banking";

  const bussinessCatParam = { lang_id };
  const newsReq = {
    blog_url_slug,
    identifier: "category",
    offset: 0,
    limit: 10,
  };

  try {
    const [businessCategorydata, CreditNewsList] = await Promise.all([
      Axios.post(
        BASE_URL + BUSINESSCATEGORY.productCategoryLanguage,
        bussinessCatParam
      )
        .then((res) => res.data)
        .catch(() => null),
      Axios.post(BASE_URL + BLOG.newsList, newsReq)
        .then((res) => res.data)
        .catch(() => null),
    ]);

    return { businessCategorydata, CreditNewsList };
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export default async function Page() {
  const pageData = await getPageData();

  return <BankingClient {...pageData} />;
}
