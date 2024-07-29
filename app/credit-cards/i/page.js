import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, BLOG } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import CommonBreadCrumbComponent from '@/app/client/component/common/CommonList/CommonBreadCrumbComponent'
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
const CreditNews = dynamic(() => import('@/app/client/component/Layout/CreditNews/CreditNews'), {
  ssr: false
})




async function getData( params ) {
  const lang_id = 1;
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  const url_slug = 'news'
  const blog_url_slug = 'credit-cards'

  const req = {
    lang_id: lang_id,
    page_url_slug: url_slug
  }
  const req3 = {
    lang_id: lang_id
  }
  const newsReq = {
    blog_url_slug: blog_url_slug,
    identifier: 'category',
    offset: 0,
    limit: 10
  }
  const requestParams = {
    lang_id: lang_id,
    business_category_url_slug: blog_url_slug,
    offset: 0,
    limit: 10
  }


  const fetchData = async (url, body) => {
    try {
      console.log(`Fetching ${url} with`, body);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        return { data: null };
      }
      const data = await response.json();
      console.log(`Response from ${url}:`, data);
      return data;
    } catch (error) {
      console.error(`Fetch error from ${url}:`, error);
      return { data: null };
    }
  };

  try {
    const [data1, data7, metaTagsData] = await Promise.all([
      fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3),
      fetchData(BASE_URL + BLOG.newsList, newsReq),
      fetchData(BASE_URL + COMMON?.metaDetailPage, req)
    ]);

    return {
      businessCategorydata: data1,
      referer: ref,
      CreditNewsList: data7,
      initialOffSet: requestParams?.offset,
      businessmetaheadtag: metaTagsData?.data || null
    };
  } catch (error) {
    console.error('General error in getData function:', error);
    return {
      notFound: true
    };
  }
}



  export default async function Page({params}) {
   const data = await getData(params);
  
    const { businessCategorydata, CreditNewsList} = data;



  return (
    <>
              <Suspense fallback={<LoaderComponent />}>

        {/* <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div> */}
        {CreditNewsList && (
          <div className='bg-[#F4F8FB] h-auto'>
            <CommonBreadCrumbComponent
              link1={'/credit-cards'}
              link1Name='Credit Cards'
              link2={'/credit-cards/i'}
              link2Name='Info'
              title={'Credit Cards News'}
            />
            <CreditNews CreditNewsList={CreditNewsList} pageTitle={'Credit Cards Information'} infoPage={true} />
          </div>
        )}
        {/* <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
        </div>
      <ScrollToTop smooth color='#000' /> */}
      </Suspense>
    </>
  )
}