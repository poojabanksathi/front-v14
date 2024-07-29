'use client';
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, BLOG } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import Link from 'next/link'
import { useWindowSize } from '@/hooks/useWindowSize'


const CommonBreadCrumbComponent = dynamic(() => import('@/app/client/component/common/CommonList/CommonBreadCrumbComponent'), {
  ssr: false
})

const PanDetails = dynamic(() => import('@/app/client/component/Layout/PanDetails'), {
  ssr: false
})

const CreditNews = dynamic(() => import('@/app/client/component/Layout/CreditNews/CreditNews'), {
  ssr: false
})
const KnowledgebaseBreadcrumb = dynamic(
  () => import('@/app/client/component/Layout/knowledgeBaseDetail/KnowledgebreadCrumb/KnowledgebreadCrumb'),
  {
    ssr: false
  }
)
const FAQ = dynamic(() => import('@/app/client/component/common/FAQ/FAQ'), {
  ssr: false
})


const PanCardClient = ({ businessCategorydata, CreditNewsList ,faqdata,  businessmetaheadtag }) => {
  const size = useWindowSize()
  const mobileSize = size?.width <= 576
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
    <div className='bg-[#F3F8F9] text-[#000]'>

      {CreditNewsList && (
        <div className='bg-[#F4F8FB] h-auto'>
          <CommonBreadCrumbComponent
            link1='/aadhar-card'
            link1Name='Aadhar Card'
            link2Name='News'
            title='Aadhar Card Blogs'
          />
          <CreditNews CreditNewsList={CreditNewsList} pageTitle='Pan Card Blogs' panCardPage={true} />
        </div>
      )}
      <div className='bg-[#F4F8FB] pl-4'>
        <KnowledgebaseBreadcrumb />
      </div>
      <PanDetails/>
      <FAQ faqdata={faqdata} />
      <div className='bg-[#fff]'>
        <div className='reletive'>
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
      </div>
    </div>
  )
}

export default PanCardClient
