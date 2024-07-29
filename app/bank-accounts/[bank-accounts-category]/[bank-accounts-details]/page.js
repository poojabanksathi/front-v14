// app/bank-accounts/[bank-accounts-category]/[bank-accounts-details]/page.js

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

const CreditNewsDetails = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/CreditNews/CreditNewsDetails/CreditNewsDetails"
    ),
  { ssr: false }
);
const SavingAccountsDetails = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/savingAccountList/SavingAccountsDetails/SavingAccountsDetails"
    ),
  { ssr: false }
);
const CommonBreadCrumbComponent = dynamic(
  () =>
    import(
      "@/app/client/component/common/CommonList/CommonBreadCrumbComponent"
    ),
  { ssr: false }
);

const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: false,
});

async function getData(context) {
  const lang_id = 1;
  const url_slug = context.params["bank-accounts-details"] || "";
  const categoryUrl = context.params["bank-accounts-category"] || "";
  const ip = context.ip || "";
  const user_agent = context?.headers?.["user-agent"] || "";
  const leadsParams = { user_agent, ip };
  const offset = 0;
  const limitdata = 5;
  const sort_type = "updated_at";
  const sort_order = "asc";

  const device_id = getDeviceIdCookie(context.cookies);

  // Define all request parameters
  const reqParams = { lang_id };
  const metaReq = { lang_id, business_category_url_slug: url_slug };
  const faqParams = { lang_id, url_slug };
  const pdpParams = { lang_id, url_slug, device_id };
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

  // Fetch all data concurrently
  const [
    metaResponse,
    faqData,
    businessCategorydata,
    topMenuData,
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
      .post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, reqParams)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + multipleSlug.productAllDetails, pdpParams)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + PRODUCTSAPI.productformLongcontent, faqParams)
      .then((res) => res?.data)
      .catch(() => null),
    axios
      .post(BASE_URL + PRODUCTSAPI.getAlternateProduct, faqParams)
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
    leadsParams,
    newsDetailsData,
    newsListData,
  };
}

export default async function SavingsAccountsDetails(context) {
  const data = await getData(context);
  const isInfoPage = data.categoryUrl === "i";

  if (!isInfoPage && !data.productDetailsData?.product_details) {
    notFound();
  }

  // product json ld schema
  const addProductJsonLd = () => {
    const reviewCount =
      data.overallRatingData?.data?.total_reviews > 0
        ? data.overallRatingData?.data?.total_reviews
        : 1;
    const productSchemaJson = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: data.productDetailsData?.product_details?.card_name || "",
      description: data.productDetailsData?.product_details?.card_name || "",
      review: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: data.productDetailsData?.product_details?.rating || "5",
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: data.productDetailsData?.product_details?.publisher_name || "",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: data.productDetailsData?.product_details?.rating || "5",
        reviewCount: reviewCount,
      },
    };
    return JSON.stringify(productSchemaJson);
  };

  return (
    <div>
      {data.productDetailsData?.product_details && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: addProductJsonLd() }}
        />
      )}

      <div className="bg-[#F4F8FB]">
        {isInfoPage ? (
          <>
            <CommonBreadCrumbComponent
              link1={"/bank-accounts"}
              link1Name="Bank Accounts"
              link2={`/bank-accounts/${data.categoryUrl}`}
              link2Name="Info"
              link3Name={capitalizeFirstLetter(data.pdpUrl)
                ?.split("-")
                ?.join(" ")}
              isDetailsPage={true}
            />
            <CreditNewsDetails
              blogUrl={data.pdpUrl}
              newsDetailsData={data.newsDetailsData}
              newsListData={data.newsListData}
              bankPage={true}
            />
          </>
        ) : (
          <>
            <CommonBreadCrumbComponent
              link1={"/bank-accounts"}
              link1Name="Bank Accounts"
              link2={`/bank-accounts/${data.categoryUrl}`}
              link2Name={capitalizeFirstLetter(data.categoryUrl)
                ?.split("-")
                ?.join(" ")}
              link3Name={capitalizeFirstLetter(data.pdpUrl)
                ?.split("-")
                ?.join(" ")}
              isDetailsPage={true}
            />
            {data.productDetailsData?.product_details && (
              <SavingAccountsDetails
                productDetailsData={data.productDetailsData}
                longFormData={data.longFormData}
                relatedAccountsData={data.relatedAccountsData}
                reviewsData={data.reviewsData?.all_review}
                overallRatingData={data.overallRatingData?.data}
                serviceTabs={data.serviceTabs}
                CONS_PROS={data.CONS_PROS}
                url_slug={data.pdpUrl}
              />
            )}
          </>
        )}
      </div>
      <div className="bg-[#F4F8FB]">
        <FAQ faqdata={data.faqData} />
      </div>
    </div>
  );
}
