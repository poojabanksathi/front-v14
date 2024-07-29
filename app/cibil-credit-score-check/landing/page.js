import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'

const CreditScoreLandingPage = dynamic(
  () => import('@/app/client/component/common/CreditScoreLandingPage/CreditScoreLandingPage'),
  {
    ssr: false
  }
)

const index = () => {
  return (
    <Suspense fallback={<LoaderComponent />}>

    <div>
      <head>
        <meta name='robots' content='noindex,nofollow' />
      </head>
      <div className=' bg-[#844FCF]'>
        <CreditScoreLandingPage />
      </div>
    </div>
    </Suspense>
  )
}

export default index
