import dynamic from 'next/dynamic'
import React from 'react'

const CreditScorePdfClient = dynamic(() => import('@/app/client/component/Pages/MyProfileClient/CreditScorePdfClient'), {
  ssr: false
})

const Page = () => {
  return (
    <div className='bg-white'>
      <CreditScorePdfClient />
    </div>
  )
}

export default Page



