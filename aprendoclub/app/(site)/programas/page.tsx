import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programas | aprendoclub",
  description:
    "Explora los programas de formación en SEO + IA de aprendoclub.",
};

export default function ProgramasPage() {
  return (
    <section className="section-spacing container-padding max-w-6xl mx-auto flex flex-col items-center text-center pt-28">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">
        Programas
      </h1>
      <p className="mt-4 text-gray-400">Contenido próximamente.</p>
    </section>
  );
}
