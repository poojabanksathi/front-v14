import CommonBreadCrumbComponent from "@/app/client/component/common/CommonList/CommonBreadCrumbComponent";
import {
  BASE_URL,
  BLOG,
  BUSINESSCATEGORY,
  COMMON,
} from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";

const CreditNews = dynamic(
  () => import("@/app/client/component/Layout/CreditNews/CreditNews"),
  {
    ssr: false,
  }
);

// async function getData() {
//   try {
//     const lang_id = 1;
//     const url_slug = "blog";
//     const blog_url_slug = "advisor";

//     const req = {
//       lang_id: lang_id,
//       page_url_slug: url_slug,
//     };

//     const req3 = {
//       lang_id: lang_id,
//     };

//     const newsReq = {
//       blog_url_slug: blog_url_slug,
//       identifier: "subcategory",
//       offset: 0,
//       limit: 10,
//     };
//     const requestParams = {
//       lang_id: lang_id,
//       business_category_url_slug: blog_url_slug,
//       offset: 0,
//       limit: 10,
//     };
//     const response1 = await Axios.post(
//       BASE_URL + BUSINESSCATEGORY.productCategoryLanguage,
//       req3
//     )
//       .then((res) => {
//         return res?.data;
//       })
//       .catch((error) => {
//         return { data: "notFound" };
//       });
//     const response5 = await Axios.post(BASE_URL + COMMON?.metaDetailPage, req)
//       .then((res) => {
//         return res?.data;
//       })
//       .catch((error) => {
//         return { data: null };
//       });
//     const response7 = await Axios.post(BASE_URL + BLOG?.newsList, newsReq)
//       .then((res) => {
//         return res?.data;
//       })
//       .catch((error) => {
//         return { data: null };
//       });

//     return {
//       businessCategorydata: response1.data,
//       CreditNewsList: response7.data,
//       initialOffSet: requestParams?.offset,
//       businessmetaheadtag: response5?.data || null,
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       notFound: true,
//     };
//   }
// }


async function getData() {
  const lang_id = 1;
  const url_slug = "blog";
  const blog_url_slug = "advisor";

  const req = {
    lang_id: lang_id,
    page_url_slug: url_slug,
  };

  const req3 = {
    lang_id: lang_id,
  };

  const newsReq = {
    blog_url_slug: blog_url_slug,
    identifier: "subcategory",
    offset: 0,
    limit: 10,
  };
  const requestParams = {
    lang_id: lang_id,
    business_category_url_slug: blog_url_slug,
    offset: 0,
    limit: 10,
  };

   const fetchData = async (url, body) => {
     try {
       console.log(`Fetching ${url} with`, body);
       const response = await fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(body)
       });
       if (!response.ok) {
         console.error(`Error: ${response.status} ${response.statusText}`);
         return { data: null };
       }
       const data = await response.json();
       console.log(`Response from ${url}:`, data);
       return data;
     } catch (error) {
       console.error(`Fetch error from ${url}:`, error);
       return { data: null };
     }
   };
 
   try {
     const [response1, response5, response7] = await Promise.all([
       fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3),
       fetchData(BASE_URL + COMMON?.metaDetailPage, req),
       fetchData(BASE_URL + BLOG?.newsList, newsReq),
      
     ]);
 
     return {
      businessCategorydata: response1.data,
      CreditNewsList: response7.data,
      initialOffSet: requestParams?.offset,
      businessmetaheadtag: response5?.data || null,
     };
   } catch (error) {
     console.error('General error in getData function:', error);
     return {
       notFound: true
     };
   }
 }

export default async function Page() {
  const { CreditNewsList } = await getData();

  console.log(CreditNewsList, "CreditNewsListCreditNewsListCreditNewsList");

  return (
    <>
      {CreditNewsList && (
        <div className="bg-[#F4F8FB] h-auto">
          <CommonBreadCrumbComponent
            link1={"/advisor"}
            link1Name="Advisor"
            link2={"/advisor/blog"}
            link2Name="Blog"
            title={"Advisor Blogs"}
          />
          <CreditNews
            CreditNewsList={CreditNewsList}
            pageTitle={"Advisor Blog"}
            advisorPage={true}
          />
        </div>
      )}
    </>
  );
}
