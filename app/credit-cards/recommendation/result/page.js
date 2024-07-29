import { BASE_URL, BUSINESSCATEGORY } from '@/utils/alljsonfile/service'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'

const RecommendationResultClient = dynamic(() => import('@/app/client/component/Pages/CreditCardsClient/RecommendationResultClient'), {
  ssr: false
})


async function getData( params ) {
  const lang_id = 1;
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  
  const url_slug = 'result'

  const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0];
  const user_agent = reqHeaders.get('user-agent');

  const leadsParams = { user_agent, ip }


  const filterParam = {
    lang_id: lang_id,
    business_category_url_slug: 'credit-cards'
  }

  const langIdParam = {
    lang_id: lang_id
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
    const [businessCategoryData, leftMenuFilterData] = await Promise.all([
      fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, langIdParam),
      fetchData(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, filterParam),

    ]);

    return {
      referer: ref,
      businessCategoryData: businessCategoryData || null,
      url_slug: url_slug || '',
      // h: h,
      leadsParams: leadsParams,
      leftMenuFilterData: leftMenuFilterData
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

  const { businessCategoryData,  leftMenuFilterData} = data;

  return (
    <Suspense fallback={<LoaderComponent />}>

   <RecommendationResultClient
   businessCategoryData={businessCategoryData}
   leftMenuFilterData={leftMenuFilterData}
   />
   </Suspense>
  )
}

