import { BASE_URL, COMMON, FAQAPI } from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";
import { headers } from "next/headers";

const PersonalLoanEligibility = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/PersonalLoan/PersonalLoanEligibility/PersonalLoanEligibility"
    ),
  { ssr: false }
);
const CommonRoundedBreadcrumb = dynamic(
  () =>
    import(
      "@/app/client/component/common/CommonRoundedBreadcrumb/CommonRoundedBreadcrumb"
    ),
  { ssr: false }
);

const VedioCheck = dynamic(
  () => import("@/app/client/component/common/VedioCheck"),
  {
    ssr: false,
  }
);
const CreditBeginnerCard = dynamic(
  () =>
    import("@/app/client/component/Layout/creditCardList/CreditBeginnerCard"),
  {
    ssr: false,
  }
);
const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: false,
});

async function getData() {
  const headersList = headers();
  const lang_id = 1;
  const ref = headersList.get("referer") || "";
  const categoryUrl = "loan-eligibility";

  const req7 = { lang_id, page_url_slug: categoryUrl };
  const req6 = { lang_id, url_slug: categoryUrl };

  try {
    const [metaData, faqData] = await Promise.all([
      Axios.post(BASE_URL + COMMON?.metaDetailPage, req7),
      Axios.post(BASE_URL + FAQAPI.productFaq, req6),
    ]);

    return {
      businessmetaheadtag: metaData.data?.data || null,
      faqdata: faqData.data || null,
      referer: ref,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: error.message };
  }
}

export default async function Page() {
  const data = await getData();

  const { businessmetaheadtag, faqdata } = data;

  return (
    <div className="bg-[#F4F8FB]">
      <CommonRoundedBreadcrumb
        link1="/personal-loan"
        link1Name="Personal Loan"
        highlight2={true}
        link2Name="Eligibility"
      />
      <PersonalLoanEligibility metaResponseData={businessmetaheadtag} />
      <div className="bg-[#F4F8FB]">
        <VedioCheck productDetailsData={businessmetaheadtag} />
      </div>
      <CreditBeginnerCard longTerm={businessmetaheadtag} />
      <FAQ faqdata={faqdata} />
    </div>
  );
}
