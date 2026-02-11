"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)] container-padding py-32"
    >
      {/* Animated Background Blobs */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#012fd8]/20 blur-3xl"
        style={{ animation: "float-slow 20s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#b8f60d]/20 blur-3xl"
        style={{ animation: "float-slow 20s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#012fd8]/10 blur-3xl"
        style={{ animation: "pulse-blob 8s ease-in-out infinite" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-white"
        >
          Deja de aprender solo. Únete a la comunidad.
        </motion.h2>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          href="#precios"
          className="flex items-center justify-center rounded-xl bg-[#b8f60d] px-10 py-5 text-lg font-bold text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(184,246,13,0.3)]"
        >
          Comenzar ahora
        </motion.a>

      </div>
    </section>
  );
}
