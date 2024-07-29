'use client';
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
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


const NewsDetailsClient = ({ businessCategorydata, newsDetailsData, blogUrl, newsListData }) => {
  const router = useRouter()

  useEffect(() => {
    if (blogUrl) {
      router.push(`/credit-cards/i/${blogUrl}`)
    } else router.push('/credit-cards/i')
  }, [blogUrl, router])

  return (
    <>
        {/* <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div> */}
        <div className='bg-[#F4F8FB] h-auto'>
          <CommonBreadCrumbComponent
            link1={'/credit-cards'}
            link1Name='Credit Cards'
            link2={'/credit-cards/news'}
            link2Name='News'
            link3={`/credit-cards/news/${blogUrl}`}
            link3Name={blogUrl}
            title={'Credit Cards News Details'}
          />
          <CreditNewsDetails blogUrl={blogUrl} newsDetailsData={newsDetailsData} newsListData={newsListData} />
        </div>
        {/* <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
        </div>
      <ScrollToTop smooth color='#000' /> */}
    </>
  )
}

export default NewsDetailsClient
