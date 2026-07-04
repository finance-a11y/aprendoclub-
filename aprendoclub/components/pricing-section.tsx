import { Check, Trophy, MessageCircle } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  "Comunidad activa 24/7",
  "Cursos cortos y prácticos (SEO con IA, SEO para rrss, creación de webs)",
  "Bolsa de trabajo curada",
  "Actualizaciones SEO + IA",
  "Diplomado completo Cero a SEO",
  "3 sesiones semanales en vivo",
  "Proyectos con casos reales",
  "Ruta profesional guiada",
  "Plantillas, frameworks y SOPs",
  "Comunidad privada de profesionales",
];

export function PricingSection() {
  return (
    <section id="precios" className="bg-[var(--bg-primary)] container-padding section-spacing">
      <Eyebrow as="p" className="text-center tracking-[3px] mb-3">
        PRECIOS
      </Eyebrow>
      <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white text-center mb-3">
        Elige tu camino de especialización
      </h2>
      <p className="text-gray-500 text-center text-[15px] mb-14">
        Todos los planes incluyen acceso completo al contenido
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-5">

        {/* Card 1: Cuotas */}
        <Card padding="default" hover="none" className="flex flex-col">
          <p className="text-[11px] font-semibold tracking-[2.5px] text-[var(--primary-light)] uppercase mb-2">
            Acceso completo
          </p>
          <p className="text-white text-2xl font-semibold">Empieza hoy en cuotas</p>
          <div className="flex items-baseline gap-1 mt-4 mb-1">
            <span className="text-white text-6xl font-semibold leading-none">$210</span>
          </div>
          <p className="text-gray-500 text-sm mb-5 font-medium">
            4 cuotas mensuales
          </p>
          <hr className="border-[var(--bg-tertiary)] mb-5" />
          <ul className="space-y-2 flex-1 mb-7">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5 text-[13.5px] text-[var(--text-muted)] font-medium leading-snug">
                <Check className="h-4 w-4 text-[var(--accent)] mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Button
            href="https://diplomado.aprendoseo.com/offers/hHa9LbUL/checkout"
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Comenzar en cuotas
          </Button>
        </Card>

        {/* Card 2: Pago único */}
        <Card
          padding="default"
          hover="none"
          className="relative flex flex-col border-2 border-[var(--primary-light)] shadow-[0_0_40px_rgba(61,92,245,0.12)]"
        >
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-[var(--accent)] text-[var(--bg-primary)] text-[11px] font-semibold px-5 py-1.5 rounded-full whitespace-nowrap tracking-wide">
            <Trophy className="h-3.5 w-3.5" />
            Más elegido
          </span>
          <span className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 text-[11px] font-semibold px-3 py-1 rounded-full mb-3 tracking-wide w-fit">
            Ahorrás más en un solo pago
          </span>
          <p className="text-[11px] font-semibold tracking-[2.5px] text-[var(--primary-light)] uppercase mb-2">
            Todo incluido
          </p>
          <p className="text-white text-2xl font-semibold">Pago único sin cuotas</p>
          <div className="flex items-baseline gap-1 mt-4 mb-1">
            <span className="text-white text-6xl font-semibold leading-none">$780</span>
          </div>
          <p className="text-gray-500 text-sm mb-5 font-medium">
            Pago único · Sin cuotas · Sin sorpresas
          </p>
          <hr className="border-[var(--bg-tertiary)] mb-5" />
          <ul className="space-y-2 flex-1 mb-7">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5 text-[13.5px] text-[var(--text-muted)] font-medium leading-snug">
                <Check className="h-4 w-4 text-[var(--accent)] mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Button
            href="https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout"
            variant="primary"
            size="lg"
            icon
            className="w-full !bg-[var(--primary-light)] hover:!bg-[var(--primary)]"
          >
            Obtener acceso completo
          </Button>
        </Card>
      </div>

      {/* Card 3: CTA WhatsApp */}
      <Card
        padding="default"
        hover="none"
        className="max-w-3xl mx-auto border-2 !border-[var(--accent)] flex-col md:flex-row items-center gap-8 relative overflow-hidden flex"
      >
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 bg-[var(--accent)]/10 border border-[var(--accent)]/35 text-[var(--accent)] text-[11px] font-semibold px-3.5 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            <MessageCircle className="h-3.5 w-3.5" />
            Hablemos
          </span>
          <p className="text-white text-xl font-semibold mb-3 leading-snug">
           ¿Necesitas facilidades de pago personalizadas?{" "}
            <span className="text-[var(--accent)]">Hay una forma para ti.</span>
          </p>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed">
            No dejes que el dinero decida tu futuro. Si tienes la disposición, nosotros
            encontramos la forma. Agenda una asesoría gratuita con nuestra directora de
            admisiones y encontramos juntos la opción ideal para ti.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 shrink-0">
          <Button
            href="https://wa.link/85a89y"
            variant="primary"
            size="lg"
            className="!rounded-2xl !px-7 !py-5 whitespace-nowrap"
          >
            Agendar asesoría gratuita
            <svg width="20" height="20" viewBox="0 0 24 24" style={{ fill: "var(--bg-primary)" }} xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.556 4.123 1.528 5.855L0 24l6.335-1.508A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.677-.497-5.215-1.367l-.374-.222-3.863.919.975-3.767-.243-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </Button>
          <p className="text-[var(--text-muted)] text-[11px] font-semibold tracking-wide">
            Respuesta en menos de 24hs · 100% gratuito
          </p>
        </div>
      </Card>
    </section>
  );
}

export default PricingSection;
