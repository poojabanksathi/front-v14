import CommonBreadCrumbComponent from "@/app/client/component/common/CommonList/CommonBreadCrumbComponent";
import {
  BASE_URL,
  BUSINESSCATEGORY,
  BrowseServices,
  COMMON,
  FAQAPI,
} from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";
import { headers } from "next/headers";

const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: true,
});
const CreditBeginnerCard = dynamic(
  () =>
    import("@/app/client/component/Layout/creditCardList/CreditBeginnerCard"),
  { ssr: true }
);
const ServiceTabs = dynamic(
  () => import("@/app/client/component/Layout/savingAccountList/ServiceTabs"),
  { ssr: true }
);
const PersonalLoanRecommendation = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/PersonalLoan/PersonalLoanRecommendation/PersonalLoanRecommendation"
    ),
  { ssr: true }
);

async function getData() {
  const headersList = headers();
  const lang_id = 1;
  const url_slug = "loan-recommendation";
  const referer = headersList.get("referer") || null;
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "";
  const user_agent = headersList.get("user-agent") || "";
  const leadsParams = { user_agent, ip };
  const categorySlug = "personal-loan";

  const tabsParams = {
    lang_id: lang_id,
    business_category_url_slug: categorySlug,
  };

  const faqParams = {
    lang_id: lang_id,
    url_slug: url_slug,
  };

  try {
    const apiCalls = [
      {
        name: "faqData",
        call: Axios.post(BASE_URL + FAQAPI.productFaq, faqParams),
      },
      {
        name: "subCategoryTabs",
        call: Axios.post(
          BASE_URL + BUSINESSCATEGORY.categoryTopMenu,
          tabsParams
        ),
      },
      {
        name: "longFormData",
        call: Axios.post(BASE_URL + COMMON?.metaDetailPage, {
          lang_id,
          page_url_slug: url_slug,
        }),
      },
      {
        name: "serviceTabs",
        call: Axios.post(BASE_URL + BrowseServices.serviceTabs, {
          lang_id: 1,
          business_category_url_slug: "",
        }),
      },
      {
        name: "topMenuCategories",
        call: Axios.post(
          BASE_URL + BUSINESSCATEGORY.categoryTopMenu,
          tabsParams
        ),
      },
      {
        name: "personalLoanList",
        call: Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, {
          lang_id,
          business_category_url_slug: categorySlug,
          offset: 0,
          limit: 200,
        }),
      },
    ];

    const results = await Promise.all(
      apiCalls.map(async ({ name, call }) => {
        try {
          const response = await call;
          return { name, data: response.data };
        } catch (e) {
          return { name, data: null };
        }
      })
    );

    const data = results.reduce((acc, { name, data }) => {
      acc[name] = data;
      return acc;
    }, {});

    return {
      referer: data.referer || null,
      faqData: data.faqData || null,
      subCategoryTabs: data.subCategoryTabs || null,
      businessmetaheadtag: data.longFormData?.data || null,
      url_slug: data.url_slug || null,
      serviceTabs: data.serviceTabs || null,
      leadsParams: data.leadsParams || null,
      topMenuCategories: data.topMenuCategories || null,
      personalLoanList: data.personalLoanList || null,
    };
  } catch (error) {
    return null;
  }
}

export default async function Page() {
  const data = await getData();

  const {
    faqData,
    businessmetaheadtag,
    serviceTabs,
    topMenuCategories,
    personalLoanList,
  } = data;

  return (
    <div>
      <div className="bg-[#F4F8FB]">
        <CommonBreadCrumbComponent
          link1={"/personal-loan"}
          link1Name="Personal Loan"
          link2={"/personal-loan/recommendation"}
          link2Name="Recommendation"
        />
        <PersonalLoanRecommendation
          topMenuCategories={topMenuCategories}
          serviceTabs={serviceTabs}
          longFormData={businessmetaheadtag}
          personalLoanList={personalLoanList}
        />
        <CreditBeginnerCard longTerm={businessmetaheadtag} />
        {serviceTabs && (
          <div className="max-sm:mx-0 container mx-auto">
            <ServiceTabs serviceTabs={serviceTabs} position={"3"} />
          </div>
        )}
        <div className="bg-[#F4F8FB]">
          <FAQ faqdata={faqData} />
        </div>
      </div>
    </div>
  );
}
