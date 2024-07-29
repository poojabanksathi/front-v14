import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { BASE_URL, BUSINESSCATEGORY, BrowseServices, FAQAPI } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'
import LoaderComponent from '../client/component/Partners/LoaderComponent/LoaderComponent'

const CreditCardsClient = dynamic(() => import('@/app/client/component/Pages/CreditCardsClient/CreditCardsClient'), {
  ssr: false
})


async function getData(searchParams) {
 // let queryParam1 = ''
  // const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]
  // if (context?.query?.page !== '') {
  //   queryParam1 = context?.resolvedUrl?.split('?')?.[0]
  // }
  // const url_slug = context?.query?.page === '' ? context_params : queryParam1?.split('/')?.[1]
  // const page = context?.query?.page ? context?.query?.page - 1 : 0
  // const h = context?.query?.h || ''


  const url_slug = 'credit-cards'
  const lang_id = 1
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0];
  const user_agent = reqHeaders.get('user-agent');
  const leadsParams = { user_agent, ip }
  const page = searchParams?.page ? parseInt(searchParams.page) - 1 : 0;
  const h = searchParams?.query?.h || ''

  const requestParams = {
    lang_id: lang_id,
    business_category_url_slug: url_slug,
    offset: page,
    limit: 20
  };
  const req1 = { lang_id: lang_id, business_category_url_slug: url_slug };
  const req2 = { lang_id: lang_id, url_slug: url_slug };
  const req4 = { lang_id: lang_id };
  const serviceTabsParams = { lang_id: lang_id, business_category_url_slug: '' };

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
    const [data1, data2, data3, data4, data5, data7, data8, data10] = await Promise.all([
      fetchData(BASE_URL + BUSINESSCATEGORY.productListCategory, requestParams),
      fetchData(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1),
      fetchData(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, req1),
      fetchData(BASE_URL + FAQAPI.productFaq, req2),
      fetchData(BASE_URL + BUSINESSCATEGORY.formLongcontent, req1),
      fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4),
      fetchData(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, req1),
      fetchData(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams)
    ]);

    return {
      productlistdata: data1 || null,
      categorytopmenulist: data2,
      businessmetaheadtag: data3?.h1_paragraph || null,
      faqdata: data4,
      longTerm: data5,
      businessCategorydata: data7,
      moreleftmenucredit: data8,
      serviceTabs: data10,
      h: h
    };
  } catch (error) {
    console.error('General error in getData function:', error);
    return {
      notFound: true
    };
  }
}


export default async function Page({ searchParams }) {
  const data = await getData(searchParams);

  const { productlistdata, categorytopmenulist, businessmetaheadtag, faqdata, longTerm, businessCategorydata, moreleftmenucredit, leadsParams, url_slug, serviceTabs } = data;

  return (
    <>
              <Suspense fallback={<LoaderComponent />}>

      <CreditCardsClient
        productlistdata={productlistdata}
        categorytopmenulist={categorytopmenulist}
        businessmetaheadtag={businessmetaheadtag}
        faqdata={faqdata}
        longTerm={longTerm}
        businessCategorydata={businessCategorydata}
        moreleftmenucredit={moreleftmenucredit}
        leadsParams={leadsParams}
        url_slug={'credit-cards'}
        serviceTabs={serviceTabs}
      />
      </Suspense>
    </>
  )
}
