import {
  BASE_URL,
  BUSINESSCATEGORY,
  BrowseServices,
  FAQAPI,
} from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import CommonBreadCrumbComponent from "@/app/client/component/common/CommonList/CommonBreadCrumbComponent";

const PersonalLoan = dynamic(
  () => import("@/app/client/component/Layout/PersonalLoan/PersonalLoan"),
  { ssr: false }
);
const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: false,
});

async function getData(searchParams) {
  const lang_id = 1;
  const url_slug = "personal-loan";
  const page = searchParams?.page ? parseInt(searchParams.page) - 1 : 0;

  const req1 = { lang_id, business_category_url_slug: url_slug };
  const params = { ...req1, offset: page, limit: 20 };
  const fullListParams = { ...req1, offset: 0, limit: 200 };
  const serviceTabsParams = { lang_id: 1, business_category_url_slug: "" };
  const faqParams = { lang_id, url_slug };
  const langIdParam = { lang_id };

  try {
    const apiCalls = [
      {
        name: "metaResponse",
        call: Axios.post(
          BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag,
          req1
        ),
      },
      {
        name: "faqData",
        call: Axios.post(BASE_URL + FAQAPI.productFaq, faqParams),
      },
      {
        name: "personalProducts",
        call: Axios.post(
          BASE_URL + BUSINESSCATEGORY.productListCategory,
          params
        ),
      },
      {
        name: "allPersonalProducts",
        call: Axios.post(
          BASE_URL + BUSINESSCATEGORY.productListCategory,
          fullListParams
        ),
      },
      {
        name: "subCategoryTabs",
        call: Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1),
      },
      {
        name: "longFormData",
        call: Axios.post(BASE_URL + BUSINESSCATEGORY.formLongcontent, req1),
      },
      {
        name: "businessCategoryData",
        call: Axios.post(
          BASE_URL + BUSINESSCATEGORY.productCategoryLanguage,
          langIdParam
        ),
      },
      {
        name: "leftMenuFilterData",
        call: Axios.post(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, req1),
      },
      {
        name: "serviceTabs",
        call: Axios.post(
          BASE_URL + BrowseServices.serviceTabs,
          serviceTabsParams
        ),
      },
    ];

    const results = await Promise.all(
      apiCalls.map(async ({ name, call }) => {
        try {
          const response = await call;
          return { name, data: response.data };
        } catch (error) {
          return { name, data: null };
        }
      })
    );

    const data = results.reduce((acc, { name, data }) => {
      acc[name] = data;
      return acc;
    }, {});

    return {
      businessmetaheadtag: data.metaResponse?.h1_paragraph || null,
      faqData: data.faqData || null,
      personalProducts: data.personalProducts || null,
      subCategoryTabs: data.subCategoryTabs || null,
      longFormData: data.longFormData || null,
      businessCategoryData: data.businessCategoryData || null,
      leftMenuFilterData: data.leftMenuFilterData || null,
      url_slug,
      serviceTabs: data.serviceTabs || null,
      allPersonalProducts: data.allPersonalProducts || null,
    };
  } catch (error) {
    console.error("Unexpected error in getData:", error);
    return null;
  }
}

export default async function Page({ searchParams }) {
  const data = await getData(searchParams);

  if (!data || !data.personalProducts || data.personalProducts.length <= 0) {
    return notFound();
  }

  const {
    businessmetaheadtag,
    longFormData,
    personalProducts,
    faqData,
    subCategoryTabs,
    url_slug,
    serviceTabs,
    allPersonalProducts,
  } = data;

  return (
    <>
      <div className="bg-[#F4F8FB]">
        <CommonBreadCrumbComponent
          link1={"/personal-loan"}
          link1Name="Personal Loan"
        />
        <PersonalLoan
          businessmetaheadtag={businessmetaheadtag}
          personalProducts={personalProducts}
          longFormData={longFormData}
          allPersonalProducts={allPersonalProducts}
          subCategoryTabs={subCategoryTabs?.category_info}
          url_slug={url_slug}
          isSubCategoryFlow={false}
          serviceTabs={serviceTabs}
        />
      </div>
      <div className="bg-[#F4F8FB]">
        <FAQ faqdata={faqData} />
      </div>
    </>
  );
}
