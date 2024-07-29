"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ScrollToTop from "react-scroll-to-top";

const LeadsArea = dynamic(() => import("@/app/client/component/Leads"), {
  ssr: false,
});

export default function LeadsSlugClient({
  referer,
  leadsField,
  productData,
  h,
}) {
  const [fieldValue, setFieldValue] = useState(leadsField);
  const router = useRouter();

  useEffect(() => {
    const refererUrl = localStorage?.getItem("url");
    const utm_details = refererUrl?.split("?")?.[1];

    const updatedLeadsField = {
      ...leadsField,
      utm_details,
    };
    setFieldValue(updatedLeadsField);

    if (h) {
      sessionStorage.setItem("h", h);
    } else {
      sessionStorage.removeItem("h");
    }
  }, [leadsField, h]);

  useEffect(() => {
    if (productData?.product_details == null) {
      router.push("/401");
    }
  }, [productData?.product_details, router]);

  return (
    <>
      <LeadsArea referer={referer} leadsField={fieldValue} />
      <div className="scroll-top">
        <ScrollToTop smooth color="#000" />
      </div>
    </>
  );
}
