import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { BASE_URL, BUSINESSCATEGORY, BUSINESSSUBCATEGORY, BrowseServices, FAQAPI } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'

const CategoryNameClient = dynamic(() => import('@/app/client/component/Pages/CreditCardsClient/CategoryNameClient'), {
  ssr: false
})



async function getData(params , searchParams) {


  const paramsData = params?.['category-name']
  const context_params = 'credit-cards'
 
  const lang_id = 1
  const url_slug = context_params

   const reqHeaders = headers();
   const ref = reqHeaders.get('referer') || '';
   const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0];
   const user_agent = reqHeaders.get('user-agent');
   const leadsParams = { user_agent, ip }
   const page = searchParams?.page ? parseInt(searchParams.page) - 1 : 0;
 

  const metaReq = {
    lang_id: lang_id,
    business_category_url_slug: paramsData
  }
  const req3 = {
    lang_id: lang_id,
    business_category_url_slug: url_slug,
    business_sub_category_url_slug: paramsData,
    offset: page,
    limit: 20
  }

  const req1 = {
    lang_id: lang_id,
    business_category_url_slug: url_slug
  }
  const req2 = {
    lang_id: lang_id,
    sub_cat_url_slug: paramsData
  }
  const req5 = {
    lang_id: lang_id
  }
  const serviceTabsParams = {
    lang_id: 1,
    business_category_url_slug: ''
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
     const [data1, data2, data3, data4, data6, data7, data8, data10] = await Promise.all([
       fetchData(BASE_URL + BUSINESSSUBCATEGORY.productListCatSub, req3),
       fetchData(BASE_URL + BUSINESSSUBCATEGORY.productListCatTags, metaReq),
       fetchData(BASE_URL + FAQAPI.productFaq, req2),
       fetchData(BASE_URL + BUSINESSSUBCATEGORY.subCatformcontent, metaReq),
       fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req5),
       fetchData(BASE_URL + BUSINESSSUBCATEGORY.gettopmorewaydetails, metaReq),
       fetchData(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1),
       fetchData(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams)
     ]);
 
     return {
      productlistdataSub: data1 || null,
      businessmetaheadtag: data2?.h1_paragraph || {},
      faqdata: data3,
      longTermSub: data4,
      businessCategorydata: data6,
      morecategoryleftfilter: data7,
      categorytopmenulistsub: data8,
      referer: ref,
      url_slug: paramsData,
      leadsParams: leadsParams,
      credit_url_slug: url_slug,
      serviceTabs: data10,
      sub_cat_url: paramsData
     };
   } catch (error) {
     console.error('General error in getData function:', error);
     return {
       notFound: true
     };
   }
 }
 


export default async function Page({params, searchParams }) {
  const data = await getData(params, searchParams);

  const { productlistdataSub, businessmetaheadtag, faqdata, longTermSub, businessCategorydata, morecategoryleftfilter, categorytopmenulistsub, referer, url_slug, leadsParams, credit_url_slug ,  paramsData , serviceTabs } = data;

  return (
    <>
          <Suspense fallback={<LoaderComponent />}>

      <CategoryNameClient
        productlistdataSub={productlistdataSub}
            businessmetaheadtag={businessmetaheadtag}
            faqdata={faqdata}
            longTermSub={longTermSub}
            businessCategorydata={businessCategorydata}
            morecategoryleftfilter={morecategoryleftfilter}
            categorytopmenulistsub={categorytopmenulistsub}
            url_slug={params['category-name']}
            leadsParams={leadsParams}
            credit_url_slug={credit_url_slug}
            serviceTabs={serviceTabs}
            sub_cat_url={params['category-name']}
      />
      </Suspense>
    </>
  )
}
