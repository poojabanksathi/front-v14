import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, FAQAPI, PRODUCTSAPI, multipleSlug } from '@/utils/alljsonfile/service'
import { getDeviceIdCookie } from '@/utils/util'
import { headers } from 'next/headers'


const CardsDetailsClient = dynamic(
  () => import('@/app/client/component/Pages/CreditCardsClient/CardsDetailsClient'),
  {
    ssr: false
  }
)

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})


async function getData(params ) {
   const reqHeaders = headers();
   const ref = reqHeaders.get('referer') || '';
   const cookies = reqHeaders.get('cookie')?.split(';')
   const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0];
   const user_agent = reqHeaders.get('user-agent');
   const leadsParams = { user_agent, ip }

   const productDetails = params?.['cards-details']
   const catgeory_slug = 'credit-cards'
   const context_params = productDetails
   const cleanUrlContext = productDetails

   const lang_id = 1
   const offset = 0
   const limitdata = 5
   const url_slug = cleanUrlContext
   const categoryUrl = params?.['category-name'] || ''
   const device_id = getDeviceIdCookie(cookies)
 
   const sort_type = 'updated_at'
   const sort_order = 'asc'

   const req1 = {
     lang_id: lang_id,
     url_slug: url_slug
   }
   const req3 = {
     lang_id: lang_id
   }
   const req5 = {
     lang_id: lang_id,
     category_slug: catgeory_slug
   }
   const req4 = {
     lang_id: lang_id,
     url_slug: productDetails
   }

   const req7 = {
     product_url_slug: productDetails,
     sort_type: sort_type,
     sort_order: sort_order,
     lang_id: lang_id,
     offset: offset,
     limit: limitdata
   }
   const req8 = {
     product_url_slug: productDetails,
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
     const [data1, data3, data4, data5, data6, data7, data9, data10] = await Promise.all([
       fetchData(BASE_URL + FAQAPI.productFaq, req1),
       fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3),
       fetchData(BASE_URL + multipleSlug.productAllDetails, pdpParams),
       fetchData(BASE_URL + PRODUCTSAPI.TrendingProductCategory, req5),
       fetchData(BASE_URL + PRODUCTSAPI.productformLongcontent, req4),
       fetchData(BASE_URL + PRODUCTSAPI.getAlternateProduct, req4),
       fetchData(BASE_URL + PRODUCTSAPI.getAllReview, req7),
       fetchData(BASE_URL + PRODUCTSAPI.getOverallRating, req8)
     ]);
 
     return {
      faqdata: data1,
        businessCategorydata: data3,
        productDetailsData: data4,
        RecomendedTopselling: data5,
        productLongformcon: data6,
        alternetRelatedproduct: data7,
        getallreview: data9,
        getOverlallRating: data10,
        referer: ref,
        leadsParams: leadsParams,
        businessmetaheadtag: data4?.product_details,
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

  const { faqdata,
    businessCategorydata,
    productDetailsData,
    productLongformcon,
    alternetRelatedproduct,
    getallreview,
    getOverlallRating,
    leadsParams,
    categoryUrl,
    productDetailsUrl
  } = data;

  
  

  return (
    <>
      <CardsDetailsClient
        faqdata={faqdata}
        businessCategorydata={businessCategorydata}
        productDetailsData={productDetailsData}
        productLongformcon={productLongformcon}
        alternetRelatedproduct={alternetRelatedproduct}
        getallreview={getallreview}
        getOverlallRating={getOverlallRating}
        leadsParams={leadsParams}
        categoryUrl={params?.['category-name'] }
        productDetailsUrl={params?.['cards-details']}
      
      />
    </>
  )
}
