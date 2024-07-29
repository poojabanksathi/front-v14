// app/leads/page.js

import {
  BASE_URL,
  COMMON,
  FAQAPI,
  PRODUCTSAPI,
} from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";
import { MainContext } from "../client/component/Leads/MainContext";
import LeadsClient from "../client/component/Pages/LeadsClient/LeadsClient";
import { Suspense } from "react";
import LoaderComponent from "../client/component/Partners/LoaderComponent/LoaderComponent";

const MobileFooter = dynamic(
  () => import("@/app/client/component/common/MobileFooter"),
  { ssr: false }
);

const DynamicFooter = dynamic(
  () => import("@/app/client/component/common/Footer"),
  {
    ssr: false,
  }
);

const DynamicHeader = dynamic(
  () => import("@/app/client/component/common/Header"),
  {
    ssr: false,
  }
);

const LeadsArea = dynamic(() => import("@/app/client/component/Leads"), {
  ssr: false,
});

const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: false,
});

const CreditBeginnerCard = dynamic(
  () =>
    import("@/app/client/component/Layout/creditCardList/CreditBeginnerCard"),
  { ssr: false }
);

export default async function Leads({ searchParams }) {
  const { productData, referer, leadsField, faqData, longFormData } =
    await getData(searchParams);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <>
                  <Suspense fallback={<LoaderComponent />}>

      <div>
        <div className="bg-[#F4F8FB] ">
          <LeadsClient
            productData={productData}
            referer={referer}
            leadsField={leadsField}
          />
        </div>

        <div className="bg-[#F4F8FB] h-auto">
          <CreditBeginnerCard longTerm={longFormData} />
        </div>

        <div className="bg-[#F4F8FB] h-auto">
          <FAQ faqdata={faqData} />
        </div>
      </div>
      </Suspense>
    </>
  );
}

async function getData(searchParams) {
  try {
    const h = searchParams?.h || "";
    const url_slug = searchParams?.url_slug || "";

    const req1 = {
      lang_id: 1,
      url_slug: url_slug,
    };
    const req2 = {
      lang_id: 1, // Assuming lang_id is 1, adjust if needed
      page_url_slug: url_slug,
    };
    const faqParams = {
      lang_id: 1, // Assuming lang_id is 1, adjust if needed
      url_slug: url_slug,
    };

    const productData = await Axios.post(
      BASE_URL + PRODUCTSAPI.getProductDetails,
      req1
    ).then((res) => res?.data);

    const longForm = await Axios.post(
      BASE_URL + COMMON?.metaDetailPage,
      req2
    ).then((res) => res?.data);

    const faqData = await Axios.post(
      BASE_URL + FAQAPI.productFaq,
      faqParams
    ).then((res) => res?.data);

    if (productData?.data === false) {
      throw new Error("Product data not found");
    }

    return {
      productData: productData.data,
      referer: ref,
      leadsField: {},
      h: h,
      faqData: faqData || {},
      longFormData: longForm || {},
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
}
