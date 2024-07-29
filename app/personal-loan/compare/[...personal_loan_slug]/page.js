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

const PersonalLoanCompare = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/PersonalLoan/PersonalLoanCompare/PersonalLoanCompare"
    ),
  { ssr: false }
);
const LoanComparePdf = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/PersonalLoan/PersonalLoanCompare/LoanComparePdf/LoanComparePdf"
    ),
  { ssr: false }
);

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})

async function getData(personal_loan_slug, context_params) {
  const lang_id = 1;
  const url_slug = "";

  const req1 = { lang_id, url_slug };
  const slugOne = { lang_id: 1, url_slug: personal_loan_slug?.[0] };
  const slugTwo = { lang_id, url_slug: personal_loan_slug?.[1] };
  const slugThree = { lang_id, url_slug: personal_loan_slug?.[2] };
  const req4 = { lang_id, business_category_url_slug: context_params };

  const [faqData, slug1Data, slug2Data, slug3Data, response6, productListData] =
    await Promise.all([
      Axios.post(BASE_URL + FAQAPI.productFaq, req1)
        .then((res) => res.data)
        .catch(() => null),
      Axios.post(BASE_URL + multipleSlug.productAllDetails, slugOne)
        .then((res) => res?.data)
        .catch(() => null),
      Axios.post(BASE_URL + multipleSlug.productAllDetails, slugTwo)
        .then((res) => res?.data)
        .catch(() => null),
      Axios.post(BASE_URL + multipleSlug.productAllDetails, slugThree)
        .then((res) => res?.data)
        .catch(() => null),
      Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4)
        .then((res) => res?.data)
        .catch(() => null),
      Axios.post(BASE_URL + BUSINESSCATEGORY?.productListCategory, req4)
        .then((res) => res?.data)
        .catch(() => null),
    ]);

  return {
    faqdata: faqData,
    slug1Data,
    slug2Data,
    slug3Data,
    businessCategorydata: response6,
    productcomparedata: productListData,
  };
}

export default async function PersonalLoanComparePage({ params }) {
  const { personal_loan_slug } = params;
  const context_params = personal_loan_slug[0];

  const data = await getData(personal_loan_slug, context_params);
  const headersList = headers();
  const referer = headersList.get("referer") || "";
  const fullUrl = headersList.get("x-url") || "";
  const isPdfPage = fullUrl.split("/").pop() === "pdf";

  if (isPdfPage) {
    return (
      <LoanComparePdf
        slug1={data.slug1Data}
        slug2={data.slug2Data}
        slug3={data.slug3Data}
        productcomparedata={data.productcomparedata}
        link={`/credit-cards`}
        title="Compare Personal Loans"
      />
    );
  }

  return (
    <div>
           <div className=' bg-[#844FCF]'>
              <DynamicHeader
                slug1={data?.slug1Data}
                slug2={data?.slug2Data}
                slug3={data?.slug3Data}
                businessCategorydata={data?.businessCategorydata}
              />
            </div>
      <div className="pb-4 bg-[#F4F8FB]">
        <CommonBreadCrumbComponent
          link1={"/personal-loan"}
          link1Name="Personal Loan"
          link2Name={"Compare"}
          link2={fullUrl || `/personal-loan/compare`}
          title={"Personal Loan"}
        />
      </div>
      <div>
        <PersonalLoanCompare
          slug1Data={data.slug1Data}
          slug2Data={data.slug2Data}
          slug3Data={data.slug3Data}
          productcomparedata={data.productcomparedata}
          faqdata={data.faqdata}
        />
      </div>
    </div>
  );
}
