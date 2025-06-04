// app/components/ClientAnalytics.tsx
"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    UC_UI?: {
      isServiceConsentGiven: (serviceKey: string) => boolean;
      showSecondLayer: () => void;
    };
    dataLayer?: any[];
  }
}

export default function Analytics() {
  useEffect(() => {
    const loadAnalytics = () => {
      if (
        typeof window !== "undefined" &&
        window.UC_UI?.isServiceConsentGiven("google_analytics")
      ) {
        // Inject gtag.js
        const script = document.createElement("script");
        script.src =
          "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID";
        script.async = true;
        document.head.appendChild(script);

        // ✅ Ensure dataLayer exists
        window.dataLayer = window.dataLayer || [];

        function gtag(...args: any[]) {
          window.dataLayer!.push(args); // Now safely non-null
        }

        gtag("js", new Date());
        gtag("config", "GA_MEASUREMENT_ID");
      }
    };

    window.addEventListener("UC_UI_INITIALIZED", loadAnalytics);
    return () => window.removeEventListener("UC_UI_INITIALIZED", loadAnalytics);
  }, []);
  return null;
}
