import React, { Suspense } from 'react'
import ScrollToTop from 'react-scroll-to-top'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})

const JobApplication = dynamic(() => import('@/app/client/component/Layout/CareerPage/JobApplication/JobApplication'), {
  ssr: false
})

async function getData(slug) {

  const lang_id = 1
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';


  const req1 = {
    lang_id: lang_id
  }


  try {
    const [data1] = await Promise.all([
      fetch(BASE_URL + BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      })
   
    ]);

    return {
      businessCategorydata: data1,
      referer: ref
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}

export default async function Page({params}) {
const { businessCategorydata} = await getData(params);
  return (
    <>
          <Suspense fallback={<LoaderComponent/>}>

      {/* <div className='bg-[#844FCF]'>
        <DynamicHeader
          businessCategorydata={businessCategorydata}
        />
      </div> */}
      <div className='bg-[#F4F8FB] pb-[100px] max-sm:pb-[167px]'>
        <JobApplication />
      </div>
      {/* <DynamicFooter businessCategorydata={businessCategorydata} />
      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div> */}
      </Suspense>
    </>
  )
}
