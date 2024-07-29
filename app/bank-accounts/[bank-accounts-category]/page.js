import {
  BASE_URL,
  BLOG,
  BUSINESSCATEGORY,
  BUSINESSSUBCATEGORY,
  BrowseServices,
  FAQAPI,
} from "@/utils/alljsonfile/service";
import { capitalizeFirstLetter } from "@/utils/util";
import axios from "axios";
import dynamic from "next/dynamic";

const CreditNews = dynamic(
  () => import("@/app/client/component/Layout/CreditNews/CreditNews"),
  { ssr: false }
);

const SavingAccountList = dynamic(
  () => import("@/app/client/component/Layout/savingAccountList"),
  { ssr: false }
);
const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: false,
});
const CommonBreadCrumbComponent = dynamic(
  () =>
    import(
      "@/app/client/component/common/CommonList/CommonBreadCrumbComponent"
    ),
  { ssr: false }
);

async function getData(context) {
  const lang_id = 1;
  const url_slug = context?.params?.["bank-accounts-category"] || "";
  const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const h = context?.searchParams?.h || "";
  const cat_url = context?.params?.["bank-accounts-category"]
    ? "bank-accounts"
    : "";
  const ip = context?.ip || "";
  const user_agent = context?.headers?.["user-agent"] || "";
  const leadsParams = { user_agent, ip };
  const page = context?.searchParams?.page
    ? parseInt(context.searchParams.page) - 1
    : 0;

  const req1 = {
    lang_id: lang_id,
    business_category_url_slug: url_slug,
  };
  const sub_cat_params = {
    lang_id: lang_id,
    business_category_url_slug: cat_url,
    business_sub_category_url_slug: url_slug,
    offset: page,
    limit: 20,
  };
  const faqParams = {
    lang_id: lang_id,
    sub_cat_url_slug: url_slug,
  };
  const langIdParam = {
    lang_id: lang_id,
  };
  const serviceTabsParams = {
    lang_id: 1,
    business_category_url_slug: "",
  };
  const newsReq = {
    blog_url_slug: cat_url,
    identifier: "category",
    offset: 0,
    limit: 10,
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
    newsList,
  ] = await Promise.all([
    axios
      .post(BASE_URL + BUSINESSSUBCATEGORY.productListCatTags, req1)
      .then((res) => res.data)
      .catch(() => null),
    axios
      .post(BASE_URL + FAQAPI.productFaq, faqParams)
      .then((res) => res.data)
      .catch(() => null),
    axios
      .post(BASE_URL + BUSINESSSUBCATEGORY?.productListCatSub, sub_cat_params)
      .then((res) => res.data)
      .catch(() => null),
    axios
      .post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1)
      .then((res) => res.data)
      .catch(() => null),
    axios
      .post(BASE_URL + BUSINESSSUBCATEGORY.subCatformcontent, req1)
      .then((res) => res.data)
      .catch(() => null),
    axios
      .post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, langIdParam)
      .then((res) => res.data)
      .catch(() => null),
    axios
      .post(BASE_URL + BUSINESSSUBCATEGORY.gettopmorewaydetails, req1)
      .then((res) => res.data)
      .catch(() => null),
    axios
      .post(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams)
      .then((res) => res.data)
      .catch(() => null),
    axios
      .post(BASE_URL + BLOG.newsList, newsReq)
      .then((res) => res.data)
      .catch(() => null),
  ]);

  return {
    businessmetaheadtag: metaResponse?.h1_paragraph || null,
    faqData,
    bankAccountsData,
    subCategoryTabsData: subCategoryTabs,
    longFormData: longFormData?.product_list || null,
    businessCategoryData,
    leftMenuFilterData,
    url_slug,
    serviceTabs,
    h,
    leadsParams,
    sub_cat_params,
    newsList,
  };
}

export default async function BankAccountsSubCategory(context) {
  const data = await getData(context);
  const isInfoPage = data.url_slug === "i";

  if (!isInfoPage && (!data?.bankAccountsData || !data?.bankAccountsData?.product_list?.length || !data?.businessmetaheadtag)) {
    return notFound();
  }



  return (
    <>
      {isInfoPage ? (
        <div className="bg-[#F4F8FB]">
          <CommonBreadCrumbComponent
            link1={"/bank-accounts"}
            link1Name="Bank Accounts"
            link2={`/bank-accounts/${data.url_slug}`}
            link2Name="Info"
          />
          <CreditNews
            CreditNewsList={data.newsList}
            pageTitle={"Bank Accounts Information"}
            bankPage={true}
          />
        </div>
      ) : (
        <>
          <div className="bg-[#F4F8FB]">
            <CommonBreadCrumbComponent
              link1={"/bank-accounts"}
              link1Name="Bank Accounts"
              link2={`/bank-accounts/${data.url_slug}`}
              link2Name={capitalizeFirstLetter(data.url_slug)
                ?.split("-")
                ?.join(" ")}
            />
            {data.bankAccountsData?.product_list && (
              <>
                <SavingAccountList
                  businessmetaheadtag={data.businessmetaheadtag}
                  longFormData={data.longFormData}
                  bankAccountsData={data.bankAccountsData?.product_list}
                  leftMenuFilterData={data.leftMenuFilterData}
                  faqdata={data.faqData}
                  subCategoryTabs={data.subCategoryTabsData}
                  url_slug={data.url_slug}
                  isSubCategoryFlow={true}
                  totalProducts={data.bankAccountsData?.total_count}
                  serviceTabs={data.serviceTabs}
                  sub_cat_image={true}
                  sub_cat_params={data.sub_cat_params}
                />
                <div className="bg-[#F4F8FB]">
                  <FAQ faqdata={data.faqData} />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
