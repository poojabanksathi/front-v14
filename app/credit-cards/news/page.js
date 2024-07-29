import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON, BLOG } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'

const NewsClient = dynamic(() => import('@/app/client/component/Pages/CreditCardsClient/NewsClient'), {
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
  <NewsClient
  businessCategorydata={businessCategorydata}
  CreditNewsList={CreditNewsList}
  />
  )
}