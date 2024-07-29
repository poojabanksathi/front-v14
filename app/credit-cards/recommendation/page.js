import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent';
import { BASE_URL, BUSINESSCATEGORY, BrowseServices, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers';
import React, { Suspense } from 'react'

const CreditRecommendationClient = dynamic(() => import('@/app/client/component/Pages/CreditCardsClient/CreditRecommendationClient'), {
  ssr: false
})

async function getData( params ) {
  const lang_id = 1;
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0];
  const user_agent = reqHeaders.get('user-agent');
  const url_slug = 'recommendation'
  const leadsParams = { user_agent, ip }
  const categorySlug = 'credit-cards'

  const tabsParams = {
    lang_id: lang_id,
    business_category_url_slug: categorySlug
  }

  const faqParams = {
    lang_id: lang_id,
    url_slug: url_slug
  }
  const req1 = {
    lang_id: lang_id,
    page_url_slug: url_slug
  }
  const langIdParam = {
    lang_id: lang_id
  }
  const serviceTabsParams = {
    lang_id: 1,
    business_category_url_slug: ''
  }
  const creditParams = {
    lang_id: lang_id,
    business_category_url_slug: categorySlug || 'credit-cards',
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
    const [faqData, subCategoryTabs, longFormData, businessCategoryData , serviceTabs , topMenuCategories , creditCardsList] = await Promise.all([
      fetchData(BASE_URL + FAQAPI.productFaq, faqParams),
      fetchData(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, tabsParams),
      fetchData(BASE_URL + COMMON?.metaDetailPage, req1),
      fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, langIdParam),
      fetchData(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams),
      fetchData(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, tabsParams),
      fetchData(BASE_URL + BUSINESSCATEGORY.productListCategory, creditParams),

    ]);

    return {
      referer: ref,
      faqData: faqData || null,
      subCategoryTabs: subCategoryTabs || null,
      businessmetaheadtag: longFormData?.data || null,
      businessCategoryData: businessCategoryData || null,
      url_slug: url_slug || '',
      serviceTabs: serviceTabs || null,
      // h: h,
      leadsParams: leadsParams,
      topMenuCategories: topMenuCategories || null,
      creditCardsList: creditCardsList || null
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
  
    const { faqData, businessmetaheadtag, businessCategoryData , serviceTabs, topMenuCategories , creditCardsList} = data;

  return (
    <Suspense fallback={<LoaderComponent />}>

   <CreditRecommendationClient
   faqData={faqData}
   businessmetaheadtag={businessmetaheadtag}
   businessCategoryData={businessCategoryData}
   serviceTabs={serviceTabs}
   topMenuCategories={topMenuCategories}
   creditCardsList={creditCardsList}
   />
   </Suspense>
  )
}

