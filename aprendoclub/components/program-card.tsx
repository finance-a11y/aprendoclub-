import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Program } from "@/content/programas";

/**
 * Card reutilizable de programa (hub /programas + sección del home).
 *
 * Componente presentacional (server component). Look aprendoclub: superficie
 * #0d1117 con borde white/10; accent #b8f60d limitado a badge y CTA (regla 01-UI-SPEC).
 * `compact` reduce el padding para la versión del home.
 */
export function ProgramCard({
  program,
  compact = false,
}: {
  program: Program;
  compact?: boolean;
}) {
  return (
    <div
      className={`group flex flex-col gap-4 rounded-xl bg-[#0d1117] border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#b8f60d]/30 ${
        compact ? "p-6" : "p-8"
      }`}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#b8f60d]">
        {program.badge}
      </span>

      <h3 className="text-lg font-semibold text-white">{program.nombre}</h3>

      <p className="text-sm leading-relaxed text-gray-400">
        {program.descripcion}
      </p>

      <div className="mt-2 flex flex-col gap-0.5">
        <span className="text-white font-semibold">{program.precio}</span>
        {program.precioNota && (
          <span className="text-gray-500 text-xs">{program.precioNota}</span>
        )}
      </div>

      <Link
        href={program.ctaHref}
        className="group/cta mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#b8f60d] px-5 py-2.5 text-sm font-semibold text-black transition-all hover:brightness-110"
      >
        {program.ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
      </Link>
    </div>
  );
}
