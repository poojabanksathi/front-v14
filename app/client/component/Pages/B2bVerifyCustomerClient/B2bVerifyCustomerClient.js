"use client";

import dynamic from "next/dynamic";
import ScrollToTop from "react-scroll-to-top";

const DynamicHeader = dynamic(
  () => import("@/app/client/component/common/Header"),
  {
    ssr: false,
  }
);
const DynamicFooter = dynamic(
  () => import("@/app/client/component/common/Footer"),
  {
    ssr: false,
  }
);
const B2bVerifyCustomer = dynamic(
  () =>
    import("@/app/client/component/Layout/B2bVerifyCustomer/B2bVerifyCustomer"),
  {
    ssr: false,
  }
);

const B2bVerifyCustomerClient = ({ customerDetails, businessCategorydata }) => {
  return (
    <>
      <div className="bg-[#F4F8FB]">
        {customerDetails?.data && (
          <B2bVerifyCustomer customerDetails={customerDetails?.data} />
        )}
      </div>

      <div className="scroll-top">
        <ScrollToTop smooth color="#000" />
      </div>
    </>
  );
};

export default B2bVerifyCustomerClient;
