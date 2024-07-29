'use client'
import React, { useEffect, useState } from 'react'
import bannerhomeBg from '../../../../../public/assets/banner-bg-home.svg'
import bannerUBg from '../../../../../public/assets/banner-bg-u.svg'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { useWindowSize } from '@/hooks/useWindowSize'
import { metaInfo } from '@/utils/metaInfo'
import { useRouter } from 'next/navigation'

const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})

const DynamicFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})

const HomeBanner = dynamic(() => import('@/app/client/component/Layout/Home/HomeBanner/index'), {
  ssr: false
})
const DynamicHomePage = dynamic(() => import('@/app/client/component/Layout/Home/index'), {
  ssr: false
})

export default function HomePageV2Client({businessCategorydata , faqdata , RecomendedTopselling , longTermData , registerdevicedata}) {
  const style = {
    backgroundImage: `url(${bannerhomeBg.src})`,
    width: '100%',
    backgroundPosition: 'right'
  }

  const stylemobile = {
    backgroundImage: `url(${bannerUBg.src})`,
    width: '100%',
    backgroundPosition: 'right'
  }

  const [scrollY, setScrollY] = useState(0)
  const router = useRouter()
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const size = useWindowSize()
  useEffect(() => {
    if (businessCategorydata?.productInfo?.length === 0) {
      router.push('/maintenance')
    }
  }, [businessCategorydata?.productInfo?.length, router])
  const getOgUrl = typeof window !== 'undefined' && window?.location?.href
  const modifiedUrl = typeof window !== 'undefined' && window.location.origin + window.location.pathname
  return (
    <>
      <head>
        <title>{metaInfo?.pageTitle}</title>
        <link rel='canonical' href={modifiedUrl} />
        <meta name='description' content={metaInfo?.pageDescription} />
        {process.env.NEXT_PUBLIC_WEBSITE_URL == 'www.banksathi.com' ? (
          <meta name='robots' content='index,follow' />
        ) : (
          <meta name='robots' content='noindex,nofollow' />
        )}
        <meta name='og:title' content={metaInfo?.ogTitle} />
        <meta name='og:type' content={metaInfo?.ogType} />
        <meta name='og:url' content={getOgUrl} />
        <meta name='og:description' content={metaInfo?.ogDescription} />
        <meta name='og:image' content={metaInfo?.ogImage} />
        <meta name='og:image:secure' content={metaInfo?.ogImage} />

        <meta name='og:image:width' content='300' />
        <meta name='og:image:height' content='300' />
        <meta name='og:image:alt' content={metaInfo?.ogImageAlt} />
        <meta name='og:image:type' content={metaInfo?.ogImageType} />
        <meta name='og:site_name' content={metaInfo?.ogSiteName} />
        <meta name='twitter:card' content={metaInfo?.twitterCard} />
        <meta name='twitter:site' content={metaInfo?.twitterSite} />
        <meta name='twitter:title' content={metaInfo?.twitterTitle} />
        <meta name='twitter:description' content={metaInfo?.twitterDes} />
        <meta name='twitter:image' content={metaInfo?.twitterImage} />
        <meta name='twitter:image:alt' content={metaInfo?.ogSiteName} />
        <link rel='icon' sizes='192x192' href='/favicon.ico' prefetch={false} />
        <link rel='apple-touch-icon' href='/favicon.ico' prefetch={false}></link>
      </head>
      <section className=''>
        <div
          style={size.width >= 576 ? style : stylemobile}
          className={`bg-[#844FCF] w-full bg-no-repeat min-h-screen xl:min-h-[500px] lg:min-h-[750px] max-[576px]:min-h-full relative ${
            scrollY > 0 ? 'bannerhome-respo-scroll' : ' bannerhome-respo'
          }`}>
          <DynamicHeader businessCategorydata={businessCategorydata} />
          <HomeBanner registerdevicedata={registerdevicedata} />
        </div>
      </section>

      <div className='bg-[#F4F8FB]'>
        <DynamicHomePage
          businessCategorydata={businessCategorydata}
          faqdata={faqdata}
          RecomendedTopselling={RecomendedTopselling}
          longTermData={longTermData}
          registerdevicedata={registerdevicedata}
        />
      </div>

      {/* ========= Footer ========= */}
     
    </>
  )
}
