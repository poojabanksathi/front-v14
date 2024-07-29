import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY } from '@/utils/alljsonfile/service'
import LoaderComponent from '@/app/client/component/Partners/LoaderComponent/LoaderComponent'


const SetUpProfile = dynamic(() => import('@/app/client/component/Layout/setUpProfile'), {
  ssr: false
})


// async function getData() {
//   const lang_id = 1


//   const req1 = {
//     lang_id: lang_id
//   }

 
//   try {
//     const [data1] = await Promise.all([
//       fetch(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(req1),
//         cache: 'force-cache'
//       }).then(res => res.json()).catch((error) => {
//         return { data: 'notFound' }
//       }),

    
     
//     ]);

//     return {
//       businessCategorydata: data1,
//     };
//   } catch (error) {
//     return {
//       notFound: false
//     };
//   }
// }


export default async function Page() {

  // const data =  await getData()


  return (
    <>

      <div className='h-auto bg-[#F4F8FB]'>
    {/* <Suspense fallback={<LoaderComponent />}> */}
        <SetUpProfile />
{/* </Suspense> */}
      </div>
    </>
  )
}

