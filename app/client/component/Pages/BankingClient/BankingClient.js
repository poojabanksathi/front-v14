"use client";

import CommonBreadCrumbComponent from "@/app/client/component/common/CommonList/CommonBreadCrumbComponent";
import dynamic from "next/dynamic";

const CreditNews = dynamic(
  () => import("@/app/client/component/Layout/CreditNews/CreditNews"),
  {
    ssr: false,
  }
);

const BankingClient = ({ businessCategorydata, CreditNewsList }) => {
  return (
    <>
      <div>
        {CreditNewsList && (
          <div className="bg-[#F4F8FB] h-auto">
            <CommonBreadCrumbComponent
              link1="/banking"
              link1Name="Banking"
              link2Name="News"
              title="Banking Blogs"
            />
            <CreditNews
              CreditNewsList={CreditNewsList}
              pageTitle="Banking Blogs"
              bankingPage={true}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BankingClient;
