"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID = "G-0CCL6NHR71";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

// Helper to track a GA4 event
export function trackGAEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

// Track an outbound/link click (GA4 select_content)
export function trackLinkClick(linkId: string, linkText: string, url: string) {
  trackGAEvent("select_content", {
    content_type: "link",
    item_id: linkId,
    link_text: linkText,
    link_url: url,
    transport_type: "beacon",
  });
}

// Type declaration for window.gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
