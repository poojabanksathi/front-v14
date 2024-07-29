import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import FAQ from '@/app/client/component/common/FAQ/FAQ'
import CommonRoundedBreadcrumb from '@/app/client/component/common/CommonRoundedBreadcrumb/CommonRoundedBreadcrumb'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})
const EligibilityCreditCard = dynamic(() => import('@/app/client/component/Layout/eligibilityCreditCard'), {
  ssr: false
})
const DynamicMobileFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})

const VedioCheck = dynamic(() => import('@/app/client/component/common/VedioCheck'), {
  ssr: false
})
const CreditBeginnerCard = dynamic(() => import('@/app/client/component/Layout/creditCardList/CreditBeginnerCard'), {
  ssr: false
})


async function getData( eligible ) {
  const lang_id = 1;
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  
  // eligibility?eligible=bank-of-baroda-credit-card 
  // eligible=bank-of-baroda-credit-card

  const context_params =  `eligibility?eligible=${eligible}` ;
  const new_url_slug = `eligible=${eligible}`;

  
  const req2 = {
    lang_id: lang_id
  }
  const req4 = {
    lang_id: lang_id,
    business_category_url_slug: 'credit-cards'
  }
  const req7 = {
    lang_id: lang_id,
    page_url_slug: context_params
  }
  const req6 = {
    lang_id: lang_id,
    url_slug: context_params
  }
  const CategoryParams = {
    lang_id: lang_id,
    business_category_url_slug: new_url_slug
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
    const [data2, data4, data5, data6, metaResponse] = await Promise.all([
      fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req2),
      fetchData(BASE_URL + BUSINESSCATEGORY?.productListCategory, req4),
      fetchData(BASE_URL + COMMON?.metaDetailPage, req7),
      fetchData(BASE_URL + FAQAPI.productFaq, req6),
      fetchData(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, CategoryParams),
    ]);

    return {
      businessCategorydata: data2,
      productList: data4,
      businessmetaheadtag: data5?.data || {},
      faqdata: data6,
      referer: ref,
      metaResponseData:  metaResponse 
    };
  } catch (error) {
    console.error('General error in getData function:', error);
    return {
      notFound: true
    };
  }
}


export default async function Page({params}) {

  const eligible = params?.eligible
 const data = await getData(eligible);

  const { businessCategorydata,
    productList,
    businessmetaheadtag,
    faqdata} = data;

  return (
    <>
          <Suspense fallback={<LoaderComponent/>}>

      <div className='h-full bg-[#F4F8FB]  login-mobile-res'>
        {/* <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div> */}
        <div className='bg-[#F4F8FB] '>
          <CommonRoundedBreadcrumb
            link1='/credit-cards'
            link1Name='Credit Cards'
            highlight2={true}
            link2='credit-cards/eligibility'
            link2Name='Eligibility'
          />
        </div>
        <EligibilityCreditCard productList={productList} metaResponseData={businessmetaheadtag} />
        <div className='bg-[#F4F8FB]'>
          <VedioCheck productDetailsData={businessmetaheadtag} />
        </div>
        <CreditBeginnerCard longTerm={businessmetaheadtag} />
        <FAQ faqdata={faqdata} />

        {/* <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
        </div> */}
      </div>
      </Suspense>
      {/* <ScrollToTop smooth color='#000' /> */}
    </>
  )
}
