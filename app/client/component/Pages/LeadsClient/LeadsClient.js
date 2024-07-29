"use client";

import LeadsArea from "@/app/client/component/Leads";
import { MainContext } from "../../Leads/MainContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LeadsClient({ productData, referer, leadsField , h}) {
const router = useRouter()
const [fieldValue, setFieldValue] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')


      const utm_details = refererUrl?.split('?')?.[1]

      const updatedLeadsField = {
        ...leadsField,
        utm_details
      }
      setFieldValue(updatedLeadsField)

      // set H
      if (h) {
        sessionStorage.setItem('h', h)
      } else sessionStorage.removeItem('h')
    }
  }, [leadsField, h])

  useEffect(() => {
    if (productData?.product_details == null) {
      router.push('/401')
    }
  }, [productData?.product_details, router])

  return (
    productData != undefined ? (
      <MainContext.Provider value={productData}>
      <LeadsArea referer={referer} leadsField={fieldValue} />
    </MainContext.Provider>
    ) : (
      <>Loading...</>
    )
  
  );
}
