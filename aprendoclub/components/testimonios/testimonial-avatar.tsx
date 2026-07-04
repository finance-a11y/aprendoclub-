"use client";

import { useState } from "react";
import Image from "next/image";
import type { Testimonio } from "@/content/testimonios";

/** Iniciales de las dos primeras palabras del nombre (p.ej. "Wilson Moros" → "WM"). */
function getIniciales(nombre: string): string {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((palabra) => palabra.charAt(0))
    .join("")
    .toUpperCase();
}

/**
 * Avatar con fallback a iniciales, espejando `TeamAvatar` de la Fase 2.
 * Si hay `foto`, renderiza next/image con onError → iniciales; si no, muestra iniciales.
 */
export function TestimonialAvatar({ testimonio }: { testimonio: Testimonio }) {
  const [showFallback, setShowFallback] = useState(!testimonio.foto);

  if (showFallback) {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--bg-tertiary)] text-sm font-semibold text-white">
        {getIniciales(testimonio.nombre)}
      </div>
    );
  }

  return (
    <Image
      src={testimonio.foto ?? ""}
      alt={testimonio.nombre}
      width={48}
      height={48}
      onError={() => setShowFallback(true)}
      className="h-12 w-12 shrink-0 rounded-full object-cover object-top"
    />
  );
}
