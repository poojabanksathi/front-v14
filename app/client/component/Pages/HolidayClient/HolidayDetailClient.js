'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useWindowSize } from '@/hooks/useWindowSize'
import Link from 'next/link'


const CommonBreadCrumbComponent = dynamic(
  () => import('@/app/client/component/common/CommonList/CommonBreadCrumbComponent'),
  {
    ssr: false
  }
)
const CreditNewsDetails = dynamic(
  () => import('@/app/client/component/Layout/CreditNews/CreditNewsDetails/CreditNewsDetails'),
  {
    ssr: false
  }
)



const HolidayDetailClient = ({ businessCategorydata, businessmetaheadtag , newsListData,  newsDetailsData, blogUrl }) => {

  const size = useWindowSize()
  const mobileSize = size?.width <= 576
  const splitArray = blogUrl?.split('-')
  const upperCase = splitArray?.map((item) => {
    return item?.charAt(0)?.toUpperCase() + item?.slice(1)
  })
  const breadCrumSlug = upperCase?.join(' ')
  const [showComponent, setShowComponent] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop && currentScrollTop > window.innerHeight / 1.2) {
        setShowComponent(true);
      } else if (currentScrollTop <= window.innerHeight / 1.2) {
        setShowComponent(false);
      }
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <>
   
      <div className='bg-[#F4F8FB] h-auto'>
        <CommonBreadCrumbComponent
          link1={'/holiday'}
          link1Name='Holiday'
          link2={`/holiday/${breadCrumSlug}`}
          link2Name={breadCrumSlug}
          title={'Holiday Details'}
        />
        <CreditNewsDetails
          blogUrl={blogUrl}
          newsDetailsData={newsDetailsData}
          newsListData={newsListData}
          holidayPage={true}
        />
      </div>
      <div className='bg-[#fff]'>

        {mobileSize && showComponent && (
          <div className='fixed bottom-0 left-0 z-[999] h-[53px] w-full justify-between items-center'>
            <div className='text-center'>
              <Link href='/credit-cards/eligibility' prefetch={false}>
                <button className='bg-[#49D49D] w-full py-[18px] lg:w-[240px]  max-[240px]:w-full  font-faktum font-semibold text-[14px] leading-[18px] tracking-wide text-[#212529]'>
                  Check Credit Card Eligibility
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default HolidayDetailClient
