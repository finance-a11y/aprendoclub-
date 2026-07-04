import type { Program } from "@/content/programas";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";

/**
 * Card reutilizable de programa (hub /programas + sección del home).
 *
 * Componente presentacional (server component). Compone los primitivos
 * compartidos Card/Eyebrow/Button; accent limitado a badge y CTA (regla
 * 01-UI-SPEC). `compact` reduce el padding para la versión del home.
 */
export function ProgramCard({
  program,
  compact = false,
}: {
  program: Program;
  compact?: boolean;
}) {
  return (
    <Card
      padding={compact ? "compact" : "default"}
      hover="liftAccent"
      className="group flex flex-col gap-4"
    >
      <Eyebrow>{program.badge}</Eyebrow>

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

      <Button
        href={program.ctaHref}
        variant="primary"
        icon
        className="mt-4"
      >
        {program.ctaLabel}
      </Button>
    </Card>
  );
}
