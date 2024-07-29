import {
  BASE_URL,
  BUSINESSCATEGORY,
  PRODUCTSAPI,
} from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";

const LoanEligibilityResult = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/PersonalLoan/PersonalLoanEligibility/LoanEligibilityResult/LoanEligibilityResult"
    ),
  { ssr: false }
);
async function getData() {
  try {
    const slug = context?.params?.index[0];
    const lang_id = 1;
    const ref = context?.req?.headers?.referer || "";

    const ip =
      context?.req?.headers?.["x-forwarded-for"]?.split(",")?.[0] || "";
    const user_agent = context?.req?.headers?.["user-agent"] || "";

    const leadsParams = { user_agent, ip };

    const productDetailParam = {
      lang_id: 1,
      url_slug: slug,
    };
    const req41 = {
      lang_id: lang_id,
      business_category_url_slug: "personal-loan",
      offset: 0,
      limit: 200,
    };

    const apiCalls = [
      {
        name: "alternateProductResponse",
        call: Axios.post(
          BASE_URL + PRODUCTSAPI.getAlternateProduct,
          productDetailParam
        ),
      },
      {
        name: "productListResponse",
        call: Axios.post(
          BASE_URL + BUSINESSCATEGORY?.productListCategory,
          req41
        ),
      },
    ];

    const results = await Promise.all(
      apiCalls.map(async ({ name, call }) => {
        try {
          const response = await call;
          return { name, data: response.data };
        } catch (e) {
          console.error(`Error fetching ${name}:`, e);
          return { name, data: null };
        }
      })
    );

    const data = results.reduce((acc, { name, data }) => {
      acc[name] = data;
      return acc;
    }, {});

    return {
      eligibleSlug: data.alternateProductResponse || null,
      alternetRelatedproduct: data.alternateProductResponse || null,
      productList: data.productListResponse || null,
      referer: ref,
      leadsParams: leadsParams,
    };
  } catch (error) {
    return {
      productList: null,
      error: error.message,
    };
  }
}

const LoanEligibilityResultPage = async () => {
  const { eligibleSlug, alternetRelatedproduct, productList, leadsParams } =
    await getData();
  return (
    <>
      <div className="h-full bg-[#F4F8FB]">
        <LoanEligibilityResult
          productList={productList}
          leadsParams={leadsParams}
        />
      </div>
    </>
  );
};

export default LoanEligibilityResultPage;
