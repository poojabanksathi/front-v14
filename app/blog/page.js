import dynamic from 'next/dynamic'
import React from 'react'
import { BASE_URL, BLOG, BUSINESSCATEGORY, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'

const KnowledgeBaseDetail = dynamic(() => import('@/app/client/component/Layout/knowledgeBaseDetail'), {
  ssr: false
})
const KnowledgebaseBreadcrumb = dynamic(
  () => import('@/app/client/component/Layout/knowledgeBaseDetail/KnowledgebreadCrumb/KnowledgebreadCrumb'),
  {
    ssr: false
  }
)
const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})



async function fetchData() {
  // const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]

  const lang_id = 1
  const url_slug = 'blog'
  const page_id = 1

  const pagedata = {
    offset: 0,
    limit: 9
  }
  const req1 = {
    lang_id: lang_id,
    business_category_url_slug: url_slug
  }
  const req2 = {
    lang_id: lang_id,
    url_slug: url_slug,
    page_id: page_id
  }
  const req4 = {
    lang_id: lang_id
  }
  try {
    const [data1,data2 ,data3, data4, data5, data7,data8 , data10] = await Promise.all([
   


      fetch(BASE_URL + BUSINESSCATEGORY.productListCategory, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

      fetch(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'no-store'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + FAQAPI.productFaq, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req2),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + BUSINESSCATEGORY.formLongcontent, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req4),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + BLOG.blogList, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pagedata),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

    ]);

    return {
      productlistdata: data1,
      categorytopmenulist: data2,
      businessmetaheadtag: data3?.h1_paragraph || {},
      faqdata: data4,
      longTerm: data5,
      businessCategorydata: data7,
      moreleftmenucredit: data8,
      getAllBlog: data10,
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}


export default async function Page() {

  const data = await fetchData()

  return (
    <>

      <div className='bg-[#F4F8FB]'>
        <KnowledgebaseBreadcrumb />
        <KnowledgeBaseDetail faqdata={data?.faqdata} getAllBlog={data?.getAllBlog} />
      </div>
    
  
    </>
  )
}