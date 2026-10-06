"use client";

import { useEffect } from "react";

import { deferUntilInteraction } from "@/lib/defer-until-interaction";

const META_PIXEL_ID = "1460716535038627";

/**
 * Meta Pixel diferido: `fbq` queda como stub con cola (los eventos previos se
 * reproducen al cargar) y fbevents.js se descarga en la primera interacción o
 * a los 4 s.
 */
export function MetaPixel() {
  useEffect(() => {
    if (!window.fbq) {
      // Snippet oficial del Pixel, sin el <script> remoto todavía.
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const w = window as any;
      const n: any = (w.fbq = function (...args: unknown[]) {
        if (n.callMethod) n.callMethod(...args);
        else n.queue.push(args);
      });
      if (!w._fbq) w._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      /* eslint-enable @typescript-eslint/no-explicit-any */
    }
    return deferUntilInteraction(() => {
      window.fbq("init", META_PIXEL_ID);
      window.fbq("track", "PageView");
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(s);
    });
  }, []);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}

// Helper functions for tracking events
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
}

export function trackInitiateCheckout(plan: string, value: number) {
  trackEvent("InitiateCheckout", {
    content_name: plan,
    currency: "USD",
    value: value,
  });
}

export function trackSchedule(type: string) {
  trackEvent("Schedule", {
    content_name: type,
  });
}

export function trackViewContent(contentName: string) {
  trackEvent("ViewContent", {
    content_name: contentName,
  });
}

// Type declaration for window.fbq
declare global {
  interface Window {
    fbq: (
      type: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}
