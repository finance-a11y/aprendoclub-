import type { Metadata } from "next";
import { QuienesSomosHero } from "@/components/quienes-somos/hero";
import { HistoriaSection } from "@/components/quienes-somos/historia";
import { FundadoraSection } from "@/components/quienes-somos/fundadora";
import { EquipoSection } from "@/components/quienes-somos/equipo";
import { MetodologiaSection } from "@/components/quienes-somos/metodologia";
import { StatsSection } from "@/components/quienes-somos/stats";
import { CtaFinalSection } from "@/components/quienes-somos/cta";
import { JsonLd } from "@/components/json-ld";
import { aboutGraph } from "@/lib/schema";
import { equipo } from "@/content/quienes-somos";

export const metadata: Metadata = {
  title: "Quiénes somos | aprendoclub",
  description:
    "Conoce la historia de aprendoclub, la primera academia de SEO e IA para el mundo hispano, y al equipo que forma especialistas con proyectos reales.",
};

export default function QuienesSomosPage() {
  return (
    <>
      <JsonLd data={aboutGraph(equipo)} />
      <QuienesSomosHero />
      <HistoriaSection />
      <FundadoraSection />
      <EquipoSection />
      <MetodologiaSection />
      <StatsSection />
      <CtaFinalSection />
    </>
  );
}
