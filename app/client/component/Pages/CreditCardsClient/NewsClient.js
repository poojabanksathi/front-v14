'use client'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import CommonBreadCrumbComponent from '@/app/client/component/common/CommonList/CommonBreadCrumbComponent'
import { useRouter } from 'next/navigation'

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})

const DynamicMobileFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})
const CreditNews = dynamic(() => import('@/app/client/component/Layout/CreditNews/CreditNews'), {
  ssr: false
})

const NewsClient = ({ businessCategorydata, CreditNewsList }) => {
  const router = useRouter()

  useEffect(() => {
    router.push('/credit-cards/i')
  }, [router])

  return (
    <>
        {/* <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div> */}
        {CreditNewsList && (
          <div className='bg-[#F4F8FB] h-auto'>
            <CommonBreadCrumbComponent
              link1={'/credit-cards'}
              link1Name='Credit Cards'
              link2={'/credit-cards/news'}
              link2Name='News'
              title={'Credit Cards News'}
            />
            <CreditNews CreditNewsList={CreditNewsList} pageTitle={'Credit Cards Latest News'} />
          </div>
        )}
        {/* <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
        </div>
      <ScrollToTop smooth color='#000' /> */}
    </>
  )
}

export default NewsClient;