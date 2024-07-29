'use client';
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})
const EligibilityCreditCardTwo = dynamic(() => import('@/app/client/component/Layout/eligibilityCreditCardTwo'), {
  ssr: false
})
const DynamicMobileFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})

const EligibilityResultClient = ({
  businessCategorydata,
  eligibleSlug,
  productList,
  leadsParams
}) => {
  
  useEffect(() => {
    if (leadsParams) {
      if (typeof window !== 'undefined') {
        sessionStorage?.setItem('leadsParams', JSON.stringify(leadsParams))
      }
    }
  }, [leadsParams])

  return (
    <>
      <div className='h-full bg-[#F4F8FB]'>
        {/* <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div> */}
        <EligibilityCreditCardTwo eligibleSlug={eligibleSlug} alternetRelatedproduct={productList} />
        {/* <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
        </div> */}
      </div>
      {/* <ScrollToTop smooth color='#000' /> */}
    </>
  )
}


export default EligibilityResultClient;