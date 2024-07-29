import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, mediaCoverageApi } from '@/utils/alljsonfile/service'

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
  // const router = useRouter()

  // useEffect(() => {
  //   if (mediaData?.mediaCoverageData?.data?.length === 0) {
  //     router.push('/404')
  //   }
  // }, [mediaData?.mediaCoverageData?.data?.length, router])

  return (
    <>
    <MediaCoverageClient mediaCoverage={mediaData?.mediaCoverageData}/>
      {/* <div className=' bg-[#844FCF]'>
        <BredcrumbCalculator />
        <MediaCoverageBanner />
      </div>

      {mediaData?.mediaCoverageData?.data?.length !== 0 && (
        <>
          <div className='bg-[#F4F8FB] '>
            <MediaCoverageSlider mediaCoverage={mediaData?.mediaCoverageData} />
          </div>
          <div className='bg-[#F4F8FB] '>
            <MediaCoverageNews mediaCoverage={mediaData?.mediaCoverageData} />
          </div>
        </>
      )} */}

  
    </>
  )
}
