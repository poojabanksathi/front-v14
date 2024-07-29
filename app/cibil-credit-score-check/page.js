import React from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import { headers } from 'next/headers'

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})
const DynamicMobileFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})

const CreditScore = dynamic(() => import('@/app/client/component/Layout/CreditScore/index_error'), {
  ssr: false
})



async function getData(slug) {
  // const context_params = context?.query?.h ? 'cibil-credit-score-check' : context?.resolvedUrl?.split('/')?.pop()
  // const h = context?.query?.h || ''

  const context_params = 'cibil-credit-score-check'

  const lang_id = 1
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';

  const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0];
  const user_agent = reqHeaders.get('user-agent');

  const leadsParams = { user_agent, ip }

  const req3 = {
    lang_id: lang_id
  }
  const req2 = {
    lang_id: lang_id,
    url_slug: context_params
  }
  const req7 = {
    lang_id: lang_id,
    page_url_slug: context_params
  }

  try {
    const [data1, data2, data4] = await Promise.all([
      fetch(BASE_URL + BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req3),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

      fetch(BASE_URL + FAQAPI.productFaq, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req2),
        cache: 'no-store'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + COMMON.metaDetailPage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req7),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

   
    ]);

    return {
      businessCategorydata: data1 || {},
        faqdata: data2 || null,
        businessmetaheadtag: data4?.data || {},
        referer: ref,
        // h: h,
        leadsParams: leadsParams
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}


export default async function Page({params}) {
const { businessCategorydata , faqdata , businessmetaheadtag , leadsParams , referer} = await getData(params)

  return (
    <>
        {/* <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div> */}
        <div className='bg-white h-auto'>
          <CreditScore faqdata={faqdata} longTerm={businessmetaheadtag} metaData={businessmetaheadtag} />
        </div>
        {/* <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
        </div>
      <ScrollToTop smooth color='#000' /> */}
    </>
  )
}
