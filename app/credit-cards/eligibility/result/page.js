import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, PRODUCTSAPI, multipleSlug } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers';

const EligibilityResultClient = dynamic(() => import('@/app/client/component/Pages/CreditCardsClient/EligibilityResultClient'), {
  ssr: false
})


async function getData( params ) {
  const lang_id = 1;
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  
  const slug = params?.slug

  const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0];
  const user_agent = reqHeaders.get('user-agent');

  const leadsParams = { user_agent, ip }
  const req2 = {
    lang_id: lang_id
  }

  const req4 = {
    lang_id: 1,
    url_slug: slug
  }
  const req41 = {
    lang_id: lang_id,
    business_category_url_slug: 'credit-cards',
    offset: 0,
    limit: 200
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
    const [data2, data4, data5, data6] = await Promise.all([
      fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req2),
      fetchData(BASE_URL + multipleSlug.productAllDetails, req4),
      fetchData(BASE_URL + PRODUCTSAPI.getAlternateProduct, req4),
      fetchData(BASE_URL + BUSINESSCATEGORY?.productListCategory, req41),
    ]);

    return {
      businessCategorydata: data2,
      eligibleSlug: data4,
      alternetRelatedproduct: data5,
      productList: data6,
      referer: ref,
      leadsParams: leadsParams
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

  const { businessCategorydata,
    eligibleSlug,
    productList,
    leadsParams} = data;
  
  return (
   <EligibilityResultClient
   businessCategorydata={businessCategorydata}
   eligibleSlug={eligibleSlug}
   productList={productList}
   leadsParams={leadsParams}

   />
  )
}
