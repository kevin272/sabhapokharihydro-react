// src/utils/RouteChangeHandler.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    // scroll to top
    window.scrollTo({ top: 0, behavior: "instant" });

    // run vendor scripts after DOM has painted
    const id = requestAnimationFrame(() => {
      if (typeof window.__SABHA_INIT_PAGE__ === "function") {
        window.__SABHA_INIT_PAGE__();
      }
      // refresh ScrollTrigger if you use GSAP
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh(true);
      }
    });

    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
