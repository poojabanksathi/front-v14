import dynamic from 'next/dynamic'
import React from 'react'

const CreditScoreLandingPage = dynamic(
  () => import('@/app/client/component/common/CreditScoreLandingPage/CreditScoreLandingPage'),
  {
    ssr: false
  }
)

const index = () => {
  return (
    <div>
      <head>
        <meta name='robots' content='noindex,nofollow' />
      </head>
      <div className=' bg-[#844FCF]'>
        <CreditScoreLandingPage />
      </div>
    </div>
  )
}

export default index
