import dynamic from 'next/dynamic'
import React from 'react'


const PrivacyPolicy = dynamic(() => import('@/app/client/component/Layout/PrivacyPolicy'), {
  ssr: false
})

export default function Page() {

  return (
    <>
  
      <div className='bg-[#F4F8FB]'>
        <PrivacyPolicy />

      </div>
    
    </>
  )
}
