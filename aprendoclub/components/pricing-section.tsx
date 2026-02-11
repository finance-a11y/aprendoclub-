"use client";

import { useRef, useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { trackInitiateCheckout, trackSchedule, trackViewContent } from "./meta-pixel";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: "aprendiz" | "especialista" | "consultor";
  name: string;
  monthlyPrice: number;
  originalPrice?: number;
  desc: string;
  features: PlanFeature[];
  cta: string;
  monthlyUrl: string;
  annualUrl: string;
  note?: string;
}

const plans: PricingPlan[] = [
  {
    id: "aprendiz",
    name: "Aprendiz",
    monthlyPrice: 30,
    desc: "Ideal para empezar tu camino en SEO con acceso a la comunidad y cursos prácticos.",
    features: [
      { text: "Comunidad activa 24/7", included: true },
      { text: "Cursos cortos y prácticos", included: true },
      { text: "1 sesión grupal semanal", included: true },
      { text: "Bolsa de trabajo curada", included: true },
      { text: "Actualizaciones SEO + IA", included: true },
      { text: "Diplomado completo", included: false },
      { text: "Sesiones 1:1", included: false },
    ],
    cta: "Comenzar como Aprendiz",
    monthlyUrl: "https://diplomado.aprendoseo.com/offers/AcbCcsNo/checkout",
    annualUrl: "https://diplomado.aprendoseo.com/offers/fGYXzRXe/checkout",
  },
  {
    id: "especialista",
    name: "Especialista",
    monthlyPrice: 90,
    originalPrice: 150,
    desc: "Para quienes quieren dominar SEO con el diplomado completo, sesiones semanales y ruta profesional.",
    features: [
      { text: "Todo lo de Aprendiz", included: true },
      { text: "Diplomado CERO A SEO completo", included: true },
      { text: "3 sesiones semanales", included: true },
      { text: "Proyectos aplicados reales", included: true },
      { text: "Ruta profesional guiada", included: true },
      { text: "Plantillas, frameworks, SOPs", included: true },
      { text: "Comunidad privada profesional", included: true },
    ],
    cta: "Elegir Especialista",
    monthlyUrl: "https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout",
    annualUrl: "https://diplomado.aprendoseo.com/offers/hHa9LbUL/checkout",
  },
  {
    id: "consultor",
    name: "Consultor",
    monthlyPrice: 600,
    desc: "Acceso total con sesiones estratégicas 1:1, análisis de casos reales y feedback de alto nivel.",
    features: [
      { text: "Todo lo anterior incluido", included: true },
      { text: "Sesiones estratégicas 1:1", included: true },
      { text: "Análisis de casos reales", included: true },
      { text: "Feedback directo de alto nivel", included: true },
      { text: "Enfoque en diagnóstico y estrategia", included: true },
    ],
    cta: "Ser Consultor",
    monthlyUrl: "https://calendly.com/hello-arianna-lupi/meet-with-me",
    annualUrl: "https://calendly.com/hello-arianna-lupi/meet-with-me",
  },
];

function getAnnualPrice(monthly: number) {
  return Math.round(monthly * (2 / 3));
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasTrackedView) {
      trackViewContent("Pricing Section");
      setHasTrackedView(true);
    }
  }, [isInView, hasTrackedView]);

  return (
    <section
      id="precios"
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 container-padding section-spacing"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex max-w-[700px] flex-col items-center gap-4"
      >
        <span className="text-sm font-bold uppercase tracking-wider text-[#012fd8]">
          PRECIOS
        </span>
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          Elige tu camino de especialización
        </h2>
        <p className="text-center text-lg text-gray-400">
          Todos los planes incluyen acceso completo al contenido.
        </p>
      </motion.div>

      {/* Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-3"
      >
        <div className="relative flex h-[44px] rounded-full bg-white/5 border border-white/10 p-1">
          <motion.div
            className="absolute top-1 bottom-1 rounded-full bg-white"
            animate={{
              left: isAnnual ? "50%" : "4px",
              right: isAnnual ? "4px" : "50%",
            }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
          <button
            onClick={() => setIsAnnual(false)}
            className={`relative z-10 px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              !isAnnual ? "text-black" : "text-gray-500"
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`relative z-10 px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              isAnnual ? "text-black" : "text-gray-500"
            }`}
          >
            Semestral
          </button>
        </div>

        <AnimatePresence>
          {isAnnual && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-full bg-[#b8f60d] px-3 py-1 text-xs font-bold text-black"
            >
              Ahorra 33.33%
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cards */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 items-center max-w-6xl">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.2 + index * 0.15,
              ease: plan.id === "especialista" ? [0.34, 1.56, 0.64, 1] : "easeOut",
            }}
            className={`relative ${plan.id === "especialista" ? "lg:scale-105 z-10" : "z-0"}`}
          >
            <PricingCard plan={plan} isAnnual={isAnnual} isInView={isInView} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  isAnnual,
  isInView,
}: {
  plan: PricingPlan;
  isAnnual: boolean;
  isInView: boolean;
}) {
  const isEspecialista = plan.id === "especialista";
  const isConsultor = plan.id === "consultor";
  const displayPrice = isAnnual ? getAnnualPrice(plan.monthlyPrice) : plan.monthlyPrice;
  const checkoutUrl = isAnnual ? plan.annualUrl : plan.monthlyUrl;

  // Aprendiz - Clean card, no decorations
  if (plan.id === "aprendiz") {
    return (
      <div className="group rounded-2xl bg-[#0d1117] border border-white/10 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
        <CardContent
          plan={plan}
          displayPrice={displayPrice}
          isAnnual={isAnnual}
          checkoutUrl={checkoutUrl}
          isInView={isInView}
          ctaStyle="border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
        />
      </div>
    );
  }

  // Especialista - Highlighted with pulsing glow
  if (isEspecialista) {
    return (
      <div className="relative group">
        {/* Popular Badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#b8f60d] px-4 py-1.5 text-sm font-bold text-black shadow-lg">
            ⚡ Más popular
          </span>
        </div>

        {/* Pulsing Glow Effect */}
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-60"
          style={{
            background: "linear-gradient(135deg, #012fd8, #b8f60d)",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />

        {/* Static Gradient Border */}
        <div
          className="absolute -inset-[1px] rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #012fd8, #b8f60d)",
          }}
        />

        {/* Card Content - solid background */}
        <div className="relative rounded-2xl bg-[#0a0c10] p-8 transition-transform duration-300 group-hover:-translate-y-1">
          <CardContent
            plan={plan}
            displayPrice={displayPrice}
            isAnnual={isAnnual}
            checkoutUrl={checkoutUrl}
            isInView={isInView}
            ctaStyle="bg-[#012fd8] text-white hover:shadow-[0_0_30px_rgba(1,47,216,0.4)] transition-all duration-300"
          />
        </div>
      </div>
    );
  }

  // Consultor - Clean card, subtle styling
  return (
    <div className="relative group">
      {/* Pro Badge */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
        <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-[#0d1117] px-4 py-1.5 text-sm font-medium text-gray-300">
          👑 Para profesionales
        </span>
      </div>

      <div className="rounded-2xl bg-[#0d1117] border border-white/10 p-8 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/20">
        <CardContent
          plan={plan}
          displayPrice={displayPrice}
          isAnnual={isAnnual}
          checkoutUrl={checkoutUrl}
          isInView={isInView}
          ctaStyle="bg-[#b8f60d] text-black font-bold hover:brightness-110 transition-all duration-300"
        />
      </div>
    </div>
  );
}

function CardContent({
  plan,
  displayPrice,
  isAnnual,
  checkoutUrl,
  isInView,
  ctaStyle,
}: {
  plan: PricingPlan;
  displayPrice: number;
  isAnnual: boolean;
  checkoutUrl: string;
  isInView: boolean;
  ctaStyle: string;
}) {
  const handleCtaClick = () => {
    if (plan.id === "consultor") {
      trackSchedule(`Consultor - ${plan.name}`);
    } else {
      trackInitiateCheckout(
        `${plan.name} - ${isAnnual ? "Semestral" : "Mensual"}`,
        displayPrice
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Plan Name */}
      <div>
        <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={displayPrice}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-5xl font-extrabold text-white"
          >
            ${displayPrice}
          </motion.span>
        </AnimatePresence>
        {plan.originalPrice && !isAnnual && (
          <span className="text-xl text-gray-500 line-through">
            ${plan.originalPrice}
          </span>
        )}
        <span className="text-gray-500">
          /mes{isAnnual && " (pago semestral)"}
        </span>
      </div>

      {/* Note for Consultor */}
      {plan.note && (
        <p className="text-sm text-[#b8f60d] font-medium -mt-2">{plan.note}</p>
      )}

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">{plan.desc}</p>

      {/* Divider */}
      <div className="h-px w-full bg-white/10" />

      {/* Features */}
      <div className="flex flex-col gap-3">
        {plan.features.map((feature, index) => (
          <motion.div
            key={feature.text}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            className="flex items-center gap-3"
          >
            {feature.included ? (
              <Check className="h-5 w-5 shrink-0 text-green-400" />
            ) : (
              <X className="h-5 w-5 shrink-0 text-gray-600" />
            )}
            <span
              className={`text-sm ${
                feature.included ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {feature.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCtaClick}
        className={`mt-auto flex items-center justify-center rounded-xl px-6 py-4 text-base font-bold ${ctaStyle}`}
      >
        {plan.cta}
      </a>
    </div>
  );
}
