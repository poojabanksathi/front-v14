'use client'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import ScrollToTop from 'react-scroll-to-top'
import RecommendationResult from '@/app/client/component/Layout/RecommendationJourney/RecommendationResult/RecommendationResult'
import { useRouter } from 'next/navigation'

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/app/client/component/common/Footer'), {
  ssr: false
})
const CommonBreadCrumbComponent = dynamic(
  () => import('@/app/client/component/common/CommonList/CommonBreadCrumbComponent'),
  {
    ssr: false
  }
)


const RecommendationResultClient = ({ businessCategoryData, leftMenuFilterData }) => {
  const router = useRouter()

  const [filteredList, setFilteredList] = useState([])
  const [formInfo, setFormInfo] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const list = localStorage.getItem('listData') ? JSON.parse(localStorage.getItem('listData')) : {}
      if (list && Object.keys(list)?.length > 0) {
        const formData = localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')) : {}
        setFormInfo(formData)
        list && setFilteredList(list)
      } else {
        router?.push('/credit-cards/recommendation')
      }
    }
  }, [router])

  return (
    <div>
      {/* <div className=' bg-[#844FCF]'>
        <DynamicHeader businessCategorydata={businessCategoryData} />
      </div> */}
      <div className='bg-[#F4F8FB]'>
        <div className='container max-[1200px]:px-0 max-[1024px]:px-0 mx-auto max-[991px]:max-w-full'>
          <CommonBreadCrumbComponent
            link1={'/credit-cards'}
            link1Name='Credit Cards'
            link2={'/credit-cards/recommendation'}
            link2Name='Recommendation'
            link3={`/credit-cards/recommendation/result`}
            link3Name='Result'
          />
        </div>
        <RecommendationResult
          formInfo={formInfo}
          filteredList={filteredList}
          leftMenuFilterData={leftMenuFilterData}
        />
        <div>
        </div>
        {/* <div>
          <MobileFooter businessCategorydata={businessCategoryData} />
        </div> */}
      </div>
      {/* <DynamicFooter businessCategorydata={businessCategoryData} />
      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div> */}
    </div>
  )
}

export default RecommendationResultClient
