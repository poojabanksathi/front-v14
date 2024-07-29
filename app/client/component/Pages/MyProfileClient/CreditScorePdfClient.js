'use client'
import withAuth from '@/app/client/component/common/PrivateRoute'
import dynamic from 'next/dynamic'
import React from 'react'

const CreditReportPDF = dynamic(() => import('@/app/client/component/common/CreditReportPDF/CreditReportPDF'), {
  ssr: false
})

const CreditScorePdfClient = () => {
  return (
      <CreditReportPDF />
  )
}

export default withAuth(CreditScorePdfClient)



