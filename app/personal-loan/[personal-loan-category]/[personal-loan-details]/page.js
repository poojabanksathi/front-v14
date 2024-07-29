import LoaderComponent from "@/app/client/component/Partners/LoaderComponent/LoaderComponent";
import {
  BASE_URL,
  BLOG,
  BrowseServices,
  BUSINESSCATEGORY,
  FAQAPI,
  multipleSlug,
  PRODUCTSAPI,
} from "@/utils/alljsonfile/service";
import { capitalizeFirstLetter, getDeviceIdCookie } from "@/utils/util";
import axios from "axios";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const CommonBreadCrumbComponent = dynamic(
  () =>
    import(
      "@/app/client/component/common/CommonList/CommonBreadCrumbComponent"
    ),
  { ssr: false }
);
const PersonalLoanApplication = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/PersonalLoan/PersonalLoanApplication/PersonalLoanApplication"
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

const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: false,
});
const PersonalLoanDetails = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/PersonalLoan/PersonalLoanDetails/PersonalLoanDetails"
    ),
  { ssr: false }
);

async function getData(context) {
  const lang_id = 1;
  const url_slug = context.params["personal-loan-details"];
  const categoryUrl = context.params["personal-loan-category"];
  const offset = 0;
  const limitdata = 5;
  const sort_type = "updated_at";
  const sort_order = "asc";
  const device_id = getDeviceIdCookie(context.cookies);

  const reqParams = { lang_id };
  const metaReq = { lang_id, business_category_url_slug: url_slug };
  const faqParams = { lang_id, url_slug };
  const pdpParams = { lang_id, url_slug, device_id };
  const params = { lang_id, url_slug };
  const reviewsParams = {
    product_url_slug: url_slug,
    sort_type,
    sort_order,
    lang_id,
    offset,
    limit: limitdata,
  };
  const overallRatingParams = { product_url_slug: url_slug, lang_id };
  const serviceTabsParams = { lang_id: 1, business_category_url_slug: "" };
  const cons_pros_params = { lang_id: 1, url_slug };
  const newsDetailsReq = { blog_url_slug: url_slug };
  const newsListReq = {
    blog_url_slug: categoryUrl,
    identifier: "category",
    offset: 0,
    limit: 10,
  };

  const [
    metaResponse,
    faqData,
    businessCategorydata,
    productDetailsData,
    longFormData,
    relatedAccountsData,
    reviewsData,
    overallRatingData,
    CONS_PROS,
    serviceTabs,
    newsListData,
    newsDetailsData,
  ] = await Promise.all([
    axios
      .post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, metaReq)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + FAQAPI.productFaq, faqParams)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, reqParams)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + multipleSlug.productAllDetails, pdpParams)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + PRODUCTSAPI.productformLongcontent, params)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + PRODUCTSAPI.getAlternateProduct, params)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + PRODUCTSAPI.getAllReview, reviewsParams)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + PRODUCTSAPI.getOverallRating, overallRatingParams)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + BrowseServices.consProsOfProduct, cons_pros_params)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + BLOG.newsList, newsListReq)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + BLOG?.blogPostDetail, newsDetailsReq)
      .then((res) => res?.data)
      .catch(() => null),
  ]);

  return {
    businessCategorydata,
    businessmetaheadtag:
      metaResponse?.h1_paragraph || productDetailsData?.product_details || null,
    faqData,
    productDetailsData,
    pdpUrl: url_slug,
    categoryUrl,
    longFormData,
    relatedAccountsData,
    reviewsData,
    overallRatingData,
    serviceTabs,
    CONS_PROS,
    newsDetailsData,
    newsListData,
  };
}

export default async function PersonalLoanDetailsPage({
  params,
  searchParams,
}) {
  const data = await getData({ params, searchParams, cookies: {} }); // You'll need to implement a way to get cookies in App Router
  const isInfoPage = params["personal-loan-category"] === "i";
  const hasLeads = data.categoryUrl === "leads";

  if(!isInfoPage && !hasLeads && (!data?.productDetailsData || !data?.productDetailsData?.product_details?.length <= 0)){
        return notFound()
  }

  return (
    <>
    <Suspense fallback={<LoaderComponent />}>

      <div className="bg-[#F4F8FB]">
        {isInfoPage ? (
          <div className="bg-[#F4F8FB]">
            <CommonBreadCrumbComponent
              link1={"/personal-loan"}
              link1Name="Personal Loan"
              link2={`/personal-loan/${data.categoryUrl}`}
              link2Name={capitalizeFirstLetter(data.categoryUrl)
                ?.split("-")
                ?.join(" ")}
            />
            <CreditNewsDetails
              blogUrl={data.pdpUrl}
              newsDetailsData={data.newsDetailsData}
              newsListData={data.newsListData}
              loanPage={true}
              pathRedirect="/personal-loan/eligibility"
              personalLoan={true}
            />
          </div>
        ) : hasLeads ? (
          <>
            <CommonBreadCrumbComponent
              link1={"/personal-loan"}
              link1Name="Personal Loan"
              link2={`/personal-loan/${data.categoryUrl}`}
              link2Name={"Leads"}
            />
            <PersonalLoanApplication
              businessmetaheadtag={data.businessmetaheadtag}
              productDetailsData={data.productDetailsData}
              url_slug={data.pdpUrl}
            />
          </>
        ) : (
          <div className="bg-[#F4F8FB]">
            <CommonBreadCrumbComponent
              link1={"/personal-loan"}
              link1Name="Personal Loan"
              link3Name={
                data.productDetailsData?.product_details?.card_name ||
                capitalizeFirstLetter(data.pdpUrl)?.split("-")?.join(" ")
              }
              isDetailsPage={true}
            />
            <div className="mt-[28px]">
              <PersonalLoanDetails
                productDetailsData={data.productDetailsData}
                longFormData={data.longFormData}
                relatedAccountsData={data.relatedAccountsData}
                reviewsData={data.reviewsData?.all_review}
                overallRatingData={data.overallRatingData}
                serviceTabs={data.serviceTabs}
                CONS_PROS={data.CONS_PROS}
                url_slug={data.pdpUrl}
              />
            </div>
            <FAQ faqdata={data.faqData} />
          </div>
        )}
      </div>
      <div></div>
      </Suspense>
    </>
  );
}
