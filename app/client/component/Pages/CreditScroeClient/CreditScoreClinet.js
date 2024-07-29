"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const RecommdationCategory = dynamic(
  () =>
    import("@/app/client/component/Layout/creditCardList/RecommdationCategory"),
  { ssr: false }
);

const CreditListingBanner = dynamic(
  () =>
    import("@/app/client/component/Layout/creditCardList/CreditListingBanner"),
  { ssr: false }
);
const CommonBreadCrumbComponent = dynamic(
  () =>
    import(
      "@/app/client/component/common/CommonList/CommonBreadCrumbComponent"
    ),
  { ssr: false }
);

export default function CreditScoreClient({
  productlistdata,
  categorytopmenulist,
  businessmetaheadtag,
  faqdata,
  longTerm,
  moreleftmenucredit,
  leadsParams,
  url_slug,
  serviceTabs,
  h,
}) {
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL;

  const contactUsRef = useRef(null);
  const bottomRefs = useRef(null);
  const mobileFooterRef = useRef(null);

  useEffect(() => {
    if (leadsParams) {
      sessionStorage?.setItem("leadsParams", JSON.stringify(leadsParams));
    }
  }, [leadsParams]);

  return (
    <>
      <section>
        <div className="bg-[#F4F8FB] pb-4">
          <CommonBreadCrumbComponent
            link1={"/credit-cards"}
            link1Name="Credit Cards"
          />
        </div>
        <div className="bg-[#F4F8FB]">
          <CreditListingBanner
            businessmetaheadtag={businessmetaheadtag}
            src={`${Img_URL}/${businessmetaheadtag?.product_image}`}
            linesToShow={2}
            paddingTop={true}
          />
        </div>
      </section>
      <div>
        <RecommdationCategory
          productlistdata={productlistdata}
          categorytopmenulist={categorytopmenulist}
          faqdata={faqdata}
          longTerm={longTerm}
          moreleftmenucredit={moreleftmenucredit}
          businessmetaheadtag={businessmetaheadtag}
          url_slug={url_slug}
          serviceTabs={serviceTabs}
          contactUsRef={contactUsRef}
          bottomRefs={bottomRefs}
          mobileFooterRef={mobileFooterRef}
        />
      </div>
    </>
  );
}
