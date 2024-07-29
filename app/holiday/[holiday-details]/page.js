import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, BLOG } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'

const HolidayDetailClient = dynamic(() => import('@/app/client/component/Pages/HolidayClient/HolidayDetailClient'), {
  ssr: false
})



async function getData(slug) {

  try {

  const lang_id = 1
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  const blog_url_slug = slug?.['holiday-details']
  const credit_url_slug = 'holiday'

  const req3 = {
    lang_id: lang_id
  }
  const newsDetailsReq = {
    blog_url_slug: blog_url_slug
  }
  const newsListReq = {
    blog_url_slug: credit_url_slug,
    identifier: 'subcategory',
    offset: 0,
    limit: 10
  }
    const [response1, newsListData , newsDetailsData ] = await Promise.all([
      fetch(BASE_URL + BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req3),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

      fetch(BASE_URL + BLOG.newsList, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsListReq),
        cache: 'no-store'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + BLOG?.blogPostDetail, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsDetailsReq),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

    ]);

    return {
      businessCategorydata: response1 || null,
      newsDetailsData: newsDetailsData || null,
      newsListData: newsListData || null,
      referer: ref || '',
      blogUrl: blog_url_slug || '',
      businessmetaheadtag: newsDetailsData?.data || null
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}


export default async function Page({ params }) {

  const { businessCategorydata, businessmetaheadtag , newsListData,  newsDetailsData, blogUrl } = await getData(params);


  return (
    <>
      <HolidayDetailClient 
      businessCategorydata={businessCategorydata} 
      businessmetaheadtag={businessmetaheadtag}
      newsListData={newsListData} 
      newsDetailsData={newsDetailsData} 
      blogUrl={params?.['holiday-details']}
        />
    </>
  )
}

