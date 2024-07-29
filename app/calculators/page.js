import {
  BASE_URL,
  BUSINESSCATEGORY,
  COMMON,
  FAQAPI,
} from "@/utils/alljsonfile/service";
import Axios from "axios";
import CommonRoundedBreadcrumb from "../client/component/common/CommonRoundedBreadcrumb/CommonRoundedBreadcrumb";
import dynamic from "next/dynamic";

const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: false,
});
const CalculatorCards = dynamic(
  () => import("@/app/client/component/common/CalculatorCards"),
  {
    ssr: false,
  }
);
const CalulatorBanner = dynamic(
  () => import("@/app/client/component/Layout/Calculator/CalulatorBanner"),
  {
    ssr: false,
  }
);

const CalculatorBeginnerCard = dynamic(
  () =>
    import("@/app/client/component/Layout/Calculator/CalculatorBeginnerCard"),
  {
    ssr: false,
  }
);

export async function generateMetadata({ params }) {
  return {
    title: "Calculators",
  };
}

async function getData() {
  try {
    const lang_id = 1;
    const context_params = "calculators";

    const req3 = { lang_id: lang_id };
    const req2 = { lang_id: lang_id, url_slug: context_params };
    const req6 = {
      lang_id: lang_id,
      business_category_url_slug: "credit-cards",
    };
    const req7 = { lang_id: lang_id, page_url_slug: context_params };

    const [data1, data2, data5, data6] = await Promise.all([
      Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3),
      Axios.post(BASE_URL + FAQAPI.productFaq, req2),
      Axios.post(BASE_URL + BUSINESSCATEGORY?.productListCategory, req6),
      Axios.post(BASE_URL + COMMON.metaDetailPage, req7),
    ]).then((responses) => responses.map((response) => response.data));

    return {
      businessCategorydata: data1,
      faqdata: data2,
      productList: data5,
      businessmetaheadtag: data6?.data || null,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      businessCategorydata: null,
      faqdata: null,
      productList: null,
      businessmetaheadtag: null,
    };
  }
}

export default async function Page() {
  const { faqdata, businessmetaheadtag } = await getData();

  return (
    <>
      <div className="bg-[#F4F8FB]">
        <div className="px-2 pt-4">
          <CommonRoundedBreadcrumb
            link1={"/calculators"}
            link1Name={"Calculators"}
            highlight1={true}
          />
        </div>
        <CalulatorBanner metaData={businessmetaheadtag} cal_head={true} />
      </div>
      <div className="bg-[#F4F8FB] h-auto">
        <CalculatorCards />
        <div className="container bg-[#F4F8FB] mx-auto max-[991px]:max-w-full max-md:px-8  max-[479px]:px-0  max-[375px]:px-0 max-[320px]:px-0 h-auto  pt-[20px] pb-[60px] justify-around max-[576px]:pt-[10px] max-[576px]:pb-[30px] max-[479px]:pt-4 max-[479px]:pb-10 max-[479px]:h-auto">
          <CalculatorBeginnerCard longTerm={businessmetaheadtag} />
        </div>
        <FAQ faqdata={faqdata} />
      </div>
    </>
  );
}
