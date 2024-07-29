'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import withAuth from '@/app/client/component/common/PrivateRoute'


const ProductsScore = dynamic(() => import('@/app/client/component/Layout/scoreCreditCard/ProductsScore'), {
  ssr: false
})

const  MyOfferClient = ({faqdata , productList ,bankAccountListing }) => {
  return (
    <>  
      <div className='bg-[#F4F8FB] h-auto'>
        <ProductsScore faqdata={faqdata} productList={productList} bankAccountListing={bankAccountListing} />
      </div>
     
    </>
  )
}
export default withAuth(MyOfferClient)
