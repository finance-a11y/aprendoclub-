import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonios | aprendoclub",
  description:
    "Historias reales de estudiantes que impulsaron su carrera con aprendoclub.",
};

export default function TestimoniosPage() {
  return (
    <section className="section-spacing container-padding max-w-6xl mx-auto flex flex-col items-center text-center pt-28">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">
        Testimonios
      </h1>
      <p className="mt-4 text-gray-400">Contenido próximamente.</p>
    </section>
  );
}
