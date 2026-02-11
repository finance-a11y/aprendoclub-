"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function StickyCTAMobile() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.querySelector("section");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky CTA when hero is NOT in view
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="bg-[#0a0f14]/95 backdrop-blur-lg border-t border-white/10 px-4 py-3 safe-area-bottom">
            <a
              href="#precios"
              aria-label="Ver planes y precios"
              className="flex w-full items-center justify-center rounded-xl bg-[#b8f60d] px-6 py-3.5 text-base font-bold text-black transition-all duration-300 active:scale-[0.98]"
            >
              Únete a aprendoclub
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
