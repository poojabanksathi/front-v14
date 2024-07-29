'use client';
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ScrollToTop from 'react-scroll-to-top';
import { useRouter } from 'next/navigation';

const RecommdationCategory = dynamic(() => import('@/app/client/component/Layout/creditCardList/RecommdationCategory'), {
    ssr: false,
});
const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
    ssr: false,
});
const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
    ssr: false,
});
const DynamicFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
    ssr: false,
});
const CreditListingBanner = dynamic(() => import('@/app/client/component/Layout/creditCardList/CreditListingBanner'), {
    ssr: false,
});
const CommonBreadCrumbComponent = dynamic(
    () => import('@/app/client/component/common/CommonList/CommonBreadCrumbComponent'),
    {
        ssr: false,
    }
);

const CreditCardsClient = ({ productlistdata,
    categorytopmenulist,
    businessmetaheadtag,
    faqdata,
    longTerm,
    businessCategorydata,
    moreleftmenucredit,
    leadsParams,
    url_slug,
    serviceTabs }) => {
    const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL;

    const contactUsRef = useRef(null);
    const bottomRefs = useRef(null);
    const mobileFooterRef = useRef(null);

    const router = useRouter();

    useEffect(() => {
        if (leadsParams) {
            if (typeof window !== 'undefined') {
                sessionStorage?.setItem('leadsParams', JSON.stringify(leadsParams));
            }
        }
    }, [leadsParams]);

    useEffect(() => {
        if (!productlistdata || productlistdata?.product_list?.length === 0) {
            router?.push('/404');
        }
    }, [productlistdata, router]);


    return (
        <>
            <section>
                {/* <div className="bg-[#844FCF]">
        <DynamicHeader businessCategorydata={businessCategorydata} />
      </div> */}
                <div className="bg-[#F4F8FB] pb-4">
                    <CommonBreadCrumbComponent link1={'/credit-cards'} link1Name="Credit Cards" />
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
                <div ref={contactUsRef}></div>
                {/* <div ref={mobileFooterRef}>
        <MobileFooter businessCategorydata={businessCategorydata} />
      </div> */}
            </div>
            {/* <div ref={bottomRefs}>
      <DynamicFooter businessCategorydata={businessCategorydata} />
      <div className="scroll-top">
        <ScrollToTop smooth color="#000" />
      </div>
    </div> */}
        </>
    )
}

export default CreditCardsClient;