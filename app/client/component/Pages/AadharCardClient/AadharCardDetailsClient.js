"use client";

import { useWindowSize } from "@/hooks/useWindowSize";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";

const KnowledgebaseBreadcrumb = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/knowledgeBaseDetail/KnowledgebreadCrumb/KnowledgebreadCrumb"
    ),
  { ssr: false }
);

const CreditNewsDetails = dynamic(
  () =>
    import(
      "@/app/client/component/Layout/CreditNews/CreditNewsDetails/CreditNewsDetails"
    ),
  { ssr: false }
);

const AadharCardDetailsClient = ({
  newsDetailsData,
  blogUrl,
  newsListData,
}) => {
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
      <div>
        <div className="bg-[#F4F8FB] h-auto">
          <div className="bg-[#F4F8FB] pl-4">
            <KnowledgebaseBreadcrumb />
          </div>
          <CreditNewsDetails
            blogUrl={blogUrl}
            newsDetailsData={newsDetailsData}
            newsListData={newsListData}
            infoPage={true}
            aadharPage={true}
          />
        </div>
        <div className="bg-[#fff]">
          {mobileSize && showComponent && (
            <div className="fixed bottom-0 left-0 z-[999] h-[53px] w-full justify-between items-center">
              <div className="text-center">
                <Link href="/credit-cards/eligibility" prefetch={false}>
                  <button className="bg-[#49D49D] w-full py-[18px] lg:w-[240px]  max-[240px]:w-full  font-faktum font-semibold text-[14px] leading-[18px] tracking-wide text-[#212529]">
                    Check Credit Card Eligibility
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <ScrollToTop smooth color="#000" />
    </>
  );
};

export default AadharCardDetailsClient;
