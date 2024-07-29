import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import LoaderComponent from '../client/component/Partners/LoaderComponent/LoaderComponent'

const PartnersClient = dynamic(() => import('@/app/client/component/Pages/PartnersClient/PartnersClient'), {
  ssr: false
})

const Page = () => {
  return (
    <>
                  <Suspense fallback={<LoaderComponent />}>

      <PartnersClient />
      </Suspense>
    </>
  )
}

export default Page
