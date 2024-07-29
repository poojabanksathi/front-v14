import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'

const CreditScorePdfClient = dynamic(() => import('@/app/client/component/Pages/MyProfileClient/CreditScorePdfClient'), {
  ssr: false
})

const Page = () => {
  return (
    <Suspense fallback={<LoaderComponent />}>

    <div className='bg-white'>
      <CreditScorePdfClient />
    </div>
    </Suspense>
  )
}

export default Page



