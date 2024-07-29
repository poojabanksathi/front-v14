'use client'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { useRouter } from 'next/navigation'


const DetailsCategoryCard = dynamic(
  () => import('@/app/client/component/Layout/productDetails/DetailsCategoryCard/DetailsCategoryCard'),
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

const CardsDetailsClient = ({
  faqdata,
  businessCategorydata,
  productDetailsData,
  productLongformcon,
  alternetRelatedproduct,
  getallreview,
  getOverlallRating,
  leadsParams,
  categoryUrl,
  productDetailsUrl
}) => {
  useEffect(() => {
    if (leadsParams) {
      if (typeof window !== 'undefined') {
        sessionStorage?.setItem('leadsParams', JSON.stringify(leadsParams))
      }
    }
  }, [leadsParams])
  const router = useRouter()

  const reviewCount = getOverlallRating?.data?.total_reviews > 0 ? getOverlallRating?.data?.total_reviews : 1

  //product json ld schema
  const addProductJsonLd = () => {

    const productSchemaJson = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: productDetailsData?.product_details?.card_name || '',
      description: productDetailsData?.product_details?.card_name || '',
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: productDetailsData?.product_details?.rating || '5',
          bestRating: 5
        },
        author: {
          '@type': 'Person',
          name: productDetailsData?.product_details?.publisher_name || ''
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: productDetailsData?.product_details?.rating || '5',
        reviewCount: reviewCount
      }
    }
    const jsonFAQString = JSON.stringify(productSchemaJson)

    return {
      __html: jsonFAQString
    }
  }
  const productDetailJson = addProductJsonLd()

  useEffect(() => {
    if (!productDetailsData?.product_details) {
      router?.push('/404')
    }
  }, [productDetailsData, router])

  return (
    <>
      {productDetailsData?.product_details && (
        <head>
          <script type='application/ld+json' key='app-ld-json' dangerouslySetInnerHTML={productDetailJson} />
        </head>
      )}
        {/* <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div> */}
      <div>
        <DetailsCategoryCard
          faqdata={faqdata}
          productDetailsData={productDetailsData}
          productLongformcon={productLongformcon}
          alternetRelatedproduct={alternetRelatedproduct}
          getallreview={getallreview}
          getOverlallRating={getOverlallRating}
          categoryUrl={categoryUrl}
          productDetailsUrl={productDetailsUrl}
        />

      </div>

      {/* <DynamicFooter businessCategorydata={businessCategorydata} />

      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div> */}
    </>
  )
}



export default CardsDetailsClient;
