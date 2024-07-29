import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON, BLOG } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import { headers } from 'next/headers'

const PanCardClient = dynamic(() => import('@/app/client/component/Pages/PanCardClient/PanCardClient'), {
  ssr: false
})


async function getData() {
  try {
    const lang_id = 1
    // const url_slug = context?.resolvedUrl?.split('/')?.pop()
    // const blog_url_slug = context?.resolvedUrl?.split('/')?.[1]
    const reqHeaders = headers();
    const ref = reqHeaders.get('referer') || ''; 
    const blog_url_slug = 'pan-card'
    const url_slug = 'pan-card'
   
    const metaDetailsParams = {
      lang_id: lang_id,
      page_url_slug: url_slug
    }
    const bussinessCatParam = {
      lang_id: lang_id
    }
    const newsReq = {
      blog_url_slug: blog_url_slug,
      identifier: 'category',
      offset: 0,
      limit: 10
    }
    const [data1, data7, metaTagsData] = await Promise.all([
      Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, bussinessCatParam),
      Axios.post(BASE_URL + COMMON?.metaDetailPage, metaDetailsParams),
      Axios.post(BASE_URL + BLOG.newsList, newsReq),
    ]).then((responses) => responses.map((response) => response.data))

    return {
      businessCategorydata: data1,
        referer: ref,
        CreditNewsList: data7,
        businessmetaheadtag: metaTagsData?.data || null
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      businessCategorydata: null,
        referer: null,
        CreditNewsList: null,
        businessmetaheadtag:  null
    };
  }
}

export default async function Page() {

  const { businessCategorydata, CreditNewsList , businessmetaheadtag } = await getData();
 
  const faqdata = {

    question_answer: [
        {
            question: "<p>How long does it take to receive a PAN card after applying?</p>",
            answer: "<p>Typically, it takes about 15-20 business days to receive a PAN card after the application has been successfully submitted and all documents have been verified.</p>",
            display_sequence: 1,
        },
        {
          question: "<p>Can I apply for a PAN card if I am not an Indian citizen?</p>",
          answer: "<p>Foreign nationals who wish to undertake financial transactions in India can apply for a PAN card using Form 49AA through NSDL or UTIITSL.</p>",
          display_sequence: 2,
        },
        {
          question: "<p>What should I do if there are errors on my PAN card?</p>",
          answer: "<p>Suppose there are errors or discrepancies on your PAN card. In that case, you should submit a 'Correction' application through the same portal where you applied (NSDL or UTIITSL) with the correct details and necessary supporting documents.</p>",
          display_sequence: 3,
        },
        {
          question: "<p>Is there a way to apply for a PAN card online without sending physical documents?</p>",
          answer: "<p>Now, applicants must post physical copies of their documents after completing the online application. However, for updates and possible changes to this process, check the official NSDL or UTIITSL websites.</p>",
          display_sequence: 4,
        },
        {
          question: "<p>How can I link my PAN with my Aadhaar card?</p>",
          answer: "<p>You can link your PAN with your Aadhaar by visiting the Income Tax e-filing portal, entering your PAN and Aadhaar numbers, and following the instructions to complete the linkage.</p>",
          display_sequence: 5,
        },
    ]
}

  return (

    <PanCardClient
     businessCategorydata={businessCategorydata}
     CreditNewsList={CreditNewsList} 
     faqdata={faqdata} 
     businessmetaheadtag={businessmetaheadtag} 
     />
   
  )
}
