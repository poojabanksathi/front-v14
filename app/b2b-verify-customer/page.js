import { B2B, BASE_URL, BUSINESSCATEGORY } from "@/utils/alljsonfile/service";
import axios from "axios";
import B2bVerifyCustomerClient from "../client/component/Pages/B2bVerifyCustomerClient/B2bVerifyCustomerClient";
import { Suspense } from "react";
import LoaderComponent from "../client/component/Partners/LoaderComponent/LoaderComponent";

export async function generateMetadata() {
  return {
    title: "B2B Verify Customer",
    description: "Verify B2B customer details",
  };
}

async function getPageData(customerId) {
  const lang_id = 1;

  const params = {
    encoded_data: customerId,
  };

  const reqParams = {
    lang_id: lang_id,
  };

  const [customerDetailsData, businessCategorydata] = await Promise.all([
    axios
      .post(BASE_URL + B2B?.b2bCustomerDetails, params)
      .then((response) => response.data)
      .catch((err) => {
        console.log("error while fetching customer details", err);
        return null;
      }),
    axios
      .post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, reqParams)
      .then((res) => res.data)
      .catch((error) => {
        console.log("err", error);
        return null;
      }),
  ]);

  return {
    customerDetails: customerDetailsData || [],
    businessCategorydata: businessCategorydata || [],
  };
}

export default async function Page({ searchParams }) {
  const customerId = searchParams.h?.replace(" ", "+") || "";
  const pageData = await getPageData(customerId);

  return (
    <Suspense fallback={<LoaderComponent />}>

  <B2bVerifyCustomerClient {...pageData} />
  </Suspense>
)
  ;
}
