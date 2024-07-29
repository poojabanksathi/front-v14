import React from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, BLOG } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import { headers } from 'next/headers'

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})

const DynamicMobileFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})


const TaxDetailClient = dynamic(
  () => import('@/app/client/component/Pages/TaxClient/TaxDetailClient'),
  {
    ssr: false
  }
)

export async function getPageData(slug) {

  const lang_id = 1
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  const blog_url_slug = slug?.['tax-details']
  const taxSlug = 'tax'


  const req3 = {
    lang_id: lang_id
  }
  const newsDetailsReq = {
    blog_url_slug: blog_url_slug
  }
  const newsListReq = {
    blog_url_slug: taxSlug,
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
      {/* <div className=' bg-[#844FCF]'>
        <DynamicHeader businessCategorydata={businessCategorydata} />
      </div> */}
     <TaxDetailClient 
       businessCategorydata={businessCategorydata} 
       businessmetaheadtag={businessmetaheadtag}
       newsListData={newsListData} 
       newsDetailsData={newsDetailsData} 
       blogUrl={params?.['tax-details']}
     />
      {/* <div className='bg-[#fff]'>
        <MobileFooter businessCategorydata={businessCategorydata} />
        <DynamicMobileFooter businessCategorydata={businessCategorydata} />
      
      </div>
      <ScrollToTop smooth color='#000' /> */}
    </>
  )
}

