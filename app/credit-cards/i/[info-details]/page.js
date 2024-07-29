import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, BLOG } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'

const InfoDetailsClient = dynamic(() => import('@/app/client/component/Pages/CreditCardsClient/InfoDetailsClient'), {
  ssr: false
})



async function getData( params ) {
  const lang_id = 1;
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
   const blog_url_slug = params?.['info-details']
  const credit_url_slug = 'credit-cards'

    const req3 = {
      lang_id: lang_id
    }
    const newsDetailsReq = {
      blog_url_slug: blog_url_slug
    }
    const newsListReq = {
      blog_url_slug: credit_url_slug,
      identifier: 'category',
      offset: 0,
      limit: 10
    }
    const requestParams = {
      lang_id: lang_id,
      business_category_url_slug: credit_url_slug,
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
    const [response1, newsListData, newsDetailsData] = await Promise.all([
      fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3),
      fetchData(BASE_URL + BLOG.newsList, newsListReq),
      fetchData(BASE_URL + BLOG?.blogPostDetail, newsDetailsReq)
    ]);

    return {
      businessCategorydata: response1 || null,
      newsDetailsData: newsDetailsData || null,
      newsListData: newsListData || null,
      referer: ref,
      blogUrl: blog_url_slug,
      initialOffSet: requestParams?.offset,
      businessmetaheadtag: newsDetailsData?.data
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
  
    const { businessCategorydata, newsDetailsData , blogUrl , newsListData } = data;
  
  return (
   <InfoDetailsClient
   businessCategorydata={businessCategorydata}
   newsDetailsData={newsDetailsData}
   blogUrl={params?.['info-details']}
   newsListData={newsListData}
   />
  )
}

