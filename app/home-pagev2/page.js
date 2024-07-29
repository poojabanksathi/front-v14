import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI, PRODUCTSAPI } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'

const HomePageV2Client = dynamic(() => import('@/app/client/component/Pages/HomePageV2Client/HomePageV2Client'), {
  ssr: false
})

async function getData() {
  const lang_id = 1;
  const page_id = 1;
  const catgeory_slug = 'credit-cards';
  const device_expiry = '24 hours';
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';

  const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0];
  const user_agent = reqHeaders.get('user-agent');

  const deviceId = user_agent?.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);
  const req1 = {
    lang_id: lang_id
  }

  const req2 = {
    lang_id: lang_id,
    page_id: page_id
  }

  const req3 = {
    lang_id: 1,
    category_slug: catgeory_slug
  }

  const req4 = {
    lang_id: lang_id
  }
  
  const req7 = {
    device_id: deviceId,
    ip_address: ip,
    user_agent: user_agent,
    device_expiry: device_expiry
  }


  try {
    const [data1, data2, data3, data4, data7] = await Promise.all([
      fetch(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
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

      fetch(BASE_URL + PRODUCTSAPI.TrendingProductCategory, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req3),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + BUSINESSCATEGORY.formLongcontent, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req4),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + COMMON.registerDevice, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req7),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      })
    ]);

    return {
      businessCategorydata: data1,
        faqdata: data2,
        RecomendedTopselling: data3,
        longTermData: data4,
        registerdevicedata: data7,
        referer: ref
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}

export default async function Page() {
  const { businessCategorydata , faqdata , RecomendedTopselling , longTermData , registerdevicedata} = await getData();
  return (
    <>
     <HomePageV2Client 
     businessCategorydata={businessCategorydata} 
     faqdata={faqdata} 
     RecomendedTopselling={RecomendedTopselling} 
     longTermData={longTermData} 
     registerdevicedata={registerdevicedata}/>
    </>
  )
}
