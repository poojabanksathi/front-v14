'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { useWindowSize } from '@/hooks/useWindowSize'



const Partners = dynamic(() => import('@/app/client/component/Partners/PartnersMain/Partners'), {
  ssr: false
})

const PartnersClient = () => {
  const size = useWindowSize()

  return (
    <>
      <div className={`w-fit ${size?.width > 1700 ? ' container mx-auto' : ''}`}>
        <Partners />
      </div>
    </>
  )
}

export default PartnersClient
