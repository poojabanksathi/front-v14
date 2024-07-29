

'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})

const Loginpage = dynamic(() => import('@/app/client/component/common/Login'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})

async function fetchData() {
      const lang_id = 1;
      let ref = '';
      let h = null;
      let page_url_slug = 'login';

      if (typeof window!== 'undefined') {
        ref = window.location.referrer || '';
        h = window.location.href || null;
        page_url_slug = window.location.pathname.split('/').pop() || 'login';
      }


      const req2 = {
        lang_id: lang_id,
      };
      const metaReq = {
        lang_id: lang_id,
        page_url_slug: page_url_slug,
      };

      try {
        const [data2, metaResponse] = await Promise.all([
          fetch(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req2),
            cache: 'force-cache'
          }).then(res => res.json()).catch((error) => {
            return { data: 'notFound' }
          }),

          fetch(BASE_URL + COMMON.metaDetailPage, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(metaReq),
            cache: 'force-cache'
          }).then(res => res.json()).catch((error) => {
            return { data: null }
          })

        ]);

        return {
          businessCategorydata: data2,
          lastPageVisited: ref,
          referer: ref,
          h: h,
          businessmetaheadtag: metaResponse?.data || null
        };
      } catch (error) {
        return {

            notFound: false
          }
        }
      }


export default function age() {
  const router = useRouter()
const { data } = fetchData()

  useEffect(() => {
    if (typeof window!== 'undefined') {
      if (localStorage.getItem('token') && localStorage.getItem('userData') && localStorage.getItem('leadprofileid')) {
        toast.success('Already logged in!')
        router?.push('/')
      }
    }
  }, [router])



  return (
    <>
      <div className='h-full bg-[#F4F8FB] login-mobile-res '>
   
        <Loginpage lastPageVisited={data?.lastPageVisited} />
      </div>
    </>
  )
}

