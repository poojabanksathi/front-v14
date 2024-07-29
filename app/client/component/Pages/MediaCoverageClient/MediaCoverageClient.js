"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const MediaCoverageBanner = dynamic(
  () =>
    import("@/app/client/component/Layout/MediaCoverage/MediaCoverageBanner"),
  {
    ssr: false,
  }
);
const MediaCoverageSlider = dynamic(
  () =>
    import("@/app/client/component/Layout/MediaCoverage/MediaCoverageSlider"),
  {
    ssr: false,
  }
);
const MediaCoverageNews = dynamic(
  () => import("@/app/client/component/Layout/MediaCoverage/MediaCoverageNews"),
  {
    ssr: false,
  }
);

const BredcrumbCalculator = dynamic(
  () =>
    import("@/app/client/component/common/CalculatorCards/BredcrumbCalculator"),
  {
    ssr: false,
  }
);

const MediaCoverageClient = ({ mediaCoverage }) => {
  const router = useRouter();

  useEffect(() => {
    if (mediaCoverage?.data?.length === 0) {
      router.push("/404");
    }
  }, [mediaCoverage?.data?.length, router]);

  return (
    <>
      <div className=" bg-[#844FCF]">
        <BredcrumbCalculator />
        <MediaCoverageBanner />
      </div>

      {mediaCoverage?.data?.length !== 0 && (
        <>
          <div className="bg-[#F4F8FB] ">
            <MediaCoverageSlider mediaCoverage={mediaCoverage} />
          </div>
          <div className="bg-[#F4F8FB] ">
            <MediaCoverageNews mediaCoverage={mediaCoverage} />
          </div>
        </>
      )}
    </>
  );
};

export default MediaCoverageClient;
