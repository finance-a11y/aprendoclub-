"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/content/quienes-somos";

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center bg-[var(--bg-secondary)] container-padding section-spacing"
    >
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <span className="text-4xl md:text-5xl font-extrabold text-white">
              {stat.value}
            </span>
            <span className="text-sm text-gray-500">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
