import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'


const ContacUsv2 = dynamic(() => import('@/app/client/component/Layout/ContacUsv2'), {
  ssr: false
})

const VedioCheck = dynamic(() => import('@/app/client/component/common/VedioCheck'), {
  ssr: false
})


async function getData(slug) {
  // const last_url = context?.resolvedUrl && context?.resolvedUrl.split('/')
  // const context_params = last_url?.[last_url?.length-1]
  const context_params = 'contact-us'
  const lang_id = 1  
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';


  const req3 = {
    lang_id: lang_id
  }
  const req7 = {
    lang_id: lang_id,
    page_url_slug: context_params
  }
  try {
    const [data1, data6] = await Promise.all([
      fetch(BASE_URL + BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req3),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

      fetch(BASE_URL + COMMON?.metaDetailPage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req7),
        cache: 'no-store'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),    
    ]);

    return {
      businessCategorydata: data1,
        businessmetaheadtag:data6?.data||{},
        referer:ref,
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}




export default async function Page() {
const {businessCategorydata , businessmetaheadtag} = await getData()

  return (
    <>
      
        <div className=' bg-[#844FCF]'>
          <ContacUsv2 />
        </div>
        <div className='bg-[#F4F8FB]'>
        <VedioCheck productDetailsData={businessmetaheadtag}/>
        </div>
       
    </>
  )
}

