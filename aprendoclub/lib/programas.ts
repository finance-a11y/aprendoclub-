/**
 * Capa presentacional de programas (Phase 15 Plan 02 cutover).
 *
 * MIG-03: la colección `Programas` (Payload) es la fuente única de datos para
 * el hub /programas, el mega-menú del navbar (Phase 15 Plan 01) y la sección
 * de programas del home. Este módulo expone el tipo presentacional `Program`
 * que consumen `program-card.tsx` / `programas-section.tsx`, el mapper
 * `mapProgramaDoc` que traduce un doc `Programa` de la colección a ese tipo,
 * y `homeProgramas` (cabecera de la sección del home, movida VERBATIM desde
 * el extinto content/programas.ts).
 */

import type { Programa } from "@/payload-types";

/** Programa presentacional que consume ProgramCard (hub + home). */
export interface Program {
  id: string;
  badge: string;
  nombre: string;
  descripcion: string;
  precio: string;
  precioNota?: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Traduce un doc `Programa` de la colección al tipo presentacional `Program`. */
export function mapProgramaDoc(doc: Programa): Program {
  return {
    id: String(doc.id),
    badge: doc.badge,
    nombre: doc.nombre,
    descripcion: doc.descripcion,
    precio: doc.precio,
    precioNota: doc.precioNota ?? undefined,
    ctaLabel: doc.ctaLabel,
    ctaHref: doc.ctaHref,
  };
}

/** Cabecera de la sección de programas del home (PROG-06). */
export interface HomeProgramas {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  botonLabel: string;
  botonHref: string;
}

/** Cabecera de la sección de programas del home (verbatim desde content/programas.ts). */
export const homeProgramas: HomeProgramas = {
  eyebrow: "NUESTROS PROGRAMAS",
  titulo: "Formación para cada etapa de tu carrera",
  subtitulo: "Elige cómo quieres aprender SEO e IA.",
  botonLabel: "Ver todos los programas",
  botonHref: "/programas",
};
