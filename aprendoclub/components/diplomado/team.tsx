const team = [
  {
    name: "Arianna Lupi",
    role: "Consultora SEO | Fundadora aprendoclub",
    initials: "AL",
  },
  {
    name: "Dana Aliaga",
    role: "SEO Specialist",
    initials: "DA",
  },
  {
    name: "Ibraim Zayed",
    role: "Community Builder | SEO Coach",
    initials: "IZ",
  },
  {
    name: "Juan Carlos Angulo",
    role: "Senior Tech SEO Analyst",
    initials: "JA",
  },
  {
    name: "Verónica Romero",
    role: "SEO Manager",
    initials: "VR",
  },
]

export function Team() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl container-padding">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d1117] px-4 py-1.5 text-sm text-[#b8f60d]">
          Equipo
        </div>

        <h2 className="max-w-3xl text-balance text-3xl font-bold text-white md:text-4xl">
          Aquí te hablamos de SEO a SEO
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
          Desde Arianna Lupi, consultora SEO y fundadora de aprendoclub, hasta el
          equipo de coaches que también dieron sus primeros pasos aquí.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((member, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#0d1117] p-6 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#012fd8]/10 text-lg font-bold text-[#0495f1]">
                {member.initials}
              </div>
              <h3 className="font-semibold text-white">{member.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-400">
                {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* Mentor section */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-[#0d1117] p-8 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#b8f60d]/10 text-2xl font-bold text-[#b8f60d]">
              AL
            </div>
            <div>
              <h3 className="mb-1 text-xl font-bold text-white">
                Yo seré tu mentora
              </h3>
              <p className="mb-4 text-sm font-medium text-[#b8f60d]">Arianna Lupi</p>
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-gray-400">
                <p>
                  Soy Arianna Lupi, venezolana, egresada Magna Cum Laude en Negocios
                  Internacionales y Magister en Big Data Analytics.
                </p>
                <p>
                  Me especializo en posicionamiento orgánico de páginas web y
                  soy la fundadora de la academia aprendoclub donde, junto a otros
                  coaches, he formado a más de 1,000 alumnos hispanohablantes.
                </p>
                <p>
                  Fui reconocida por ser la primera mujer en moderar una conferencia de
                  Google en español.
                </p>
                <p>
                  En los últimos 7 años he ayudado a marcas como Unilever,
                  HubSpot, Money.com y Alchemy a destacar en Google, generando más de
                  $2 millones USD en ingresos para mis clientes.
                </p>
                <p className="italic text-white">
                  {'"Y mi misión es seguir formando a personas de habla hispana como tú, para que construyan una carrera profesional sólida en el mundo del SEO y la Inteligencia Artificial."'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
