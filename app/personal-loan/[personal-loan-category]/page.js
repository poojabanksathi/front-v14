import {
  BASE_URL,
  BLOG,
  BUSINESSCATEGORY,
  BUSINESSSUBCATEGORY,
  BrowseServices,
  FAQAPI,
} from "@/utils/alljsonfile/service";
import { capitalizeFirstLetter } from "@/utils/util";
import Axios from "axios";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const PersonalLoanApplication = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/PersonalLoan/PersonalLoanApplication/PersonalLoanApplication"
    ),
  { ssr: false }
);
const PersonalLoan = dynamic(
  () => import("@/app/client/component/Layout/PersonalLoan/PersonalLoan"),
  { ssr: false }
);
const CreditNews = dynamic(
  () => import("@/app/client/component/Layout/CreditNews/CreditNews"),
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
  const url_slug = context.params["personal-loan-category"];
  const h = context.searchParams.h || "";
  const page = context.searchParams.page
    ? parseInt(context.searchParams.page) - 1
    : 0;
  const cat_url = "personal-loan";

  const req1 = { lang_id, business_category_url_slug: url_slug };
  const fullListParams = {
    lang_id,
    business_category_url_slug: cat_url,
    business_sub_category_url_slug: url_slug,
    offset: 0,
    limit: 200,
  };
  const sub_cat_params = {
    lang_id,
    business_category_url_slug: cat_url,
    business_sub_category_url_slug: url_slug,
    offset: page,
    limit: 20,
  };
  const faqParams = { lang_id, sub_cat_url_slug: url_slug };
  const langIdParam = { lang_id };
  const serviceTabsParams = { lang_id: 1, business_category_url_slug: "" };
  const newsReq = {
    blog_url_slug: cat_url,
    identifier: "category",
    offset: 0,
    limit: 10,
  };

  const [
    metaResponse,
    faqData,
    personalProducts,
    allPersonalProducts,
    subCategoryTabs,
    longFormData,
    businessCategoryData,
    leftMenuFilterData,
    serviceTabs,
    newsList,
  ] = await Promise.all([
    Axios.post(BASE_URL + BUSINESSSUBCATEGORY.productListCatTags, req1)
      .then((res) => res?.data)
      .catch(() => null),
    Axios.post(BASE_URL + FAQAPI.productFaq, faqParams)
      .then((res) => res?.data)
      .catch(() => null),
    Axios.post(
      BASE_URL + BUSINESSSUBCATEGORY?.productListCatSub,
      sub_cat_params
    )
      .then((res) => res?.data)
      .catch(() => null),
    Axios.post(
      BASE_URL + BUSINESSSUBCATEGORY?.productListCatSub,
      fullListParams
    )
      .then((res) => res?.data)
      .catch(() => null),
    Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1)
      .then((res) => res?.data)
      .catch(() => null),
    Axios.post(BASE_URL + BUSINESSSUBCATEGORY.subCatformcontent, req1)
      .then((res) => res?.data)
      .catch(() => null),
    Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, langIdParam)
      .then((res) => res?.data)
      .catch(() => null),
    Axios.post(BASE_URL + BUSINESSSUBCATEGORY.moreleftmenufilter, req1)
      .then((res) => res?.data)
      .catch(() => null),
    Axios.post(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams)
      .then((res) => res?.data)
      .catch(() => null),
    Axios.post(BASE_URL + BLOG.newsList, newsReq)
      .then((res) => res?.data)
      .catch(() => null),
  ]);

  return {
    businessmetaheadtag: metaResponse?.h1_paragraph || null,
    faqData,
    personalProducts,
    subCategoryTabs,
    longFormData,
    businessCategoryData,
    leftMenuFilterData,
    url_slug,
    serviceTabs,
    h,
    allPersonalProducts,
    newsList,
  };
}

export default async function PersonalLoanCategory({ params, searchParams }) {
  const data = await getData({ params, searchParams });
  const isInfoPage = params["personal-loan-category"] === "i";

  if(!isInfoPage && data?.url_slug !== "leads" && (!data?.personalProducts || !data?.personalProducts?.length <= 0)){
        return notFound()
  }

  return (
    <>
      <div className="bg-[#F4F8FB]">
        {isInfoPage ? (
          <>
            <CommonBreadCrumbComponent
              link1={"/personal-loan"}
              link1Name="Personal Loan"
              link2={`/personal-loan/${data.url_slug}`}
              link2Name={"Information"}
            />
            <CreditNews
              CreditNewsList={data.newsList}
              pageTitle={"Personal Loan Information"}
              loanPage={true}
            />
          </>
        ) : (
          <>
            <CommonBreadCrumbComponent
              link1={"/personal-loan"}
              link1Name="Personal Loan"
              link2={`/personal-loan/${data.url_slug}`}
              link2Name={
                data.url_slug === "leads"
                  ? "Leads"
                  : capitalizeFirstLetter(data.url_slug)?.split("-")?.join(" ")
              }
            />
            {data.url_slug === "leads" ? (
              <PersonalLoanApplication
                businessmetaheadtag={data.businessmetaheadtag}
              />
            ) : (
              <PersonalLoan
                businessmetaheadtag={data.businessmetaheadtag}
                personalProducts={data.personalProducts}
                longFormData={data.longFormData}
                allPersonalProducts={data.allPersonalProducts}
                subCategoryTabs={data.subCategoryTabs?.category_info}
                url_slug={data.url_slug}
                isSubCategoryFlow={true}
                serviceTabs={data.serviceTabs}
              />
            )}
          </>
        )}
      </div>
      <div className="bg-[#F4F8FB]">
        <FAQ faqdata={data.faqData} />
      </div>
    </>
  );
}
