import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import LoaderComponent from '../client/component/Partners/LoaderComponent/LoaderComponent'



const TermsUse = dynamic(() => import('@/app/client/component/Layout/TermsUse'), {
  ssr: false
})


export default async function Page() {

  return (
    <>
<Suspense fallback={<LoaderComponent />}>

      <div className='bg-[#F4F8FB]'>
        <TermsUse />
      </div>
     </Suspense>
    </>
  )
}
