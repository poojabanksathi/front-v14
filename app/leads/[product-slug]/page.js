import LeadsClient from "@/app/client/component/Pages/LeadsClient/LeadsClient";
import LoaderComponent from "@/app/client/component/Partners/LoaderComponent/LoaderComponent";
import { BASE_URL, multipleSlug } from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { Suspense } from "react";

const LeadsArea = dynamic(() => import("@/app/client/component/Leads"), {
  ssr: false,
});

export default async function Leads({ params, searchParams }) {
  const { productData, referer, leadsField, h } = await getData(
    params,
    searchParams
  );

  

  return (
    <>
                  <Suspense fallback={<LoaderComponent />}>

      <div className="bg-[#F4F8FB] h-full">
        <LeadsClient
          productData={productData}
          referer={referer}
          leadsField={leadsField}
          h={h}
        />
      </div>
      </Suspense>
    </>
  );
}

async function getData(params, searchParams) {
  try {
    const productSlug = params["product-slug"];
    const h = searchParams.h || "";

    const headersList = headers();
    const referer = headersList.get("referer") || "";
    const userAgent = headersList.get("user-agent");
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] || null;

    const deviceId = userAgent?.match(
      /Android|BlackBerry|iPhone|Mac|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );

    const req = {
      lang_id: 1,
      url_slug: productSlug,
    };

    const response = await Axios.post(
      BASE_URL + multipleSlug.productAllDetails,
      req
    ).catch((error) => {
      return { data: false };
    });

    const productData = await Promise.resolve(response).then(response);

    if (productData?.data === false) {
      throw new Error("Product data not found");
    }

    return {
      productData: productData?.data,
      referer,
      h,
      leadsField: {
        device_id: deviceId,
        user_agent: userAgent,
        ip_address: ip,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
}
