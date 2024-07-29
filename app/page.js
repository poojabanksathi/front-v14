import { headers } from 'next/headers';
import NewHomePage from '@/app/client/component/Layout/NewHomePage/NewHomePage';
import { BASE_URL, BLOG, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service';

async function getData() {
  const lang_id = 1;
  const device_expiry = '24 hours';
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';

  const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0];
  const user_agent = reqHeaders.get('user-agent');

  const deviceId = user_agent?.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);

  const req1 = {
    lang_id: lang_id
  };
  const req7 = {
    device_id: deviceId,
    ip_address: ip,
    user_agent: user_agent,
    device_expiry: device_expiry
  };
  const metaParam = {
    lang_id: lang_id,
    page_url_slug: 'home'
  };
  const blogParams = { offset: 0, limit: 6 };

  try {
    const [data1, data7, blogData, metaData] = await Promise.all([
      fetch(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req1),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: 'notFound' }
      }),

      fetch(BASE_URL + COMMON.registerDevice, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req7),
        cache: 'no-store'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + BLOG.blogList, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogParams),
        next: { revalidate: 10 }
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      }),

      fetch(BASE_URL + COMMON.metaDetailPage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metaParam),
        cache: 'force-cache'
      }).then(res => res.json()).catch((error) => {
        return { data: null }
      })

    ]);

    return {
      businessCategorydata: data1,
      registerdevicedata: data7,
      referer: ref,
      blogData: blogData,
      businessmetaheadtag: metaData?.data || null
    };
  } catch (error) {
    return {
      notFound: false
    };
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <>

      <div className="bg-[#F4F8FB]">
        <NewHomePage
          businessCategorydata={data.businessCategorydata}
          registerdevicedata={data.registerdevicedata}
          blogData={data.blogData}
        />
      </div>

    </>
  );
}

