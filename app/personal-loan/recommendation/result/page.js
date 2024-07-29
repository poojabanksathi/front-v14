import CommonBreadCrumbComponent from "@/app/client/component/common/CommonList/CommonBreadCrumbComponent";
import LoanRecommendationResult from "@/app/client/component/Layout/PersonalLoan/PersonalLoanRecommendation/LoanRecommendationResult/LoanRecommendationResult";
import LoaderComponent from "@/app/client/component/Partners/LoaderComponent/LoaderComponent";
import { BASE_URL, BUSINESSCATEGORY } from "@/utils/alljsonfile/service";
import Axios from "axios";
import { headers } from "next/headers";
import { Suspense } from "react";

async function getData() {
  const headersList = headers();
  const lang_id = 1;
  const url_slug = "result";
  const referer = headersList.get("referer") || null;

  const langIdParam = {
    lang_id: lang_id,
  };

  try {
    const apiCalls = [
      {
        name: "leftMenuFilterData",
        call: Axios.post(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, {
          lang_id: lang_id,
          business_category_url_slug: "personal-loan",
        }),
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
      leftMenuFilterData: data.leftMenuFilterData?.data || null,
      url_slug,
      referer,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      leftMenuFilterData: null,
      url_slug,
      referer,
      error: error.message,
    };
  }
}
export default async function Page() {
  const data = await getData();

  const { leftMenuFilterData } = data;

  return (
    <Suspense fallback={<LoaderComponent />}>

    <div className="bg-[#F4F8FB]">
      <div className="container max-[1200px]:px-0 max-[1024px]:px-0 mx-auto max-[991px]:max-w-full">
        <CommonBreadCrumbComponent
          link1={"/personal-loan"}
          link1Name="Personal Loan"
          link2={"/personal-loan/recommendation"}
          link2Name="Recommendation"
          link3={`/personal-loan/recommendation/result`}
          link3Name="Result"
        />
      </div>
      <LoanRecommendationResult leftMenuFilterData={leftMenuFilterData} />
    </div>
    </Suspense>
  );
}
