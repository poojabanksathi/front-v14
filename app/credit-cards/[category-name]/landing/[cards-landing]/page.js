import dynamic from 'next/dynamic'
import React from 'react'
import { BASE_URL, BUSINESSCATEGORY, multipleSlug } from '@/utils/alljsonfile/service'
import { getDeviceIdCookie } from '@/utils/util'
import { headers } from 'next/headers';

const CardLandingClient = dynamic(() => import('@/app/client/component/Pages/CreditCardsClient/CardLandingClient'), {
  ssr: false
})


async function getData(params ) {
  const lang_id = 1;
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  const cookies = reqHeaders.get('cookie')?.split(';')

  const productDetails = params?.['cards-landing']
  const categoryUrl = params?.['category-name'] || ''
  const device_id = getDeviceIdCookie(cookies)
  
  const req3 = {
    lang_id: lang_id
  }
  
  const pdpParams = {
    lang_id: lang_id,
    url_slug: productDetails,
    device_id: device_id
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
    const [data1, data2] = await Promise.all([
      fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3),
      fetchData(BASE_URL + multipleSlug.productAllDetails, pdpParams),
    ]);

    return {
     businessCategorydata: data1,
        productDetailsData: data2,
        businessmetaheadtag: data2?.product_details,
        categoryUrl: categoryUrl,
        productDetailsUrl: productDetails
    };
  } catch (error) {
    console.error('General error in getData function:', error);
    return {
      notFound: true
    };
  }
}



export default async function Page({params }) {
 const data = await getData(params);

 const {  categoryUrl,
  productDetailsUrl,
  productDetailsData,
  businessmetaheadtag
 } = data;

 
 
  return (
    <CardLandingClient 
    categoryUrl={categoryUrl}
    productDetailsUrl={productDetailsUrl}
    productDetailsData={productDetailsData}
    businessmetaheadtag={businessmetaheadtag}
    
    />
  )
}
