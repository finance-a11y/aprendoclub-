"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { homeFaqs as faqs } from "@/content/faqs";
import { Eyebrow } from "@/components/ui/eyebrow";

export function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-secondary)] container-padding section-spacing"
    >
      {/* Header */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="flex max-w-[700px] flex-col items-center gap-4"
      >
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-center text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          Resolvemos tus dudas
        </h2>
      </motion.div>

      {/* FAQ Accordion */}
      <div className="w-full max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.1 }}
            className={index !== faqs.length - 1 ? "border-b border-white/[0.06]" : ""}
          >
            <button
              onClick={() => toggleItem(index)}
              aria-expanded={openIndex === index}
              className="group flex w-full items-center justify-between py-5 text-left"
            >
              <span
                className={`text-lg font-semibold pr-4 transition-colors duration-300 ${
                  openIndex === index
                    ? "text-white"
                    : "text-white group-hover:text-white/80"
                }`}
              >
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0"
              >
                <ChevronDown
                  className="h-5 w-5 text-gray-400 transition-colors duration-300"
                />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-base leading-relaxed text-gray-400">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
