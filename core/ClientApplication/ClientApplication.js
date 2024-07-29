"use client";
import { setHash } from "@/utils/util";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ClientApplication({ children }) {
  const queries = useSearchParams();
  const hQuery = queries?.get("h");
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (hQuery) {
        setHash(hQuery);
        localStorage.setItem("h", hQuery);
      }
    }
  }, [queries]);

  return children;
}
