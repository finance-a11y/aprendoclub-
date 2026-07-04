"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { equipo, type TeamMember } from "@/content/quienes-somos";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";

function TeamAvatar({ member }: { member: TeamMember }) {
  const [showFallback, setShowFallback] = useState(!member.foto);

  if (showFallback) {
    return (
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--bg-tertiary)] text-lg font-semibold text-white">
        {member.iniciales}
      </div>
    );
  }

  return (
    <Image
      src={member.foto ?? ""}
      alt={member.nombre}
      width={64}
      height={64}
      onError={() => setShowFallback(true)}
      className="h-16 w-16 shrink-0 rounded-full object-cover object-top"
    />
  );
}

export function EquipoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-secondary)] container-padding section-spacing"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="flex max-w-[700px] flex-col items-center gap-4 text-center"
      >
        <Eyebrow>NUESTRO EQUIPO</Eyebrow>
        <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          Las personas detrás de aprendoclub
        </h2>
      </motion.div>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {equipo.map((member, index) => (
          <motion.div
            key={member.nombre}
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : index * 0.1 }}
            className="group"
          >
            <Card padding="compact" hover="lift">
              <div className="flex items-center gap-4 mb-4">
                <TeamAvatar member={member} />
                <div>
                  {member.web ? (
                    <a
                      href={member.web}
                      target="_blank"
                      rel="noopener"
                      className="font-semibold text-white underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/40"
                    >
                      {member.nombre}
                    </a>
                  ) : (
                    <p className="font-semibold text-white">{member.nombre}</p>
                  )}
                  <p className="text-sm text-[var(--primary)]">{member.rol}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {member.bio}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
