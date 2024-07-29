import React from 'react'
import dynamic from 'next/dynamic'

const PartnersClient = dynamic(() => import('@/app/client/component/Pages/PartnersClient/PartnersClient'), {
  ssr: false
})

const Page = () => {
  return (
    <>
      <PartnersClient />
    </>
  )
}

export default Page
