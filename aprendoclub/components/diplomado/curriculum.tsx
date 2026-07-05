"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Eyebrow } from "@/components/ui/eyebrow"

const weeks = [
  { week: 1, title: "Introducción al SEO - Empezando desde cero", detail: "Aprende a llevar a cabo un proyecto SEO de inicio a fin." },
  { week: 2, title: "Proyecto SEO - Inicia tu camino", detail: "Configura tu primer proyecto SEO real paso a paso." },
  { week: 3, title: "Herramientas SEO - Potencia tu trabajo", detail: "Domina las herramientas esenciales del ecosistema SEO." },
  { week: 4, title: "Palabras clave - La base de tu estrategia", detail: "Aprende a investigar y seleccionar las mejores keywords." },
  { week: 5, title: "Mapa de palabras clave - Enfócate en lo que ya tiene", detail: "Organiza y prioriza tus palabras clave estratégicamente." },
  { week: 6, title: "Análisis de la competencia - Encuentra oportunidades de negocio", detail: "Descubre qué hacen tus competidores y cómo superarlos." },
  { week: 7, title: "Estrategias SEO - Acelera tu crecimiento", detail: "Implementa estrategias probadas para escalar resultados." },
  { week: 8, title: "Producción de contenido - Empieza a crear contenido que posicione", detail: "Crea contenido optimizado que Google ame." },
  { week: 9, title: "Arquitectura web - Organiza una web que Google ame", detail: "Estructura tu sitio para máximo rendimiento SEO." },
  { week: 10, title: "Optimización de contenido existente - Impulsa lo que ya tienes", detail: "Mejora el contenido que ya tienes para obtener más tráfico." },
  { week: 11, title: "Redacción SEO - Escribe para posicionar", detail: "Domina el arte de escribir copy que posiciona." },
  { week: 12, title: "Medición de resultados - Evalúa el éxito de tus estrategias", detail: "Aprende a medir y reportar resultados SEO." },
  { week: 13, title: "Tipos de SEO - Divide y conquista tu posicionamiento", detail: "Entiende SEO on-page, off-page y técnico a profundidad." },
  { week: 14, title: "SEO para Nichos - Domina mercados específicos", detail: "Especializa tus estrategias para nichos específicos." },
  { week: 15, title: "Freelance y Empleo SEO - Da el siguiente paso", detail: "Prepara tu perfil profesional para oportunidades reales." },
  { week: 16, title: "Proyecto Final y Certificación - Conviértete en Especialista SEO", detail: "Completa tu proyecto final y obtén tu certificación." },
]

export function Curriculum() {
  const [openWeek, setOpenWeek] = useState<number | null>(0)

  return (
    <section className="section-spacing">
      <div className="mx-auto max-w-6xl container-padding">
        <Eyebrow className="mb-4 block">16 semanas</Eyebrow>

        <h2 className="max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.2] text-white md:text-4xl">
          Pasa de no saber nada a optimizar tu primer sitio web en 16 semanas
        </h2>

        <ol className="mt-12 max-w-3xl">
          {weeks.map((w, i) => {
            const open = openWeek === i
            const last = i === weeks.length - 1
            return (
              <li key={i} className="flex gap-4 md:gap-5">
                {/* Node + connecting line */}
                <div className="flex flex-col items-center">
                  <span
                    aria-hidden="true"
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-200 ${
                      open
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                        : "border-[var(--border-card)] bg-[var(--surface-card)] text-[var(--primary-light)]"
                    }`}
                  >
                    {w.week}
                  </span>
                  {!last && (
                    <span
                      aria-hidden="true"
                      className="mt-1 w-px flex-1 bg-[var(--border-card)]"
                    />
                  )}
                </div>

                {/* Content */}
                <div className={last ? "flex-1" : "flex-1 pb-6"}>
                  <button
                    onClick={() => setOpenWeek(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`week-panel-${i}`}
                    className="group flex w-full items-start gap-3 pt-1.5 text-left"
                  >
                    <span className="flex-1">
                      <span className="block text-xs font-medium uppercase tracking-[0.12em] text-[var(--primary-light)]">
                        Semana {w.week}
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold text-white transition-colors group-hover:text-white/90 md:text-base">
                        {w.title}
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={`week-panel-${i}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="pt-2 text-sm leading-relaxed text-gray-400">
                        {w.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
