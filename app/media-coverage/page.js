import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, mediaCoverageApi } from '@/utils/alljsonfile/service'
import LoaderComponent from '../client/component/Partners/LoaderComponent/LoaderComponent'

// import { useRouter } from 'next/navigation'



const MediaCoverageClient = dynamic(() => import('@/app/client/component/Pages/MediaCoverageClient/MediaCoverageClient'), {
  ssr: false
})


async function getMeadiaData() {
  const lang_id = 1

  const req1 = {
    lang_id: lang_id
  }

  try {
    const [data1,data2] = await Promise.all([
      fetch(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

      fetch(BASE_URL + mediaCoverageApi.mediaCoverage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),
     
    ]);

    return {
      businessCategorydata: data1,
      mediaCoverageData: data2?.data,
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}



export default async function Page() {
  const mediaData = await getMeadiaData()


  return (
    <>
                  <Suspense fallback={<LoaderComponent />}>

    <MediaCoverageClient mediaCoverage={mediaData?.mediaCoverageData}/>
</Suspense>

  
    </>
  )
}
