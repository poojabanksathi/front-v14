"use client";
import React from "react";
import HomeHeader from "./homeHeader";
import HomeBanner from "./homeBanner";
import HomeFeatured from "./homeFeatured";
import HomeAdvisor from "./homeAdvisor";
import HomePathSucess from "./homePathSucess";
import HomePartners from "./homePartners";
import HomeGetApp from "./homeGetApp";
import FAQ from "../../common/FAQ/FAQ";

function HomePageV2({ faqdata }) {
  return (
    <>
      <HomeHeader />
      <HomeBanner />
      <HomeFeatured />
      <div className="bg-white">
        <HomeAdvisor />
      </div>
      <HomePathSucess />
      <div className="pt-[20px] bg-[#F4F8FB]">
        <FAQ faqdata={faqdata} />
      </div>
      <HomePartners />
      <HomeGetApp />
    </>
  );
}

export default HomePageV2;
