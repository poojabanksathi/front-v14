import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { BASE_URL, BUSINESSCATEGORY } from '@/utils/alljsonfile/service'

import { metaInfo } from '@/utils/metaInfo'
import Head from 'next/head'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'

const NoReportFound = dynamic(() => import('@/app/client/component/Layout/scoreCreditCard/NoReportFound'), {
  ssr: false
})


async function getData() {
  const lang_id = 1
  const url_slug = 'my-profile'

  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  const req1 = {
    lang_id: lang_id,
    business_category_url_slug: url_slug
  }
  const req4 = {
    lang_id: lang_id
  }



  try {
    const [data1, data3] = await Promise.all([
      fetch(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req4),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

      fetch(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'no-store'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),


    ]);

    return {
      businessmetaheadtag: data1?.h1_paragraph || null,
      businessCategorydata: data3,
      referer: ref,
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}

export default async function Page() {
  const {businessmetaheadtag, businessCategorydata} = await getData();

  const getOgUrl = typeof window !== 'undefined' && window?.location?.href
  const modifiedUrl = typeof window !== 'undefined' && window.location.origin + window.location.pathname
  const CDN_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const CDN_URL_http = CDN_URL?.replace('https', 'http')
  return (
    <>
      <head>
        <title>{businessmetaheadtag?.h1_paragraph?.meta_title || metaInfo?.pageTitle}</title>
        <link rel='canonical' href={modifiedUrl} />
        <meta name='description' content={businessmetaheadtag?.h1_paragraph?.meta_description || metaInfo?.pageDescription} />
        {process.env.NEXT_PUBLIC_WEBSITE_URL == 'www.banksathi.com' ? (
          <meta name='robots' content='index,follow' />
        ) : (
          <meta name='robots' content='noindex,nofollow' />
        )}
        <meta name='og:title' content={businessmetaheadtag?.h1_paragraph?.og_title || metaInfo?.ogTitle} />
        <meta name='og:type' content={businessmetaheadtag?.h1_paragraph?.og_type || metaInfo?.ogType} />
        <meta name='og:url' content={getOgUrl} />
        <meta name='og:description' content={businessmetaheadtag?.h1_paragraph?.og_description || metaInfo?.ogDescription} />
        <meta
          name='og:image'
          content={
            businessmetaheadtag?.h1_paragraph?.og_image == null || undefined
              ? CDN_URL_http
              : CDN_URL_http + '/' + businessmetaheadtag?.h1_paragraph?.og_image
          }
        />
        <meta
          name='og:image:secure'
          content={
            businessmetaheadtag?.h1_paragraph?.og_image == null || undefined ? CDN_URL : CDN_URL + '/' + businessmetaheadtag?.h1_paragraph?.og_image
          }
        />

        <meta name='og:image:width' content='300' />
        <meta name='og:image:height' content='300' />
        <meta name='og:image:alt' content={businessmetaheadtag?.h1_paragraph?.og_image_alt || metaInfo?.ogImageAlt} />
        <meta name='og:image:type' content={businessmetaheadtag?.h1_paragraph?.og_image_type || metaInfo?.ogImageType} />
        <meta name='og:site_name' content={businessmetaheadtag?.h1_paragraph?.og_site_name || metaInfo?.ogSiteName} />
        <meta name='twitter:card' content={businessmetaheadtag?.h1_paragraph?.twitter_card || metaInfo?.twitterCard} />
        <meta name='twitter:site' content={businessmetaheadtag?.h1_paragraph?.twitter_sit || metaInfo?.twitterSite} />
        <meta name='twitter:title' content={businessmetaheadtag?.h1_paragraph?.twitter_title || metaInfo?.twitterTitle} />
        <meta name='twitter:description' content={businessmetaheadtag?.h1_paragraph?.twitter_description || metaInfo?.twitterDes} />
        <meta
          name='twitter:image'
          content={
            businessmetaheadtag?.h1_paragraph?.twitter_image == null || undefined
              ? CDN_URL
              : CDN_URL + '/' + businessmetaheadtag?.h1_paragraph?.twitter_image
          }
        />
        <meta name='twitter:image:alt' content={businessmetaheadtag?.h1_paragraph?.twitter_img_alt || metaInfo?.ogSiteName} />
        <link rel='icon' sizes='192x192' href='/favicon.ico' prefetch={false} />
        <link rel='apple-touch-icon' href='/favicon.ico' prefetch={false}></link>
      </head>

      <Suspense fallback={<LoaderComponent />}>

      <div className='bg-white'>
        <NoReportFound />
      </div>
      </Suspense>
    </>
  )
}
