'use client';
import dynamic from 'next/dynamic'
import React from 'react'
import Link from "next/link";
import logoSticky from '../../../../../public/assets/logo-sticky.svg'
import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'

const LandingPage = dynamic(() => import('@/app/client/component/Layout/LandingPage'), {
  ssr: false
})

const CardLandingClient = ({

  categoryUrl,
  productDetailsUrl,
  productDetailsData,
  businessmetaheadtag
}) => {
  const size = useWindowSize()

  const isMobile = size?.width <= 576
  return (
    <>
        <div className='bg-[#fff]'>
        <div className='p-4 landing-header'>
          <Link href="/">
            <Image src={logoSticky} alt='img_text' className='md:w-[200px] w-[150px] header-logo-landing' />
            </Link>
          </div>
        </div>

        <LandingPage
          productDetailsData={productDetailsData}
          categoryUrl={categoryUrl}
          productDetailsUrl={productDetailsUrl}
          businessmetaheadtag={businessmetaheadtag}
        />
        {!isMobile &&
        <div className=' bg-[#EAF0F5] '>
          <div className='p-5 text-center text-[15px]'>
            All Right Reserved | © Copyright @BankSathi {new Date()?.getFullYear()}
          </div>
        </div>
        }
    </>
  )
}



export default CardLandingClient;
