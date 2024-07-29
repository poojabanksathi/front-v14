import React from 'react'
import dynamic from 'next/dynamic'

const DynamicNotFound = dynamic(() => import('@/app/client/component/Layout/pageNotFound'), {
  ssr: false
});


export default function NotFound() {
  return (
<>
        <div className='bg-[#fff]'>
          <DynamicNotFound />
        </div>

  
    </>
  )
}


