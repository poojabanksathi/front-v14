import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, FAQAPI } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'


const NoCibilScore = dynamic(() => import('@/app/client/component/Layout/scoreCreditCard/NoCibilScore'), {
  ssr: false
})
const FAQ = dynamic(() => import('@/app/client/component/common/FAQ/FAQ'), {
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

  const productParams = {
    lang_id: lang_id,
    business_category_url_slug: 'credit-cards',
    offset: 0,
    limit: 200
  }


  try {
    const [data1, data2, noCibilProductsData ] = await Promise.all([
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
        body: JSON.stringify(productParams),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

    ]);

    return {
      businessCategorydata: data1,
      faqdata: data2,
      referer: ref,
      noCibilProductsData: noCibilProductsData || null
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
    
        <Suspense fallback={<LoaderComponent/>}>

      <div className='bg-[#F4F8FB] h-auto'>
        <NoCibilScore noCibilProductsData={data?.noCibilProductsData} />
      </div>
      <div className='bg-[#F4F8FB] '>
        <FAQ faqdata={data?.faqdata} />
      </div>
     </Suspense>
    </>
  )
}

