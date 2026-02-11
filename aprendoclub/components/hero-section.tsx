"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, Calendar } from "lucide-react";
import { trackSchedule } from "./meta-pixel";

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dots Pattern Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/80 via-black/60 to-[var(--bg-primary)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 lg:gap-8 container-padding py-24 md:py-32 max-w-5xl">
        {/* Social Proof Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-2 rounded-full border border-[#b8f60d]/30 bg-[#b8f60d]/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="text-sm font-medium text-[#b8f60d]">
            🚀 +500 estudiantes ya aprenden SEO con IA
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
        >
          Deja de improvisar tu{" "}
          <span className="bg-gradient-to-r from-white via-[#b8f60d] to-[#012fd8] bg-clip-text text-transparent">
            carrera en marketing
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl"
        >
          Especialízate en SEO con la plataforma educativa que te lleva de cero
          a consultor. Cursos, comunidad, mentorías, acompañamiento y vacantes, en un solo lugar.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto"
        >
          <a
            href="#precios"
            aria-label="Ver planes y precios"
            className="w-full sm:w-auto flex items-center justify-center rounded-xl bg-[var(--primary)] px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-[var(--primary-medium)] hover:shadow-[0_0_40px_rgba(1,47,216,0.5)]"
          >
            Únete a aprendoclub
          </a>
          <a
            href="https://calendar.app.google/pRxa4Jd24YZMhVNE7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agenda una llamada con un asesor"
            onClick={() => trackSchedule("Hero - Agenda llamada")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30"
          >
            <Calendar className="h-5 w-5" aria-hidden="true" />
            Agenda una llamada
          </a>
        </motion.div>

        {/* Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8"
        >
          {/* Avatars */}
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((num, i) => (
              <img
                key={num}
                src={`/avatar-${num}.webp`}
                alt=""
                className={`w-10 h-10 rounded-full object-cover border-2 border-[var(--bg-primary)] ${
                  i !== 0 ? "-ml-3" : ""
                }`}
              />
            ))}
          </div>
          {/* Rating */}
          <p className="text-sm text-gray-500">
            <span className="text-yellow-400">⭐</span> 4.9/5 de +500 estudiantes
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
