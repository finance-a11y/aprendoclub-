import type { Payload } from "payload";

import type { Faq, Page } from "@/payload-types";
import {
  aboutGraph,
  course,
  faqGraph,
  homeGraph,
  programasGraph,
  testimoniosGraph,
} from "@/lib/schema";

/**
 * Registry de JSON-LD por página.
 *
 * Cada slug resuelve sus grafos leyendo datos de Payload y llamando a los
 * builders PUROS de `lib/schema.ts` (esa capa no se toca). El render se hace
 * con `<JsonLd>` en la ruta catch-all y en el home. Reconecta el structured
 * data que se perdió al migrar cada página al catch-all (Phases 15-16) —
 * replica verbatim los call-sites previos, recuperados de git.
 */

/** Extrae las FAQs del primer bloque `faqRef` del layout (docs poblados a depth>=2). */
function faqsFromLayout(doc: Page | undefined): { question: string; answer: string }[] {
  const block = (doc?.layout ?? []).find(
    (b): b is Extract<Page["layout"][number], { blockType: "faqRef" }> =>
      b.blockType === "faqRef",
  );
  if (!block) return [];
  return ((block.items ?? []) as (number | Faq)[])
    .filter((it): it is Faq => typeof it === "object" && it !== null)
    .map((f) => ({ question: f.question, answer: f.answer }));
}

/** Course curados verbatim de los call-sites previos (git). */
const COURSES: Record<string, Parameters<typeof course>[0]> = {
  "programas/diplomado": {
    name: "Diplomado de cero a SEO",
    description:
      "Conviértete en especialista SEO en 16 semanas, sin experiencia previa. Práctica guiada, coaching en vivo y certificación.",
    path: "/programas/diplomado",
    price: "700",
    courseWorkload: "P16W",
  },
  diplomado: {
    name: "Diplomado de cero a SEO",
    description:
      "Conviértete en especialista SEO en 16 semanas, sin experiencia previa. Práctica guiada, coaching en vivo y certificación.",
    path: "/programas/diplomado",
    price: "700",
    courseWorkload: "P16W",
  },
  "programas/reto": {
    name: "Reto 7 días",
    description:
      "7 días para construir tu plan realista y ganar tus primeros +$1,000/mes en dólares, especializándote en las habilidades mejor pagadas del marketing digital y la inteligencia artificial.",
    path: "/programas/reto",
    price: "20",
    courseWorkload: "P7D",
    startDate: "2026-07-13",
  },
  reto: {
    name: "Reto 7 días",
    description:
      "7 días para construir tu plan realista y ganar tus primeros +$1,000/mes en dólares, especializándote en las habilidades mejor pagadas del marketing digital y la inteligencia artificial.",
    path: "/programas/reto",
    price: "20",
    courseWorkload: "P7D",
    startDate: "2026-07-13",
  },
  "programas/taller-seo-con-ia": {
    name: "Taller de SEO con IA",
    description:
      "Aprende a hacer que una marca o negocio aparezca en las búsquedas de Google, Gemini y ChatGPT.",
    path: "/programas/taller-seo-con-ia",
    price: "30",
    courseWorkload: "P1D",
  },
  "programas/curso-seo-rdss": {
    name: "Curso SEO RDSS",
    description:
      "Taller práctico de SEO de 2 horas con Arianna Lupi. Optimización técnica, quick wins y plan de acción.",
    path: "/programas/curso-seo-rdss",
    price: "30",
    courseWorkload: "PT2H",
  },
  "programas/curso-basico-de-seo": {
    name: "Curso Básico de SEO",
    description:
      "Aprende las bases del posicionamiento web desde cero: rastreo, indexación, keyword research y métricas en Google Search Console.",
    path: "/programas/curso-basico-de-seo",
    price: "0",
    courseWorkload: "P1W",
  },
};

export async function getGraphsForSlug(
  slug: string,
  payload: Payload,
  doc?: Page,
): Promise<object[] | null> {
  const graphs: object[] = [];

  switch (slug) {
    case "": {
      // Home: Organization + WebSite + FAQPage (del bloque faqRef del Page home).
      graphs.push(...homeGraph());
      const faqs = faqsFromLayout(doc);
      if (faqs.length) graphs.push(faqGraph(faqs));
      break;
    }

    case "quienes-somos": {
      const { docs } = await payload.find({
        collection: "team-members",
        where: { mostrarEnQuienesSomos: { equals: true } },
        sort: "orden",
        depth: 0,
        limit: 100,
      });
      graphs.push(
        ...aboutGraph(docs.map((m) => ({ nombre: m.nombre, rol: m.rol }))),
      );
      break;
    }

    case "programas": {
      const { docs } = await payload.find({
        collection: "programas",
        sort: "orden",
        depth: 0,
        limit: 100,
      });
      graphs.push(
        programasGraph(docs.map((p) => ({ name: p.nombre, path: p.ctaHref }))),
      );
      break;
    }

    case "testimonios": {
      const { docs } = await payload.find({
        collection: "testimonios",
        sort: "orden",
        depth: 0,
        limit: 1000,
      });
      graphs.push(
        testimoniosGraph(
          docs.map((t) => ({
            nombre: t.nombre,
            quote: t.quote,
            ubicacion: t.ubicacion ?? undefined,
          })),
        ),
      );
      break;
    }

    case "programas/diplomado":
    case "programas/reto":
    case "diplomado":
    case "reto":
    case "programas/taller-seo-con-ia":
    case "programas/curso-seo-rdss":
    case "programas/curso-basico-de-seo": {
      graphs.push(course(COURSES[slug]));
      // diplomado/reto también llevaban FAQPage (del bloque faqRef de su Page).
      const faqs = faqsFromLayout(doc);
      if (faqs.length) graphs.push(faqGraph(faqs));
      break;
    }

    default:
      return null;
  }

  return graphs.length ? graphs : null;
}
