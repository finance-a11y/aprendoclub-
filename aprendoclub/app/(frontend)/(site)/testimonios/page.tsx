import type { Metadata } from "next";
import { TestimoniosHero } from "@/components/testimonios/hero";
import { TestimoniosGrid } from "@/components/testimonios/grid";
import { RetoGaleria } from "@/components/testimonios/reto-galeria";
import { TestimoniosCta } from "@/components/testimonios/cta";
import { JsonLd } from "@/components/json-ld";
import { testimoniosGraph } from "@/lib/schema";
import { testimonios } from "@/content/testimonios";

export const metadata: Metadata = {
  title: "Testimonios | aprendoclub",
  description:
    "Historias reales de estudiantes de aprendoclub que empezaron desde cero y hoy posicionan sitios, consiguen clientes o trabajan remoto con el SEO.",
};

export default function TestimoniosPage() {
  return (
    <>
      <JsonLd data={testimoniosGraph(testimonios)} />
      <TestimoniosHero />
      <TestimoniosGrid />
      <RetoGaleria />
      <TestimoniosCta />
    </>
  );
}
