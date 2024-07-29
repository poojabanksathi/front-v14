import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'

const MyOfferClient = dynamic(() => import('@/app/client/component/Pages/MyProfileClient/MyOfferClient'), {
  ssr: false
})


async function getData() {
  const lang_id = 1
  const page_id = 1
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  const req3 = {
    lang_id: lang_id
  }
  const req2 = {
    lang_id: lang_id,
    page_id: page_id
  }
  const req41 = {
    lang_id: lang_id,
    business_category_url_slug: 'credit-cards',
    offset: 0,
    limit: 200
  }
  const bankAccount = {
    lang_id: lang_id,
    business_category_url_slug: 'bank-accounts'
  }
  const metaParams = {
    lang_id: lang_id,
    page_url_slug: 'myprofile-my-offer'
  }

  try {
    const [data1, data2, data4, bankAccountListing, data5] = await Promise.all([
      fetch(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req3),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

      fetch(BASE_URL + FAQAPI.productFaq, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req2),
        cache: 'no-store'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + BUSINESSCATEGORY?.productListCategory, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req41),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + BUSINESSCATEGORY.productListCategory, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bankAccount),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + COMMON?.metaDetailPage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metaParams),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),


    ]);

    return {
      businessCategorydata: data1 || null,
      faqdata: data2 || null,
      productList: data4 || null,
      referer: ref || '',
      bankAccountListing: bankAccountListing || null,
      businessmetaheadtag: data5?.data || null
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}


const  Page = async () => {
  const data = await getData()

  return (
    <>  
                  <Suspense fallback={<LoaderComponent />}>

      <div className='bg-[#F4F8FB] h-auto'>
        <MyOfferClient faqdata={data?.faqdata} productList={data?.productList} bankAccountListing={data?.bankAccountListing} />
      </div>
     </Suspense>
    </>
  )
}
export default Page
