import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'



const SupportDetails = dynamic(() => import('@/app/client/component/Layout/scoreCreditCard/SupportDetails'), {
  ssr: false
})




async function getData() {
  const lang_id = 1
  const page_id = 1
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  
  const req3 = {
    lang_id: lang_id
  }
  const req2 = {
    lang_id: lang_id,
    page_id: page_id
  }
  const req41 = {
    lang_id: lang_id,
    business_category_url_slug: 'credit-cards'
  }
  const metaParams = {
    lang_id: lang_id,
    page_url_slug: 'myprofile-support'
  }


  try {
    const [data1, data2, data5, data6] = await Promise.all([
      fetch(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
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

      fetch(BASE_URL + BUSINESSCATEGORY?.productListCategory, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req41),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + COMMON?.metaDetailPage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metaParams),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),


    ]);

    return {
      businessCategorydata: data1,
      faqdata: data2,
      productList: data5,
      referer: ref,
      businessmetaheadtag: data6?.data || null
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}

export default async function Page() {
  const data = await getData()

  return (
    <>
              <Suspense fallback={<LoaderComponent />}>

      <div className='bg-[#F4F8FB] h-auto'>
        <SupportDetails faqdata={data?.faqdata} productList={data?.productList} />
      </div>
    </Suspense>
    </>
  )
}
