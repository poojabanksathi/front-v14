// ------------------------------------------- OLDER VERSION OF HOMEPAGE -------------------------------------------- //

import dynamic from 'next/dynamic'
import React from 'react'
import { BASE_URL, BUSINESSCATEGORY, FAQAPI } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'


const HomePageV2 = dynamic(() => import('@/app/client/component/Layout/HomepageV2'), {
  ssr: false
})



async function getData(slug) {
  const context_params = 'home'

  const lang_id = 1
  const url_slug = context_params
  const page_id = 1
  
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';

  const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0];
  const user_agent = reqHeaders.get('user-agent');

  const leadsParams = { user_agent, ip }




  const req1 = {
    lang_id: lang_id,
    business_category_url_slug: url_slug
  }
  const req2 = {
    lang_id: lang_id,
    page_id: page_id
  }
  const req4 = {
    lang_id: lang_id
  }

  try {
    const [data1, data2, data3, data4, data5, data7, data8] = await Promise.all([
      fetch(BASE_URL + BASE_URL + BUSINESSCATEGORY.productListCategory, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

      fetch(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'no-store'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + FAQAPI.productFaq, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req2),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),
      fetch(BASE_URL + BUSINESSCATEGORY.formLongcontent, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),   
       fetch(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req4),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),   
       fetch(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      })

    ]);

    return {
      productlistdata: data1,
        categorytopmenulist: data2,
        businessmetaheadtag: data3?.businessmetaheadtag || {},
        faqdata: data4,
        longTerm: data5,
        businessCategorydata: data7,
        moreleftmenucredit: data8,
        referer: ref,
        leadsParams: leadsParams
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}


export default async function Page({params}) {
const { productlistdata ,categorytopmenulist , businessmetaheadtag , faqdata , longTerm , businessCategorydata , moreleftmenucredit, leadsParams} = await getData(params)

  return (
    <>
      <HomePageV2 faqdata={faqdata} />
    
    </>
  )
}
