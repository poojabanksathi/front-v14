import { BASE_URL, COMMON, FAQAPI } from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";

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
const SimpleSavingCalculator = dynamic(
  () =>
    import(
      "@/app/client/component/common/CalculatorCards/SimpleSavingCalculator"
    ),
  {
    ssr: false,
  }
);
const VedioCheck = dynamic(
  () => import("@/app/client/component/common/VedioCheck"),
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

async function getData() {
  try {
    const lang_id = 1;
    const context_params = "simple-saving-calculator";

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
  const { businessmetaheadtag } = await getData();
  return (
    <>
      <div className="bg-[#F4F8FB] h-auto">
        <BredcrumbCalculator />
        <div className="h-auto">
          <SimpleSavingCalculator
            title={"Simple Saving Calculator"}
            metaData={businessmetaheadtag}
          />
        </div>
        {/* <VedioCheck productDetailsData={businessmetaheadtag} />
        <CalculatorBeginnerCard longTerm={businessmetaheadtag} />
        <FAQ faqdata={faqdata} /> */}
      </div>
    </>
  );
}
