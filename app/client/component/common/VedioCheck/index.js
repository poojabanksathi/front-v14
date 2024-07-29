"use client";
import KeyBgcredit from "../../../../../public/assets/key-factor-credit.svg";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ReactPlayer from "react-player";

const style = {
  backgroundImage: `url(${KeyBgcredit.src})`,
};

function VedioCheck({ productDetailsData, hideTitle, title }) {
  const [videoStart, setVideoStart] = useState(false);
  const params = useParams();
  const searchParams = useSearchParams();
  const cardsDetails =
    params["cards-details"] || searchParams.get("cards-details");
  const categoryName =
    params["category-name"] || searchParams.get("category-name");

  return (
    <>
      {productDetailsData?.video_url && (
        <div
          id="Video"
          className={`container bg-[#F4F8FB]  mx-auto pb-[10px] pt-[30px] ${
            cardsDetails && categoryName ? "pt-[30px] !pb-0" : ""
          } px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[576px]:px-6 max-[479px]:px-4  max-[479px]:py-[30px] max-[280px]:px-0`}
        >
          {!hideTitle && productDetailsData?.card_name && !title && (
            <div>
              <h2 className="text-[#212529] head-text xl:text-4xl lg:text-3xl md:text-2xl  pt-[15px] max-[576px]:text-[28px] max-[479px]:text-[20px] max-[320px]:text-[19px] font-semibold  max-[479px]:!leading-10  !leading-[50.4px] w-[65%] max-[1440px]:w-[74%] max-[834px]:w-[84%] font-semibold text-center mx-auto pb-[25px] max-[576px]:w-full best-recome-text">
                {`Know everything about ${productDetailsData?.card_name}`}
              </h2>
            </div>
          )}
          {title && (
            <div>
              <h2 className="text-[#212529] head-text xl:text-4xl lg:text-3xl md:text-2xl  pt-[15px] max-[576px]:text-[28px] max-[479px]:text-[20px] max-[320px]:text-[19px] font-semibold  max-[479px]:!leading-10  !leading-[50.4px] w-[65%] max-[1440px]:w-[100%] max-[834px]:w-[84%] font-semibold text-center mx-auto pb-[25px] max-[576px]:w-full best-recome-text">
                {title}
              </h2>
            </div>
          )}

          {productDetailsData?.video_url && (
            <div className="rounded-3xl w-full h-auto  max-[576px]:w-full      video-tutorials mx-auto">
              <ReactPlayer
                url={productDetailsData?.video_url}
                controls={true}
                playing={false}
                className=" w-full aspect-auto mx-auto  rounded-3xl"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default VedioCheck;
