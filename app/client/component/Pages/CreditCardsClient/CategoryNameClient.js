'use client';
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ScrollToTop from 'react-scroll-to-top';
import { useRouter } from 'next/navigation';
import { capitalizeFirstLetter } from '@/utils/util';


const CategorySubRecome = dynamic(() => import('@/app/client/component/Layout/creditCardCategory/CategorySubRecome'), {
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
  
  const CreditListingBanner = dynamic(() => import('@/app/client/component/Layout/creditCardList/CreditListingBanner'), {
    ssr: false
  })
  
  const CommonBreadCrumbComponent = dynamic(
    () => import('@/app/client/component/common/CommonList/CommonBreadCrumbComponent'),
    {
      ssr: false
    }
  )

const CategoryNameClient = ({  productlistdataSub,
    businessmetaheadtag,
    faqdata,
    longTermSub,
    businessCategorydata,
    morecategoryleftfilter,
    categorytopmenulistsub,
    url_slug,
    leadsParams,
    credit_url_slug,
    serviceTabs,
    sub_cat_url}) => {
        const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
        const bottomRefs = useRef(null)
        const router = useRouter()
      
        useEffect(() => {
          if (leadsParams) {
            if (typeof window !== 'undefined') {
              sessionStorage?.setItem('leadsParams', JSON.stringify(leadsParams))
            }
          }
        }, [leadsParams])
      
        useEffect(() => {
          if (!productlistdataSub || productlistdataSub?.product_list?.length === 0) {
            router?.push('/404')
          }
        }, [productlistdataSub, router])
      

    return (
        <>
              <section>
        {/* <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div> */}
        <div className='bg-[#F4F8FB]'>
          <div className='min-[768px]:pb-4 pb-6'>
            <CommonBreadCrumbComponent
              link1={'/credit-cards'}
              link1Name='Credit Cards'
              link2={`/credit-cards/${url_slug}`}
              link2Name={capitalizeFirstLetter(url_slug)?.split('-')?.join(' ')}
            />
          </div>
          <div className='container px-20  max-[1024px]:px-8 max-[576px]:px-4 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
          </div>
          <CreditListingBanner
            businessmetaheadtag={businessmetaheadtag}
            src={`${Img_URL}/${businessmetaheadtag?.sub_category_image}`}
            linesToShow={2}
            paddingTop={true}
          />
        </div>
      </section>
      <div>
        <CategorySubRecome
          productlistdataSub={productlistdataSub}
          faqdata={faqdata}
          longTermSub={longTermSub}
          businessmetaheadtag={businessmetaheadtag}
          morecategoryleftfilter={morecategoryleftfilter}
          categorytopmenulistsub={categorytopmenulistsub}
          url_slug={url_slug}
          credit_url_slug={credit_url_slug}
          serviceTabs={serviceTabs}
          bottomRefs={bottomRefs}
          sub_cat_url={sub_cat_url}
        />
        {/* <div ref={bottomRefs}>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicFooter businessCategorydata={businessCategorydata} />
          <div className='scroll-top'>
            <ScrollToTop smooth color='#000' />
          </div>
        </div> */}
      </div>
        </>
    )
}

export default CategoryNameClient;