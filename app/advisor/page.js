import {
  BASE_URL,
  BUSINESSCATEGORY,
  COMMON,
  FAQAPI,
} from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";
import { headers } from "next/headers";

const HomePageV2 = dynamic(
  () => import("@/app/client/component/Layout/HomepageV2"),
  {
    ssr: false,
  }
);

async function getData() {
  const headersList = headers();
  const ref = headersList.get("referer") || "";
  const url = headersList.get("x-invoke-path") || "";
  const context_params = url.split("/")[1] || "advisor";
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "";
  const user_agent = headersList.get("user-agent") || "";
  const leadsParams = { user_agent, ip };
  const lang_id = 1;
  const url_slug = context_params;
  const page_id = 1;
  const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL;

  const req1 = {
    lang_id: lang_id,
    business_category_url_slug: url_slug,
  };
  const req2 = {
    lang_id: lang_id,
    page_id: page_id,
  };
  const req4 = {
    lang_id: lang_id,
  };
  const metaReq = {
    lang_id: lang_id,
    page_url_slug: url_slug,
  };

  try {
    const [data1, data2, data3, data4, data5, data7, data8, metaResponse] =
      await Promise.all([
        Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, req1),
        Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1),
        Axios.post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, req1),
        Axios.post(BASE_URL + FAQAPI.productFaq, req2),
        Axios.post(BASE_URL + BUSINESSCATEGORY.formLongcontent, req1),
        Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4),
        Axios.post(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, req1),
        Axios.post(BASE_URL + COMMON?.metaDetailPage, metaReq),
      ]).then((responses) => responses.map((response) => response.data));

    return {
      productlistdata: data1,
      categorytopmenulist: data2,
      faqdata: data4,
      longTerm: data5,
      businessCategorydata: data7,
      moreleftmenucredit: data8,
      referer: ref,
      leadsParams: leadsParams,
      businessmetaheadtag: metaResponse?.data || null,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default async function Index(context) {
  const data = await getData(context);

  return (
    <>
      <HomePageV2 faqdata={data?.faqdata} />
    </>
  );
}
