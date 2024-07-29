import React from 'react'
import dynamic from 'next/dynamic'

const NotAuthorized = dynamic(() => import('@/app/client/component/Layout/NotAuthorized/NotAuthorized'), {
  ssr: false
})


export default function Page() {
  return (
    <>

      <div className='bg-[#fff]'>
        <NotAuthorized />
      </div>

    </>
  )
}
