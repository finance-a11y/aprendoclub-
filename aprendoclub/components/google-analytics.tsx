"use client";

import { useEffect } from "react";

import { deferUntilInteraction } from "@/lib/defer-until-interaction";

const GA_MEASUREMENT_ID = "G-0CCL6NHR71";

/**
 * GA4 diferido: los eventos previos a la carga se encolan en `dataLayer` (stub
 * de `gtag`) y gtag.js se descarga en la primera interacción o a los 4 s, para
 * no competir con el LCP ni sumar TBT en la carga inicial.
 */
export function GoogleAnalytics() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
    }
    return deferUntilInteraction(() => {
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID);
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(s);
    });
  }, []);

  return null;
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
    dataLayer: unknown[];
  }
}
