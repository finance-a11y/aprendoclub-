import type { Metadata } from "next";
import { RetoTop } from "@/components/reto/reto-top";
import { RetoMid } from "@/components/reto/reto-mid";
import { RetoBottom } from "@/components/reto/reto-bottom";
import { hero } from "@/content/reto";

export const metadata: Metadata = {
  title: "Reto 7 días | aprendoclub",
  description: hero.texto,
};

export default function RetoPage() {
  return (
    <div className="w-full bg-[var(--bg-primary)] text-white">
      <RetoTop />
      <RetoMid />
      <RetoBottom />
    </div>
  );
}
