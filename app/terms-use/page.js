import dynamic from 'next/dynamic'
import React from 'react'



const TermsUse = dynamic(() => import('@/app/client/component/Layout/TermsUse'), {
  ssr: false
})


export default async function Page() {

  return (
    <>

      <div className='bg-[#F4F8FB]'>
        <TermsUse />
      </div>
     
    </>
  )
}
