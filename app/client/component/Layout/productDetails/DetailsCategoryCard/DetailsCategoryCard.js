'use client';
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { capitalizeFirstLetter } from '@/utils/util'
import LoaderComponent from '../../../Partners/LoaderComponent/LoaderComponent';

const FAQ = dynamic(() => import('@/app/client/component/common/FAQ/FAQ'), {
  ssr: false
})

const CardDetailsFilterBox = dynamic(() => import('@/app/client/component/common/CommonList/CardDetailsFilterBox'), {
  ssr: false
})
const CommonBreadCrumbComponent = dynamic(
  () => import('@/app/client/component/common/CommonList/CommonBreadCrumbComponent'),
  {
    ssr: false
  }
)
function DetailsCategoryCard({
  faqdata,
  productDetailsData,
  productLongformcon,
  alternetRelatedproduct,
  getallreview,
  getOverlallRating,
  categoryUrl,
  productDetailsUrl
}) {

  return (
    <Suspense fallback={<LoaderComponent/>}>

    <div className='bg-[#F4F8FB]'>
      <CommonBreadCrumbComponent
        link1={'/credit-cards'}
        link1Name='Credit Cards'
        link2={`/credit-cards/${categoryUrl}`}
        link2Name={capitalizeFirstLetter(categoryUrl)?.split('-')?.join(' ')}
        link3Name={capitalizeFirstLetter(productDetailsUrl)?.split('-')?.join(' ')}
        isDetailsPage={true}
      />
      {productDetailsData?.product_details && (
        <div className='container  min-h-[500px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full pt-[15px] max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
          {/* <DetailBredcrumb productDetailsData={productDetailsData} /> */}
          <CardDetailsFilterBox
            productDetailsData={productDetailsData}
            getallreview={getallreview}
            getOverlallRating={getOverlallRating}
            alternetRelatedproduct={alternetRelatedproduct}
            productLongformcon={productLongformcon}
          />
          {/* <EligibilityCriteriaDetail productDetailsData={productDetailsData} />
          <VedioCheck productDetailsData={productDetailsData?.product_details} />
          <div className='container xl:px-8'>
            <DetailsFindTailor />
          </div>
          <DetailRelatedCards alternetRelatedproduct={alternetRelatedproduct} />
          <HowToApplyDetail productLongformcon={productLongformcon} /> */}
        </div>
      )}
      <FAQ faqdata={faqdata} />
    </div>
    </Suspense>
  )
}

export default DetailsCategoryCard
