"use client";
// import "./globals.css";
import "@/styles/globals.css";
import "@/styles/style.css";
import "@/styles/leadsStyle.css";
import "react-datepicker/dist/react-datepicker.css";
import TagManager from "react-gtm-module";
import Cookies from "js-cookie";
import { is_webengage_event_enabled, setHash } from "@/utils/util";
import { v4 as uuidv4 } from "uuid";
import React, { Component, Suspense, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ErrorBoundary from "@/core/ErrorBoundary/ErrorBoundary";
import DynamicFooter from "@/app/client/component/common/Footer";
import DynamicHeader from "@/app/client/component/common/Header";
import HeaderComp from "@/app/client/component/common/HeaderComp/HeaderComp";
import ScrollToTop from "react-scroll-to-top";
import MobileFooter from "@/app/client/component/common/MobileFooter";
import ClientApplication from "@/core/ClientApplication/ClientApplication";
import { BASE_URL, BUSINESSCATEGORY } from "@/utils/alljsonfile/service";
import LoaderComponent from "./client/component/Partners/LoaderComponent/LoaderComponent";


function getData(callback) {
  const url_slug = 'credit-cards';
  const lang_id = 1;

  const req1 = { lang_id: lang_id, business_category_url_slug: url_slug };
  const req4 = { lang_id: lang_id };

  const fetchData = (url, body, cb) => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => cb(null, data))
    .catch(error => cb(error, null));
  };

  fetchData(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, req1, (err, data1) => {
    if (err) {
      callback({ notFound: true });
      return;
    }

    fetchData(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4, (err, data2) => {
      if (err) {
        callback({ notFound: true });
        return;
      }

      callback(null, {
        businessmetaheadtag: data1?.h1_paragraph || null,
        businessCategorydata: data2
      });
    });
  });
}
 

export default  function RootLayout({ children, pageProps }) {
  const [businessCategorydata, setBusinessCategorydata] = useState(null);
  const [businessmetaheadtag, setBusinessmetaheadtag] = useState(null);
  const [isPageHead , setIsPageHead] = useState(false)
  const { query } = useRouter();

  useEffect(() => {
    getData((err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      setBusinessCategorydata(data.businessCategorydata);
      setBusinessmetaheadtag(data.businessmetaheadtag);
    });
  }, []);
  const [value, setValue] = useState();
  const pathname = usePathname();
  const isLandingPage = pathname?.includes("landing");
  const isComaprePage = pathname?.includes("compare");
  const isHomev2 = pathname?.includes("home-pagev2");

  const tryFrontUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

  const getDeviceId = () => {
    let deviceId = typeof window !== "undefined" && Cookies.get("deviceId");
    if (!deviceId) {
      deviceId = uuidv4();
      if (typeof window !== "undefined") {
        Cookies.set("deviceId", deviceId, {
          expires: 365,
          secure: true,
        });
      }
    }
    return deviceId;
  };

  useEffect(() => {
    TagManager?.initialize({ gtmId: "GTM-W9D3PRCF" });
    const h = query?.h;
    if (!h) {
      sessionStorage.removeItem("h");
    }
  }, [query?.h]);

  useEffect(() => {
    if (pageProps?.referer) {
      const refValue = pageProps?.referer?.split("/")?.[2];
      if (refValue !== tryFrontUrl && refValue !== "www.banksathi.com") {
        sessionStorage.setItem("refererOutside", pageProps?.referer);
      }
    }
  }, [pageProps?.referer, tryFrontUrl]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValue(sessionStorage?.getItem("refererOutside"));
    }
  }, [value]);

  useEffect(() => {
    getDeviceId();
    if (query?.utm_source) {
      if (typeof window !== "undefined") {
        const pathname = window?.location?.href;
        localStorage.setItem("url", pathname);
      }
    }
  }, [query?.utm_source]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const h = query?.h;
      if (h) {
        setHash(h);
        localStorage.setItem("h", h);
      }
    }
  }, [query?.h]);

  useEffect(() => {
    const handleGTM = () => {
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getDate()).padStart(2, "0")}/${String(currentDate.getMonth() + 1).padStart(2, "0")}/${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(2, "0")}`;
      const pageUrl = pathname?.split("?")[0];

      window.dataLayer.push({
        dataLayer: {
          event: "page_view",
          page_url: pageUrl,
          date: formattedDate,
        },
      });
    };

    handleGTM();
  }, [pathname]);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, "0")}/${String(currentDate.getMonth() + 1).padStart(2, "0")}/${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(2, "0")}`;
    const pageUrl = pathname?.split("?")[0];
    if (is_webengage_event_enabled && typeof window !== "undefined") {
      window.webengage?.init("in~~71680ba7");

      window.webengage?.track("page_view", {
        page_url: pageUrl,
        date: formattedDate,
      });
    }
  }, [pathname]);

  useEffect(() => {
    const disablePinchZoom = (event) => {
      if (event?.touches?.length > 1) {
        event.preventDefault();
      }
    };
    document.addEventListener("touchmove", disablePinchZoom, {
      passive: false,
    });
    return () => {
      document.removeEventListener("touchmove", disablePinchZoom);
    };
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      document.addEventListener("load", function () {
        navigator.serviceWorker.register('/svc.js', { scope: '/' }).then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);


  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { businessCategorydata, businessmetaheadtag , setIsPageHead });
    }
    return child;
  });


  return (
    <html lang="en">
      {/* <HeaderComp /> */}
      <ErrorBoundary>
        <body>
        {/* <Suspense fallback={<LoaderComponent />}> */}

          {!isLandingPage && (
            <HeaderComp metaData={businessmetaheadtag} />
          )}
          <ClientApplication>
            <body className="font-[poppins]">
              {!isLandingPage && !isComaprePage && !isHomev2 && (
                <div className="bg-[#844FCF] w-full relative">
                  <DynamicHeader
                    businessCategorydata={businessCategorydata}
                  />
                </div>
              )}
              {/* {children} */}
              {childrenWithProps}
              {!isLandingPage && (
                <>
                  <MobileFooter
                    businessCategorydata={businessCategorydata}
                  />
                  <DynamicFooter
                    businessCategorydata={businessCategorydata}
                  />

                  <div className="scroll-top">
                    <ScrollToTop smooth color="#000" />
                  </div>
                </>
              )}
            </body>
          </ClientApplication>
          {/* </Suspense> */}
        </body>
      </ErrorBoundary>
    </html>
  );
}
