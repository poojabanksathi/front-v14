import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, BLOG } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import { headers } from 'next/headers'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'

const PanCardDetailsClient = dynamic(() => import('@/app/client/component/Pages/PanCardClient/PanCardDetailsClient'), {
  ssr: false
})


export async function getPageData(slug) {

  const lang_id = 1
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  const blog_url_slug = slug?.['pan-card-details']
  const panSlug = 'pan-card'

  const req3 = {
    lang_id: lang_id
  }
  const newsDetailsReq = {
    blog_url_slug: blog_url_slug
  }
  const newsListReq = {
    blog_url_slug: panSlug,
    identifier: 'category',
    offset: 0,
    limit: 10
  }


  try {

    const [response1, newsListData , newsDetailsData ] = await Promise.all([
      Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3),
      Axios.post(BASE_URL + BLOG.newsList, newsListReq),
      Axios.post(BASE_URL + BLOG?.blogPostDetail, newsDetailsReq),
    ]).then((responses) => responses.map((response) => response.data));

    return {
      businessCategorydata: response1 || null,
      newsDetailsData: newsDetailsData || null,
      newsListData: newsListData || null,
      referer: ref,
      blogUrl: blog_url_slug,
      businessmetaheadtag: newsDetailsData?.data || null
    };
  } catch (error) {
    return {
      props: {
        notFound: false,
      },
    };
  }
}


export default async function Page({ params }) {

  const { businessCategorydata, businessmetaheadtag , newsListData,  newsDetailsData, blogUrl } = await getPageData(params);

  return (
    <>
                  <Suspense fallback={<LoaderComponent />}>

       <PanCardDetailsClient 
      businessCategorydata={businessCategorydata} 
      businessmetaheadtag={businessmetaheadtag}
      newsListData={newsListData} 
      newsDetailsData={newsDetailsData} 
      blogUrl={params?.['pan-card-details']}
        />
        </Suspense>
    </>
  )
}

