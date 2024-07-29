import dynamic from 'next/dynamic'
import React from 'react'

const Disclaimer = dynamic(() => import('@/app/client/component/Layout/Disclaimer'), {
  ssr: false
})


const KnowledgebaseBreadcrumb = dynamic(
  () => import('@/app/client/component/Layout/knowledgeBaseDetail/KnowledgebreadCrumb/KnowledgebreadCrumb'),
  {
    ssr: false
  }
)

export default function Page() {
  return (
    <>

      <div className='bg-[#F4F8FB]  xl:px-0 max-sm:px-[20px] lg:px-[65px] md:px-[40px] '>
        <KnowledgebaseBreadcrumb />
      </div>
      <div className='bg-[#F4F8FB]'>
        <Disclaimer />
      </div>

    </>
  )
}
