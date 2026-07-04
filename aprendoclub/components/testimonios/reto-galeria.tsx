"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { reto, retoImagenes } from "@/content/testimonios";

export function RetoGaleria() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const [activo, setActivo] = useState<number | null>(null);

  const cerrar = useCallback(() => setActivo(null), []);

  // Cierre con Escape + bloqueo de scroll cuando el lightbox está abierto.
  useEffect(() => {
    if (activo === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activo, cerrar]);

  const imagenActiva = activo !== null ? retoImagenes[activo] : null;

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-primary)] container-padding section-spacing"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="flex max-w-[700px] flex-col items-center gap-4 text-center"
      >
        <Eyebrow>{reto.eyebrow}</Eyebrow>
        <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          {reto.titulo}
        </h2>
        <p className="text-lg text-gray-400">{reto.texto}</p>
      </motion.div>

      <div className="w-full max-w-5xl columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {retoImagenes.map((imagen, index) => (
          <motion.button
            type="button"
            onClick={() => setActivo(index)}
            key={imagen.src}
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.4),
            }}
            className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg border border-white/10 bg-[var(--surface-card)] transition-all duration-300 hover:border-white/25 hover:-translate-y-0.5 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label={`Ampliar: ${imagen.alt}`}
          >
            <Image
              src={imagen.src}
              alt={imagen.alt}
              width={imagen.width}
              height={imagen.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto object-contain"
            />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {imagenActiva && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={cerrar}
            role="dialog"
            aria-modal="true"
            aria-label="Testimonio ampliado"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
          >
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              key={imagenActiva.src}
              onClick={(e) => e.stopPropagation()}
              initial={reduceMotion ? false : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduceMotion ? undefined : { scale: 0.95, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="max-h-[90vh] max-w-3xl"
            >
              <Image
                src={imagenActiva.src}
                alt={imagenActiva.alt}
                width={imagenActiva.width}
                height={imagenActiva.height}
                sizes="(max-width: 768px) 90vw, 768px"
                className="max-h-[90vh] w-auto h-auto rounded-lg border border-white/10 object-contain shadow-[var(--shadow-lg)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
