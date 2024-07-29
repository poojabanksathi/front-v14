import { BASE_URL, COMMON, FAQAPI } from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";

const BredcrumbCalculator = dynamic(
  () =>
    import("@/app/client/component/common/CalculatorCards/BredcrumbCalculator"),
  {
    ssr: false,
  }
);
const LoanCalculatorEmiDetails = dynamic(
  () =>
    import(
      "@/app/client/component/common/CalculatorCards/LoanCalculatorEmiDetails"
    ),
  {
    ssr: false,
  }
);

const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: false,
});

export async function generateMetadata() {
  return {
    title: "Loan Calculator EMI Details",
  };
}

async function getData() {
  try {
    const lang_id = 1;
    const context_params = "loan-emi-calculator";

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
  const { faqdata, businessmetaheadtag } = await getData();

  return (
    <>
      <div className="bg-[#F4F8FB] h-auto">
        <BredcrumbCalculator />
        <LoanCalculatorEmiDetails metaData={businessmetaheadtag} />
        <FAQ faqdata={faqdata} />
      </div>
    </>
  );
}
