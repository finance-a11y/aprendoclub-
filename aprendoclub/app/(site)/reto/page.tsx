import type { Metadata } from "next";
import { RetoTop } from "@/components/reto/reto-top";
import { RetoMid } from "@/components/reto/reto-mid";
import { RetoBottom } from "@/components/reto/reto-bottom";
import { RelatedLinks } from "@/components/related-links";
import { hero } from "@/content/reto";
import { JsonLd } from "@/components/json-ld";
import { course } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Reto 7 días | aprendoclub",
  description: hero.texto,
};

export default function RetoPage() {
  return (
    <div className="w-full bg-[var(--bg-primary)] text-white">
      <JsonLd
        data={course({
          name: "Reto 7 días",
          description: hero.texto,
          path: "/reto",
          price: "20",
          courseWorkload: "P7D",
          startDate: "2026-07-13",
        })}
      />
      <RetoTop />
      <RetoMid />
      <RetoBottom />
      <RelatedLinks
        links={[
          { href: "/programas", label: "Ver todos los programas" },
          {
            href: "/testimonios",
            label: "Lee las historias de nuestros estudiantes",
          },
        ]}
      />
    </div>
  );
}
