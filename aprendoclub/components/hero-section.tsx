"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronDown, Calendar, Rocket, Star } from "lucide-react";
import { trackSchedule } from "./meta-pixel";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden"
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
      <div className="relative z-10 flex flex-col items-center text-center gap-6 lg:gap-8 container-padding section-spacing max-w-5xl">
        {/* Social Proof Badge */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          className="flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
            <Rocket className="h-4 w-4" aria-hidden="true" />
            +500 estudiantes ya aprenden SEO con IA
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-white"
        >
         La única academia que te prepara {" "}
          <span className="bg-gradient-to-r from-white via-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent">
          para conseguir un trabajo real.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl"
        >
          Especialízate en SEO con la plataforma educativa que te lleva de cero
          a consultor. Cursos, comunidad, mentorías, acompañamiento y vacantes, en un solo lugar.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto"
        >
          <Button
            href="#precios"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Únete a aprendoclub
          </Button>
          <Button
            href="https://calendar.app.google/pRxa4Jd24YZMhVNE7"
            variant="secondary"
            size="lg"
            icon={false}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSchedule("Hero - Agenda llamada")}
            className="w-full sm:w-auto"
          >
            <Calendar className="h-5 w-5" aria-hidden="true" />
            Agenda una llamada
          </Button>
        </motion.div>

        {/* Social Proof Bar */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8"
        >
          {/* Avatars */}
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((num, i) => (
              <Image
                key={num}
                src={`/avatar-${num}.webp`}
                alt=""
                width={40}
                height={40}
                priority
                className={`w-10 h-10 rounded-full object-cover border-2 border-[var(--bg-primary)] ${
                  i !== 0 ? "-ml-3" : ""
                }`}
              />
            ))}
          </div>
          {/* Rating */}
          <p className="flex items-center gap-1 text-sm text-gray-400">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            4.9/5 de +500 estudiantes
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 1.2, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={reduceMotion ? { y: 0 } : { y: [0, 8, 0] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
