import {
  BASE_URL,
  BUSINESSCATEGORY,
  FAQAPI,
  multipleSlug,
} from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";
import { headers } from "next/headers";

const CommonBreadCrumbComponent = dynamic(
  () =>
    import(
      "@/app/client/component/common/CommonList/CommonBreadCrumbComponent"
    ),
  { ssr: false }
);

const CompareBankAccounts = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/savingAccountList/CompareBankAccounts"
    ),
  { ssr: false }
);
const CompareBankPdfPage = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/savingAccountList/CompareBankPdfPage"
    ),
  { ssr: false }
);
const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})

export async function getData(params, searchParams) {
  const headersList = headers();
  const { compareslug } = params;
  const context_params = "bank-accounts";
  const lang_id = 1;
  const url_slug = "";
  const ref = headersList.get("referer") || "";
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "";
  const user_agent = headersList.get("user-agent") || "";
  const leadsParams = { user_agent, ip };

  const req1 = { lang_id, url_slug };
  const slugOne = { lang_id: 1, url_slug: compareslug?.[0] };
  const slugTwo = { lang_id, url_slug: compareslug?.[1] };
  const slugThree = { lang_id, url_slug: compareslug?.[2] };
  const req4 = { lang_id, business_category_url_slug: context_params };

  const [data1, data2, data3, data4, data6, data8] = await Promise.all([
    Axios.post(BASE_URL + FAQAPI.productFaq, req1)
      .then((res) => res.data)
      .catch(() => null),
    Axios.post(BASE_URL + multipleSlug.productAllDetails, slugOne)
      .then((res) => res.data)
      .catch(() => null),
    Axios.post(BASE_URL + multipleSlug.productAllDetails, slugTwo)
      .then((res) => res.data)
      .catch(() => null),
    Axios.post(BASE_URL + multipleSlug.productAllDetails, slugThree)
      .then((res) => res.data)
      .catch(() => null),
    Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4)
      .then((res) => res.data)
      .catch(() => "notFound"),
    Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, req4)
      .then((res) => res.data)
      .catch(() => "notFound"),
  ]);

  const isPdfPage = compareslug[compareslug.length - 1] === "pdf";

  return {
    faqdata: data1,
    slug1: data2,
    slug2: data3,
    slug3: data4,
    businessCategorydata: data6,
    productcomparedata: data8,
    referer: ref,
    leadsParams,
    isPdfPage,
  };
}

export default async function CompareIndex({ params, searchParams }) {
  const {
    faqdata,
    slug1,
    slug2,
    slug3,
    businessCategorydata,
    productcomparedata,
    isPdfPage,
  } = await getData(params, searchParams);

  if (isPdfPage) {
    return (
      <CompareBankPdfPage
        faqdata={faqdata}
        slug1={slug1}
        slug2={slug2}
        slug3={slug3}
        productcomparedata={productcomparedata}
        link={`/bank-accounts`}
        title={"Compare Savings Accounts"}
      />
    );
  }

  return (
    <>
      <div className=' bg-[#844FCF]'>
              <DynamicHeader
                slug1={slug1}
                slug2={slug2}
                slug3={slug3}
                businessCategorydata={businessCategorydata}
              />
            </div>
      <div className="pb-4 bg-[#F4F8FB]">
        <CommonBreadCrumbComponent
          link1={"/bank-accounts"}
          link1Name="Bank Accounts"
          link2Name={"Compare"}
          link2={`/bank-accounts/compare/${params.compareslug.join("/")}`}
          title={"Bank Accounts"}
        />
      </div>
      <div>
        {productcomparedata && (
          <CompareBankAccounts
            faqdata={faqdata}
            slug1={slug1}
            slug2={slug2}
            slug3={slug3}
            productcomparedata={productcomparedata}
          />
        )}
      </div>
    </>
  );
}
