import React, { Suspense } from 'react'
import Axios from "axios";
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, FAQAPI, multipleSlug } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent';

const FAQ = dynamic(() => import('@/app/client/component/common/FAQ/FAQ'), {
  ssr: false
})
const CreditCardTrobleHaving = dynamic(
  () => import('@/app/client/component/Layout/compareCard/cardTrobleHaving/CreditCardTrobleHaving'),
  {
    ssr: false
  }
)
const CompareCreditCardNew = dynamic(() => import('@/app/client/component/common/CommonList/CompareCreditCard'), {
  ssr: false
})
const CompareCardPdfPage = dynamic(() => import('@/app/client/component/common/CommonList/CompareCardPdfPage'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})

async function getData(params ,searchParams, reqHeaders) {
  const context_params = "credit-cards";
  const route = `/${context_params}/compare/`;
  
  // Process the slug
  const slugArray = Array.isArray(params?.slug) 
    ? params?.slug 
    : typeof params?.slug === 'object'
      ? Object.values(params?.slug) // Convert object values to array
      : [params?.slug];
  
  const slugPath = slugArray.join('/');
  const routeFullUrl = `${route}${slugPath}`;
  
  const lang_id = 1
  const url_slug = ''
   const ref = reqHeaders.get('referer') || '';
   const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0];
   const user_agent = reqHeaders.get('user-agent');
   const leadsParams = { user_agent, ip }
   const page = searchParams?.page ? parseInt(searchParams.page) - 1 : 0;
   const h = searchParams?.query?.h || ''
   const req1 = {
    lang_id: lang_id,
    url_slug: url_slug
  }

  const slugOne = {
    lang_id: 1,
    url_slug: params?.slug[0]
  }
  const slugTwo = {
    lang_id: lang_id,
    url_slug: params?.slug[1]
  }
  const slugThree = {
    lang_id: lang_id,
    url_slug: params?.slug[2]
  }
  
  const req4 = {
    lang_id: lang_id,
    business_category_url_slug: context_params
  }

  const [data1, slug1, slug2, slug3, data6, data8] =
    await Promise.all([
      Axios.post(BASE_URL + FAQAPI.productFaq, req1)
        .then((res) => res.data)
        .catch(() => null),
      Axios.post(BASE_URL + multipleSlug.productAllDetails, slugOne)
        .then((res) => res?.data)
        .catch(() => null),
      Axios.post(BASE_URL + multipleSlug.productAllDetails, slugTwo)
        .then((res) => res?.data)
        .catch(() => null),
      Axios.post(BASE_URL + multipleSlug.productAllDetails, slugThree)
        .then((res) => res?.data)
        .catch(() => null),
      Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4)
        .then((res) => res?.data)
        .catch(() => null),
      Axios.post(BASE_URL + BUSINESSCATEGORY?.productListCategory, req4)
        .then((res) => res?.data)
        .catch(() => null),
    ]);

  return {

    faqdata: data1,
      slug1,
      slug2,
      slug3,
      businessCategorydata: data6,
      productcomparedata: data8,
      referer: ref,
      route: routeFullUrl,
      leadsParams: leadsParams
  };
}

 export default async function Page({params , searchParams }) {
   const headersList = headers();
   const data = await getData(params , searchParams , headersList);
  const fullUrl = headersList.get("x-url") || "";
  const isPdfPage = fullUrl.split("/").pop() === "pdf";

  if (isPdfPage) {
    return (
      <CompareCardPdfPage
      faqdata={data?.faqdata}
      slug1={data?.slug1}
      slug2={data?.slug2}
      slug3={data?.slug3}
      productcomparedata={data?.productcomparedata}
      route={data?.route}
      link={`/credit-cards`}
      title={'Compare Credit Cards'}
    />
    );
  }

  return (
   
        <>
                  <Suspense fallback={<LoaderComponent/>}>

            <div className=' bg-[#844FCF]'>
              <DynamicHeader
                slug1={data?.slug1}
                slug2={data?.slug2}
                slug3={data?.slug3}
                businessCategorydata={data?.businessCategorydata}
              />
            </div>

          <div>
            {data?.productcomparedata && (
              <CompareCreditCardNew
                faqdata={data?.faqdata}
                slug1={data?.slug1}
                slug2={data?.slug2}
                slug3={data?.slug3}
                productcomparedata={data?.productcomparedata}
                route={data?.businessCategorydata}
              />
            )}
          </div>

          <div className='bg-[#F4F8FB] '>
            
            <CreditCardTrobleHaving creditCompare={true} position={'3'} />

            <FAQ faqdata={data?.faqdata} />
            {/* <MobileFooter businessCategorydata={businessCategorydata} /> */}
          </div>
          {/* <DynamicFooter businessCategorydata={businessCategorydata} />
          <div className='scroll-top'>
          <ScrollToTop smooth color='#000' />
          </div> */}
          </Suspense>
        </>
      
  )
}
