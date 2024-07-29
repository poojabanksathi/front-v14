import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import LoaderComponent from '../client/component/Partners/LoaderComponent/LoaderComponent'


const PrivacyPolicy = dynamic(() => import('@/app/client/component/Layout/PrivacyPolicy'), {
  ssr: false
})

export default function Page() {

  return (
    <>
  <Suspense fallback={<LoaderComponent />}>

      <div className='bg-[#F4F8FB]'>
        <PrivacyPolicy />

      </div>
    </Suspense>
    </>
  )
}
