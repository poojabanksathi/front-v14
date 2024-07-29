import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { BASE_URL, BUSINESSCATEGORY, COMMON} from '@/utils/alljsonfile/service'
import LoaderComponent from '../client/component/Partners/LoaderComponent/LoaderComponent'



const OurPartner = dynamic(() => import('@/app/client/component/Layout/aboutUs/AboutOurPartner/AboutOurPartner'), {
  ssr: false
})
const AboutBanner = dynamic(() => import('@/app/client/component/Layout/aboutUs/AboutBanner/AboutBanner'), {
  ssr: false
})
const AwardsAbout = dynamic(() => import('@/app/client/component/Layout/aboutUs/AwardsAbout/AwardsAbout'), {
  ssr: false
})
const AbooutContent = dynamic(() => import('@/app/client/component/Layout/aboutUs/AboutContent/AboutContent'), {
  ssr: false
})
const OurLeader = dynamic(() => import('@/app/client/component/Layout/aboutUs/OurLeader/OurLeader'), {
  ssr: false
})
const WhoWeAre = dynamic(() => import('@/app/client/component/Layout/aboutUs/WhoWeAre/WhoWeAre'), {
  ssr: false
})
const VedioCheck = dynamic(() => import('@/app/client/component/common/VedioCheck'), {
  ssr: false
})



async function getAboutData() {
  const lang_id = 1
  const website_url =  process.env.NEXT_PUBLIC_WEBSITE_URL
  const url_slug = ''
  // const last_url = context?.resolvedUrl && context?.resolvedUrl.split('/')
  // const context_params = last_url?.[last_url?.length-1]
  const context_params = 'about-us'

  const req1 = {
    lang_id: lang_id
  }

  const req2 = {
    website_url: website_url,
    lang_id: lang_id
  }

  const req3 = {
    search_string: url_slug,
    lang_id: lang_id
  }
  const req7 = {
    lang_id: lang_id,
    page_url_slug: context_params
  }
  try {
    const [data1,data6] = await Promise.all([
      fetch(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

      fetch(BASE_URL + COMMON?.metaDetailPage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req7),
        cache: 'no-store'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),
     
    ]);

    return {
      businessCategorydata: data1,
      businessmetaheadtag:data6?.data||{},
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}




export default async function Page() {

  const dataAboute =  await getAboutData()

  return (
    <>
              <Suspense fallback={<LoaderComponent/>}>

      <section>
        <div className=' bg-[#844FCF]'>
          <AboutBanner />
        </div>
      </section>
      <div className='bg-[#F4F8FB]'>
        <AbooutContent />
        <WhoWeAre />
        <OurPartner />
        <OurLeader />
        <AwardsAbout />
        <VedioCheck productDetailsData={dataAboute?.businessmetaheadtag}/>
      </div>
</Suspense>
    </>
  )
}

