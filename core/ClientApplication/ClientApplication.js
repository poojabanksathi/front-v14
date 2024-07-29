"use client";
import { setHash } from "@/utils/util";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientApplication({ children }) {
  const { query } = useRouter();

  const hQuery = query?.h;
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (hQuery) {
        setHash(hQuery);
        localStorage.setItem("h", hQuery);
      }
    }
  }, [query]);

  return children;
}
