import {
  BASE_URL,
  BUSINESSCATEGORY,
  BrowseServices,
  FAQAPI,
} from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";
import { headers } from "next/headers";

const SavingAccountList = dynamic(
  () => import("@/app/client/component/Layout/savingAccountList")
);
const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: false,
});

const CommonBreadCrumbComponent = dynamic(() => import("@/app/client/component/common/CommonList/CommonBreadCrumbComponent"), {
  ssr: false,
});

export async function getData(searchParams) {
  const headersList = headers();
  const referer = headersList.get("referer") || null;
  const url_slug = "bank-accounts";
  const lang_id = 1;
  const h = searchParams.h || "";
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "";
  const user_agent = headersList.get("user-agent") || "";
  const leadsParams = { user_agent, ip };
  const page = searchParams.page ? parseInt(searchParams.page) - 1 : 0;

  // PARAMS
  const req1 = {
    lang_id: lang_id,
    business_category_url_slug: url_slug,
  };
  const params = {
    lang_id: lang_id,
    business_category_url_slug: url_slug,
    offset: page,
    limit: 20,
  };
  const serviceTabsParams = {
    lang_id: 1,
    business_category_url_slug: "",
  };
  const faqParams = {
    lang_id: lang_id,
    url_slug: url_slug,
  };
  const langIdParam = {
    lang_id: lang_id,
  };

  // Fetch all data
  const [
    metaResponse,
    faqData,
    bankAccountsData,
    subCategoryTabs,
    longFormData,
    businessCategoryData,
    leftMenuFilterData,
    serviceTabs,
  ] = await Promise.all([
    Axios.post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, req1)
      .then((res) => res.data)
      .catch(() => ({})),
    Axios.post(BASE_URL + FAQAPI.productFaq, faqParams)
      .then((res) => res.data)
      .catch(() => ({})),
    Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, params)
      .then((res) => res.data)
      .catch(() => null),
    Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1)
      .then((res) => res.data)
      .catch(() => ({})),
    Axios.post(BASE_URL + BUSINESSCATEGORY.formLongcontent, req1)
      .then((res) => res.data)
      .catch(() => ({})),
    Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, langIdParam)
      .then((res) => res.data)
      .catch(() => ({})),
    Axios.post(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, req1)
      .then((res) => res.data)
      .catch(() => ({ data: "notFound" })),
    Axios.post(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams)
      .then((res) => res.data)
      .catch(() => null),
  ]);

  return {
    referer,
    businessmetaheadtag: metaResponse?.h1_paragraph || {},
    faqData: faqData || {},
    bankAccountsData: bankAccountsData || null,
    subCategoryTabs: subCategoryTabs || {},
    longFormData: longFormData || {},
    businessCategoryData: businessCategoryData || {},
    leftMenuFilterData: leftMenuFilterData || {},
    url_slug: url_slug || "",
    serviceTabs: serviceTabs || null,
    h,
    leadsParams,
  };
}

export default async function SavingsAccount({ searchParams }) {
  const {
    businessmetaheadtag,
    longFormData,
    bankAccountsData,
    faqData,
    businessCategoryData,
    leftMenuFilterData,
    subCategoryTabs,
    url_slug,
    serviceTabs,
  } = await getData(searchParams);

  if (!bankAccountsData || bankAccountsData?.product_list?.length === 0) {
    return notFound();
  }

  return (
    <>
      <div className="bg-[#F4F8FB]">
        <CommonBreadCrumbComponent
          link1={"/bank-accounts"}
          link1Name="Bank Accounts"
        />
      </div>
      {bankAccountsData?.product_list && (
        <SavingAccountList
          businessmetaheadtag={businessmetaheadtag}
          longFormData={longFormData}
          bankAccountsData={bankAccountsData?.product_list}
          leftMenuFilterData={leftMenuFilterData}
          faqdata={faqData}
          subCategoryTabs={subCategoryTabs}
          url_slug={url_slug}
          totalProducts={bankAccountsData?.total_count}
          serviceTabs={serviceTabs}
        />
      )}
      <div className="bg-[#F4F8FB]">
        <FAQ faqdata={faqData} />
      </div>
    </>
  );
}
