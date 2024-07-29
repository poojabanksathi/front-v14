import { BASE_URL, COMMON, FAQAPI } from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";
import HomeRupee from "../../../public/assets/home-loan-cal.svg";

const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: false,
});

const BredcrumbCalculator = dynamic(
  () =>
    import("@/app/client/component/common/CalculatorCards/BredcrumbCalculator"),
  {
    ssr: false,
  }
);
const PersonalLoanCalculator = dynamic(
  () =>
    import(
      "@/app/client/component/common/CalculatorCards/PersonalLoanCalculator"
    ),
  {
    ssr: false,
  }
);

async function getData() {
  try {
    const lang_id = 1;
    const context_params = "prefr-loan-emi-calculator";

    const req1 = { lang_id: lang_id, url_slug: context_params };

    const req2 = { lang_id: lang_id, page_url_slug: context_params };

    const [data1, data2] = await Promise.all([
      Axios.post(BASE_URL + FAQAPI.productFaq, req1),
      Axios.post(BASE_URL + COMMON?.metaDetailPage, req2),
    ]).then((responses) => responses.map((response) => response.data));

    return {
      faqdata: data1,
      businessmetaheadtag: data2?.data || {},
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      businessCategorydata: null,
      faqdata: null,
      productList: null,
      businessmetaheadtag: {},
    };
  }
}

export default async function Page() {
  const { businessmetaheadtag, faqdata } = await getData();
  return (
    <>
      <div className="bg-[#F4F8FB] h-auto">
        <BredcrumbCalculator />
        <PersonalLoanCalculator
          metaData={businessmetaheadtag}
          loanIconSrc={HomeRupee}
          calculatorName={"Prefr Personal Loan EMI Calculator"}
          info={"Plan Your Loans, Control Your Future"}
          loanname={"prefr-loan"}
        />
        <FAQ faqdata={faqdata} />
      </div>
    </>
  );
}
