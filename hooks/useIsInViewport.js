"use client";
import { useState, useMemo, useEffect } from "react";

export const useIsInViewport = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [ref]);

  return isIntersecting;
};
