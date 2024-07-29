
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON, BLOG } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import { headers } from 'next/headers'
import LoaderComponent from '../client/component/Partners/LoaderComponent/LoaderComponent'

const CreditNews = dynamic(() => import('@/app/client/component/Layout/CreditNews/CreditNews'), {
  ssr: false
})
const CommonBreadCrumbComponent = dynamic(() => import('@/app/client/component/common/CommonList/CommonBreadCrumbComponent'), {
  ssr: false
})

async function getData() {
  try {
    const lang_id = 1
    // const url_slug = context?.resolvedUrl?.split('/')?.pop()
    // const blog_url_slug = context?.resolvedUrl?.split('/')?.[1]
    const reqHeaders = headers();
    const ref = reqHeaders.get('referer') || ''; 
    const blog_url_slug = 'personal-finance'
    const url_slug = 'personal-finance'
    
    const metaDetailsParams = {
      lang_id: lang_id,
      page_url_slug: url_slug
    }
    const bussinessCatParam = {
      lang_id: lang_id
    }
    const newsReq = {
      blog_url_slug: blog_url_slug,
      identifier: 'category',
      offset: 0,
      limit: 10
    }

    const [data1, data7, metaTagsData] = await Promise.all([
      Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, bussinessCatParam),
      Axios.post(BASE_URL + COMMON?.metaDetailPage, metaDetailsParams),
      Axios.post(BASE_URL + BLOG.newsList, newsReq),
    ]).then((responses) => responses.map((response) => response.data))

    return {
      businessCategorydata: data1,
      referer: ref,
      CreditNewsList: data7,
      businessmetaheadtag: metaTagsData?.data || null
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      businessCategorydata: null,
      referer: null,
      CreditNewsList: null,
      businessmetaheadtag:  null
    };
  }
}

export default async function Page() {

  const { businessCategorydata, CreditNewsList , businessmetaheadtag } = await getData();

  return (
    <>
<Suspense fallback={<LoaderComponent />}>
      {CreditNewsList && (
        <div className='bg-[#F4F8FB] h-auto'>
          <CommonBreadCrumbComponent
            link1='/personal-finance'
            link1Name='Personal Finance'
            link2Name='Personal Finance Blogs'
            title='Personal Finance Blogs'
          />
          <CreditNews CreditNewsList={CreditNewsList} pageTitle='Personal Finance Blogs' personalFinancePage={true} />
        </div>
      )}
    </Suspense>
    </>
  )
}

