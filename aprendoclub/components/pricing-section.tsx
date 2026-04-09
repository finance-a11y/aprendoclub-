"use client";

import { trackInitiateCheckout, trackSchedule } from "./meta-pixel";

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
    <section id="precios" className="bg-[#0d0f14] py-16 px-5 font-['Montserrat']">
      <p className="text-center text-[11px] font-bold tracking-[3px] text-[#c8f135] uppercase mb-3">
        PRECIOS
      </p>
      <h2 className="text-white text-4xl font-extrabold text-center mb-3 leading-tight">
        Elige tu camino de especialización
      </h2>
      <p className="text-gray-500 text-center text-[15px] mb-14">
        Todos los planes incluyen acceso completo al contenido
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-5">

        {/* Card 1: Cuotas */}
        <div className="bg-[#12161f] border border-[#232836] rounded-2xl p-9 flex flex-col">
          <p className="text-[11px] font-bold tracking-[2.5px] text-[#3d5cf5] uppercase mb-2">
            Acceso completo
          </p>
          <p className="text-white text-2xl font-extrabold">Empieza hoy en cuotas</p>
          <div className="flex items-baseline gap-1 mt-4 mb-1">
            <span className="text-white text-6xl font-black leading-none">$210</span>
          </div>
          <p className="text-gray-500 text-sm mb-5 font-medium">
            x 4 cuotas mensuales · Total $840
          </p>
          <hr className="border-[#1e2330] mb-5" />
          <ul className="space-y-2 flex-1 mb-7">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5 text-[13.5px] text-[#b0b8cc] font-medium leading-snug">
                <span className="text-[#c8f135] font-black mt-0.5 shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <a
            href="https://diplomado.aprendoseo.com/offers/hHa9LbUL/checkout"
            onClick={() => trackInitiateCheckout()}
            className="block w-full text-center py-4 rounded-xl border border-[#2e3547] text-gray-300 font-extrabold text-[15px] hover:border-white hover:text-white transition"
          >
            Comenzar en cuotas
          </a>
        </div>

        {/* Card 2: Pago único */}
        <div className="relative bg-[#0e1428] border-2 border-[#3d5cf5] rounded-2xl p-9 flex flex-col shadow-[0_0_40px_rgba(61,92,245,0.12)]">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c8f135] text-[#111] text-[11px] font-black px-5 py-1.5 rounded-full whitespace-nowrap tracking-wide">
            ⚡ Mejor valor
          </span>
          <span className="inline-block bg-[rgba(200,241,53,0.1)] text-[#c8f135] border border-[rgba(200,241,53,0.3)] text-[11px] font-bold px-3 py-1 rounded-full mb-3 tracking-wide w-fit">
            Ahorras $60
          </span>
          <p className="text-[11px] font-bold tracking-[2.5px] text-[#3d5cf5] uppercase mb-2">
            Todo incluido
          </p>
          <p className="text-white text-2xl font-extrabold">Pago único sin cuotas</p>
          <div className="flex items-baseline gap-1 mt-4 mb-1">
            <span className="text-white text-6xl font-black leading-none">$780</span>
          </div>
          <p className="text-gray-500 text-sm mb-5 font-medium">
            Pago único · Sin cuotas · Sin sorpresas
          </p>
          <hr className="border-[#1e2330] mb-5" />
          <ul className="space-y-2 flex-1 mb-7">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5 text-[13.5px] text-[#b0b8cc] font-medium leading-snug">
                <span className="text-[#c8f135] font-black mt-0.5 shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <a
            href="https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout"
            onClick={() => trackInitiateCheckout()}
            className="block w-full text-center py-4 rounded-xl bg-[#3d5cf5] text-white font-extrabold text-[15px] hover:bg-[#2f4ee0] transition"
          >
            Obtener acceso completo →
          </a>
        </div>
      </div>

      {/* Card 3: CTA WhatsApp */}
      <div className="max-w-3xl mx-auto bg-[#0e1428] border-2 border-[#c8f135] rounded-2xl p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 bg-[rgba(200,241,53,0.1)] border border-[rgba(200,241,53,0.35)] text-[#c8f135] text-[11px] font-extrabold px-3.5 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            💬 Hablemos
          </span>
          <p className="text-white text-xl font-extrabold mb-3 leading-snug">
            ¿El precio no es lo tuyo?{" "}
            <span className="text-[#c8f135]">Hay una forma para ti.</span>
          </p>
          <p className="text-[#8892a4] text-sm leading-relaxed">
            No dejes que el dinero decida tu futuro. Si tienes la disposición, nosotros
            encontramos la forma. Agenda una asesoría gratuita con nuestra directora de
            admisiones y encontramos juntos la opción ideal para ti.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 shrink-0">
          <a
            href="https://wa.link/85a89y"
            onClick={() => trackSchedule()}
            className="inline-flex items-center gap-2.5 bg-[#c8f135] text-[#111] font-extrabold text-[15px] px-7 py-5 rounded-2xl hover:bg-[#d9ff3d] transition whitespace-nowrap"
          >
            Agendar asesoría gratuita
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#111" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.556 4.123 1.528 5.855L0 24l6.335-1.508A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.677-.497-5.215-1.367l-.374-.222-3.863.919.975-3.767-.243-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </a>
          <p className="text-[#555] text-[11px] font-semibold tracking-wide">
            Respuesta en menos de 24hs · 100% gratuito
          </p>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
