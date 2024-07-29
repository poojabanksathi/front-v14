import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, FAQAPI } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})

const DynamicMobileFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})


const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})

const ScoreDetails = dynamic(() => import('@/app/client/component/Layout/scoreCreditCard/ScoreDetails/ScoreDetails'), {
  ssr: false
})



async function getData(slug) {


  const page_id = 1
  const lang_id = 1
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';


  const req3 = {
    lang_id: lang_id
  }
  const req2 = {
    lang_id: lang_id,
    page_id: page_id
  }


  try {
    const [data1, data2] = await Promise.all([
      fetch(BASE_URL + BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req3),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

      fetch(BASE_URL + BASE_URL + FAQAPI.productFaq, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req2),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),


    ]);

    return {
      businessCategorydata: data1,
      faqdata: data2,
      referer: ref,
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}



export default async function Page({ params }) {

  const { businessCategorydata, faqdata } = await getData(params)

  return (
    <>
              <Suspense fallback={<LoaderComponent />}>

      {/* <div className=' bg-[#844FCF]'>
          <DynamicHeader
            businessCategorydata={businessCategorydata}
          />
        </div> */}
        <div className='bg-[#F4F8FB] h-auto'>
          <ScoreDetails faqdata={faqdata} />
        </div>
      {/* <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
        </div>
      <ScrollToTop smooth color='#000' /> */}
      </Suspense>
    </>
  )
}

