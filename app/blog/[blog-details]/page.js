import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { BASE_URL, BLOG, BUSINESSCATEGORY, FAQAPI } from '@/utils/alljsonfile/service'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'


const BlogDetails = dynamic(() => import('@/app/client/component/Layout/BlogDetails'), {
  ssr: false
})

const KnowledgebaseBreadcrumb = dynamic(
  () => import('@/app/client/component/Layout/knowledgeBaseDetail/KnowledgebreadCrumb/KnowledgebreadCrumb'),
  {
    ssr: false
  }
)


async function fetchData(slug) {

  // const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]
  const context_params_sub_cat = slug?.['blog-details']


  const lang_id = 1
  const url_slug = 'blog'
  const page_id = 1

  const req1 = {
    lang_id: lang_id,
    business_category_url_slug: url_slug
  }
  const req2 = {
    lang_id: lang_id,
    page_id: page_id,
    url_slug: url_slug,
    sub_cat_url_slug: context_params_sub_cat
  }

  const req4 = {
    lang_id: lang_id
  }
  const req6 = {
    blog_url_slug: context_params_sub_cat
  }

  try {
    const [data1, data2 ,data3, data4, data5, data7, data8 , data10] = await Promise.all([
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

      fetch(BASE_URL + BLOG.blogPostDetail, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req6),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

    ]);

    return {
      productlistdata: data1,
      categorytopmenulist: data2,
      businessmetaheadtag: data3 || data10?.data || {},
      faqdata: data4,
      longTerm: data5,
      businessCategorydata: data7,
      moreleftmenucredit: data8,
      blogPostDetailData: data10,
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}



export default async function Page({ params }) {
const blogData = await fetchData(params)

  return (
    <>
          <Suspense fallback={<LoaderComponent />}>

      <section>
        <div className='bg-[#F4F8FB] pl-4'>
          <KnowledgebaseBreadcrumb />
        </div>
        <div className='bg-[#F4F8FB] '>
          <BlogDetails blogPostDetailData={blogData?.blogPostDetailData?.data} />
        </div>
      </section>
      </Suspense>
    </>
  )
}


