import type { Metadata } from "next";
import { TestimoniosHero } from "@/components/testimonios/hero";
import { TestimoniosGrid } from "@/components/testimonios/grid";
import { RetoGaleria } from "@/components/testimonios/reto-galeria";
import { TestimoniosCta } from "@/components/testimonios/cta";

export const metadata: Metadata = {
  title: "Testimonios | aprendoclub",
  description:
    "Historias reales de estudiantes de aprendoclub que empezaron desde cero y hoy posicionan sitios, consiguen clientes o trabajan remoto con el SEO.",
};

export default function TestimoniosPage() {
  return (
    <>
      <TestimoniosHero />
      <TestimoniosGrid />
      <RetoGaleria />
      <TestimoniosCta />
    </>
  );
}
