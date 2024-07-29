import Axios from "axios";
import {
  BASE_URL,
  BUSINESSCATEGORY,
  COMMON,
  FAQAPI,
} from "@/utils/alljsonfile/service";
import { headers } from "next/headers";

export async function getData() {
  const headersList = headers();
  const ref = headersList.get("referer") || "";
  const context_params = "credit-score";
  const lang_id = 1;
  const url_slug = context_params;
  const page_id = 1;

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
  const req6 = {
    lang_id: lang_id,
    page_url_slug: context_params,
  };

  const [data1, data2, data3, data4, data5, data7, data8] = await Promise.all([
    Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, req1).catch(
      () => ({ data: null })
    ),
    Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1).catch(() => ({
      data: null,
    })),
    Axios.post(BASE_URL + COMMON.metaDetailPage, req6).catch(() => ({
      data: null,
    })),
    Axios.post(BASE_URL + FAQAPI.productFaq, req2).catch(() => ({
      data: null,
    })),
    Axios.post(BASE_URL + BUSINESSCATEGORY.formLongcontent, req1).catch(() => ({
      data: null,
    })),
    Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4).catch(
      () => ({ data: "notFound" })
    ),
    Axios.post(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, req1).catch(
      () => ({ data: "notFound" })
    ),
  ]).then((responses) => responses.map((response) => response.data));

  return {
    productlistdata: data1,
    categorytopmenulist: data2,
    businessmetaheadtag: data3?.data,
    faqdata: data4,
    longTerm: data5,
    businessCategorydata: data7,
    moreleftmenucredit: data8,
    referer: ref,
  };
}
