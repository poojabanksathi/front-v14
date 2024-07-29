import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})
const FAQ = dynamic(() => import('@/app/client/component/common/FAQ/FAQ'), {
  ssr: false
})
const SavingCalculatorListing = dynamic(
  () => import('@/app/client/component/common/CalculatorCards/SavingCalculatorListing'),
  {
    ssr: false
  }
)

const DynamicMobileFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})

const CommonRoundedBreadcrumb = dynamic(
  () => import('@/app/client/component/common/CommonRoundedBreadcrumb/CommonRoundedBreadcrumb'),
  {
    ssr: false
  }
)
const CreditBeginnerCard = dynamic(() => import('@/app/client/component/Layout/creditCardList/CreditBeginnerCard'), {
  ssr: false
})
const VedioCheck = dynamic(() => import('@/app/client/component/common/VedioCheck'), {
  ssr: false
})




async function getData( params ) {
  const lang_id = 1;
  const page_id = 1;
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  const context_params = 'result'

  const req3 = {
    lang_id: lang_id
  }
  const req2 = {
    lang_id: lang_id,
    page_id: page_id
  }
  const req6 = {
    lang_id: lang_id,
    business_category_url_slug: 'credit-cards'
  }
  const req7 = {
    online_shopping: 87888,
    dining: 45454,
    travel: 3434,
    fuel: 3434,

    entertainment: 3434,

    international: 3434
  }
  const req1 = {
    lang_id: lang_id,
    page_url_slug: context_params
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
    const [data1, data2, data5, data6, data8] = await Promise.all([
      fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3),
      fetchData(BASE_URL + FAQAPI.productFaq, req2),
      fetchData(BASE_URL + BUSINESSCATEGORY?.productListCategory, req6),
      fetchData(BASE_URL + COMMON?.recommendProductSavingCal, req7),
      fetchData(BASE_URL + COMMON?.metaDetailPage, req1),

    ]);

    return {
      businessCategorydata: data1,
      faqdata: data2,
      productList: data5,
      recommendProductList: data6,
      referer: ref,
      businessmetaheadtag: data8?.data || {}
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
  
    const { businessmetaheadtag,
      businessCategorydata,
      faqdata,
      productList,
      recommendProductList} = data;

  return (
    <>
          <Suspense fallback={<LoaderComponent/>}>

        {/* <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div> */}
        <div className='bg-[#F4F8FB] h-auto pt-4 max-sm:px-2 '>
          <CommonRoundedBreadcrumb
            link1={'/credit-cards/saving-calculator'}
            link1Name={'Saving Calculator'}
            link2={'/credit-cards/saving-calculator/result'}
            link2Name='result'
            highlight2={true}
          />
        </div>
        <div className='bg-[#F4F8FB] h-auto eligible-products-slider relative xl:px-16'>
          <SavingCalculatorListing recommendProductList={recommendProductList} productURlAPiData={productList} />
        </div>
        <div className='bg-[#F4F8FB] h-auto'>
          <VedioCheck productDetailsData={businessmetaheadtag} />

          <CreditBeginnerCard longTerm={businessmetaheadtag} />
        </div>
        <div className='bg-[#F4F8FB] h-auto'>
          <FAQ faqdata={faqdata} />
        </div>
        {/* <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
        </div>
      <ScrollToTop smooth color='#000' /> */}
      </Suspense>
    </>
  )
}