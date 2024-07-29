'use client';
import RecommendationJourney from '@/app/client/component/Layout/RecommendationJourney/RecommendationJourney'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import ScrollToTop from 'react-scroll-to-top'

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})
const FAQ = dynamic(() => import('@/app/client/component/common/FAQ/FAQ'), {
  ssr: false
})
const CreditBeginnerCard = dynamic(() => import('@/app/client/component/Layout/creditCardList/CreditBeginnerCard'), {
  ssr: false
})
const ServiceTabs = dynamic(() => import('@/app/client/component/Layout/savingAccountList/ServiceTabs'), {
  ssr: false
})
import CommonBreadCrumbComponent from '@/app/client/component/common/CommonList/CommonBreadCrumbComponent'
import TagManager from 'react-gtm-module'
import { is_webengage_event_enabled } from '@/utils/util'

const CreditRecommendationClient = ({
  faqData,
  businessmetaheadtag,
  businessCategoryData,
  serviceTabs,
  topMenuCategories,
  creditCardsList
}) => {
  const [sourceUrl, setSourceUrl] = useState()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
      const utm_details = refererUrl?.split('?')?.[1]
      setSourceUrl(utm_details)
    }
  }, [])

const handleWebEngageEvent = (eventName, eventData) => {
    if (is_webengage_event_enabled && typeof window !== 'undefined' && window.webengage) {
      window.webengage.track(eventName, eventData);
    }
  }

  useEffect(() => {
    const handleGTM = () => {
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
  
      TagManager?.dataLayer({
        dataLayer: {
          event: 'card_recommend_started',
          source: sourceUrl || "",
          date: formattedDate,
        },
      });
    };
  
    const handleWebEngage = () => {
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
  
      handleWebEngageEvent('card_recommend_started', {
        source: sourceUrl || "",
        date: formattedDate,
      });
    };
  
    handleGTM();
    handleWebEngage();
  }, [sourceUrl]); 


  return (
    <div>
      {/* <div className=' bg-[#844FCF]'>
        <DynamicHeader businessCategorydata={businessCategoryData} />
      </div> */}
      <div className='bg-[#F4F8FB]'>
        <CommonBreadCrumbComponent
          link1={'/credit-cards'}
          link1Name='Credit Cards'
          link2={'/credit-cards/recommendation'}
          link2Name='Recommendation'
        />
        <RecommendationJourney
          topMenuCategories={topMenuCategories}
          serviceTabs={serviceTabs}
          longFormData={businessmetaheadtag}
          creditCardsList={creditCardsList}
        />
        <CreditBeginnerCard longTerm={businessmetaheadtag} />
        {serviceTabs && (
          <div className='max-sm:mx-0 container mx-auto'>
            <ServiceTabs serviceTabs={serviceTabs} position={'3'} />
          </div>
        )}
        <div className='bg-[#F4F8FB]'>
          <FAQ faqdata={faqData} />
        </div>
        {/* <MobileFooter businessCategorydata={businessCategoryData} /> */}
      </div>
      {/* <DynamicFooter businessCategorydata={businessCategoryData} /> */}
      {/* <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div> */}
    </div>
  )
}

export default CreditRecommendationClient
