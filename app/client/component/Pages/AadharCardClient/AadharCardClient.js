"use client";

import React, { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import Link from "next/link";

const AadharCardClient = ({ children }) => {
  const size = useWindowSize();
  const mobileSize = size?.width <= 576;
  const [showComponent, setShowComponent] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (
        currentScrollTop > lastScrollTop &&
        currentScrollTop > window.innerHeight / 1.2
      ) {
        setShowComponent(true);
      } else if (currentScrollTop <= window.innerHeight / 1.2) {
        setShowComponent(false);
      }
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <>
      {children}
      {mobileSize && showComponent && (
        <div className="fixed bottom-0 left-0 z-[999] h-[53px] w-full justify-between items-center">
          <div className="text-center">
            <Link href="/credit-cards/eligibility" prefetch={false}>
              <button className="bg-[#49D49D] w-full py-[18px] lg:w-[240px] max-[240px]:w-full font-faktum font-semibold text-[14px] leading-[18px] tracking-wide text-[#212529]">
                Check Credit Card Eligibility
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AadharCardClient;
