import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { BASE_URL, BUSINESSCATEGORY } from '@/utils/alljsonfile/service'
import ScrollToTop from 'react-scroll-to-top'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'

const NoReportFound = dynamic(() => import('@/app/client/component/Layout/scoreCreditCard/NoReportFound'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})


async function getData(slug) {
  // const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]
  const context_params = 'report-notfound'
  const url_slug = context_params
  const lang_id = 1
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';

  const req1 = {
    lang_id: lang_id,
    business_category_url_slug: url_slug
  }
  const req4 = {
    lang_id: lang_id
  }


  try {
    const [data1, data3] = await Promise.all([
      fetch(BASE_URL + BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

      fetch(BASE_URL + BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req4),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

    
    ]);

    return {
      businessmetaheadtag: data1?.h1_paragraph || {},
      businessCategorydata: data3,
      referer:ref,
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}


export default async function Page({ params }) {

  const {businessCategorydata , businessmetaheadtag} = await getData(params)

  return (
    <>
              <Suspense fallback={<LoaderComponent />}>

      <section>
        {/* <div className=' bg-[#844FCF]'>
          <DynamicHeader
            businessCategorydata={businessCategorydata}
          />
        </div> */}
        <div className='bg-white'>
          <NoReportFound />
        </div>
      </section>
      {/* <div>
        <MobileFooter businessCategorydata={businessCategorydata} />
      </div> */}

      {/* ========= Footer ========= */}
      {/* <DynamicFooter businessCategorydata={businessCategorydata} />

      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div> */}
      </Suspense>
    </>
  )
}
