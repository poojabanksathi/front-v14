import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON, BLOG } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import { headers } from 'next/headers'


const CreditNews = dynamic(() => import('@/app/client/component/Layout/CreditNews/CreditNews'), {
  ssr: false
})

const CommonBreadCrumbComponent = dynamic(() => import('@/app/client/component/common/CommonList/CommonBreadCrumbComponent'), {
  ssr: false
})


async function getData(slug) {
  const lang_id = 1
    // const url_slug = context?.resolvedUrl?.split('/')?.pop()
    // const blog_url_slug = context?.resolvedUrl?.split('/')?.[1]
    const reqHeaders = headers();
    const ref = reqHeaders.get('referer') || ''; 
    const blog_url_slug = 'holiday'
    const url_slug = 'holiday'

    const req = {
      lang_id: lang_id,
      page_url_slug: url_slug
    }

    const req3 = {
      lang_id: lang_id
    }
    const newsReq = {
      blog_url_slug: blog_url_slug,
      identifier: 'subcategory',
      offset: 0,
      limit: 10
    }

  try {
    const [data1, data2, data3] = await Promise.all([
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
        body: JSON.stringify(req),
        cache: 'no-store'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + BLOG?.newsList, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsReq),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

    ]);

    return {
      businessCategorydata: data1 || null,
      referer: ref || '',
      CreditNewsList: data3 || null,
      businessmetaheadtag: data2?.data || null
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}


export default async function Page({params}) {

  const { businessCategorydata, CreditNewsList , businessmetaheadtag } = await getData(params);

  return (
    <>
 
      {CreditNewsList && (
        <div className='bg-[#F4F8FB] h-auto'>
          <CommonBreadCrumbComponent
            link1={'/holiday'}
            link1Name='Holiday'
            title={'List of Government and Public Bank Holidays 2024'}
          />
          <CreditNews
            CreditNewsList={CreditNewsList}
            pageTitle={'List of Government and Public Bank Holidays 2024'}
            holidayPage={true}
          />
        </div>
      )}
   
    </>
  )
}
