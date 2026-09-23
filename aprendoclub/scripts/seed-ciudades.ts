import { getPayload } from 'payload'
import config from '../payload.config'

interface CiudadData {
  nombre: string
  slug: string
  pais: 'España' | 'México' | 'Venezuela'
  gentilicio: string
  salarioPromedio: string
  salarioNota: string
  faqs: { pregunta: string; respuesta: string }[]
  meta: { title: string; description: string }
}

const CIUDADES: CiudadData[] = [
  {
    nombre: 'Alicante',
    slug: 'alicante',
    pais: 'España',
    gentilicio: 'en Alicante',
    salarioPromedio: '€26.000 – €36.000 / año',
    salarioNota: 'En Alicante y la Comunidad Valenciana, un especialista SEO junior inicia sobre los €22.000, mientras que perfiles mid y senior gestionando e-commerce o clientes internacionales superan los €38.000 anuales.',
    faqs: [
      {
        pregunta: '¿Cómo es la modalidad de estudio desde Alicante?',
        respuesta: '100% online en vivo. Las clases y sesiones de mentoría se transmiten en horario peninsular de España, permitiéndote compaginar tu formación con tu trabajo o estudios sin desplazarte.',
      },
      {
        pregunta: '¿Hay oportunidades de trabajo en SEO en Alicante?',
        respuesta: 'Sí, el ecosistema digital de la Costa Blanca (agencias de marketing, startups del hub tecnológico y sector turístico/e-commerce) demanda especialistas con dominio de SEO técnico e inteligencia artificial.',
      },
      {
        pregunta: '¿Necesito conocimientos previos de programación?',
        respuesta: 'No. El Diplomado de aprendoclub parte desde los fundamentos y te enseña paso a paso todo lo necesario para auditar y posicionar sitios web.',
      },
    ],
    meta: {
      title: 'Curso de SEO en Alicante | Formación Especializada aprendoclub',
      description: 'Aprende SEO en Alicante con el Diplomado SEO + AIO de aprendoclub. Mentoría en vivo, proyectos reales y optimización para Google y motores de IA.',
    },
  },
  {
    nombre: 'Bilbao',
    slug: 'bilbao',
    pais: 'España',
    gentilicio: 'en Bilbao',
    salarioPromedio: '€28.000 – €42.000 / año',
    salarioNota: 'En Bilbao y el País Vasco, el sector industrial, B2B y agencias tecnológicas ofrecen compensaciones atractivas: los perfiles SEO con habilidades en IA y automatización rondan los €32.000 a €45.000 anuales en puestos consolidados.',
    faqs: [
      {
        pregunta: '¿Por qué estudiar SEO con aprendoclub en Bilbao?',
        respuesta: 'Te formas con referentes del sector hispanohablante desde cualquier punto de Bizkaia, con acceso a proyectos reales y tutorías en directo en horario peninsular.',
      },
      {
        pregunta: '¿Qué tipo de empresas contratan SEOs en Bilbao?',
        respuesta: 'Consultoras tecnológicas, empresas de software B2B, marcas industriales con ventas internacionales y agencias digitales de la zona norte.',
      },
      {
        pregunta: '¿Qué certificación obtengo?',
        respuesta: 'Obtienes la certificación oficial de especialista en SEO + AIO de aprendoclub, respaldada por casos de estudio reales auditados.',
      },
    ],
    meta: {
      title: 'Curso de SEO en Bilbao | Formación Profesional aprendoclub',
      description: 'Curso de SEO en Bilbao. Aprende posicionamiento orgánico y optimización para motores de IA con acompañamiento experto en aprendoclub.',
    },
  },
  {
    nombre: 'Caracas',
    slug: 'caracas',
    pais: 'Venezuela',
    gentilicio: 'en Caracas',
    salarioPromedio: '$600 – $1,800 USD / mes',
    salarioNota: 'El mercado laboral de SEO para profesionales en Caracas está orientado principalmente a agencias y clientes de Estados Unidos, España y Latinoamérica que pagan salarios competitivos en dólares vía plataformas remotas.',
    faqs: [
      {
        pregunta: '¿Puedo trabajar para el exterior viviendo en Caracas?',
        respuesta: 'Totalmente. El Diplomado te entrena precisamente para competir por vacantes remotas internacionales en dólares, enseñándote a auditar sitios grandes y usar herramientas estándar del mercado (Ahrefs, Semrush, Screaming Frog).',
      },
      {
        pregunta: '¿Cómo son los horarios de clase desde Venezuela?',
        respuesta: 'Las sesiones en vivo están programadas en horarios vespertinos y fines de semana que calzan perfectamente con el huso horario de Caracas (GMT-4).',
      },
      {
        pregunta: '¿Qué pasa si tengo problemas de luz o conexión?',
        respuesta: 'Todas las clases quedan grabadas en la plataforma en alta definición para verlas inmediatamente cuando recuperes el servicio.',
      },
    ],
    meta: {
      title: 'Curso de SEO en Caracas | Gana en Dólares con aprendoclub',
      description: 'Curso de SEO en Caracas. Fórmate como especialista SEO para trabajar en remoto con clientes de España y Latinoamérica.',
    },
  },
  {
    nombre: 'Ciudad de México',
    slug: 'cdmx',
    pais: 'México',
    gentilicio: 'en CDMX',
    salarioPromedio: '$25,000 – $50,000 MXN / mes',
    salarioNota: 'Ciudad de México es el centro neurálgico de agencias de marketing y startups de Hispanoamérica. Perfiles SEO con conocimientos de IA (AIO/GEO) tienen alta demanda y sueldos que van de $20,000 MXN para perfiles junior hasta más de $55,000 MXN para líderes de proyecto.',
    faqs: [
      {
        pregunta: '¿Por qué tomar un curso SEO enfocado en CDMX?',
        respuesta: 'Las empresas y agencias en Ciudad de México están saturadas de egresados de cursos genéricos. En aprendoclub aprendes la metodología moderna que integra ChatGPT, Gemini y optimización de respuestas generativas (GEO).',
      },
      {
        pregunta: '¿Se adaptan los horarios a Ciudad de México?',
        respuesta: 'Sí, nuestros horarios en vivo contemplan el huso horario de CDMX (CST) para que puedas participar en mentorías y resolución de dudas en directo.',
      },
      {
        pregunta: '¿Incluye prácticas con herramientas reales?',
        respuesta: 'Sí, analizamos y auditamos proyectos en vivo utilizando Semrush, Ahrefs, Google Search Console y SearchGPT.',
      },
    ],
    meta: {
      title: 'Curso de SEO en CDMX | Aprende con Especialistas en aprendoclub',
      description: 'Curso de SEO en Ciudad de México. Conviértete en especialista SEO + AIO en 16 semanas con mentoría en vivo y proyectos reales.',
    },
  },
  {
    nombre: 'Guadalajara',
    slug: 'guadalajara',
    pais: 'México',
    gentilicio: 'en Guadalajara',
    salarioPromedio: '$22,000 – $42,000 MXN / mes',
    salarioNota: 'En el Silicon Valley mexicano (Guadalajara y Zapopan), la industria del software y comercio electrónico busca especialistas que posicionen productos en mercados globales.',
    faqs: [
      {
        pregunta: '¿Cómo me ayuda aprendoclub si vivo en Guadalajara?',
        respuesta: 'Te capacitas en el ecosistema digital más dinámico de México sin necesidad de viajar a conferencias caras: formación práctica guiada y networking de alto nivel.',
      },
      {
        pregunta: '¿Qué certificación obtengo?',
        respuesta: 'Recibes el certificado oficial de aprendoclub avalado por Arianna Lupi y el equipo docente tras aprobar las auditorías y proyectos reales del programa.',
      },
      {
        pregunta: '¿Qué soporte recibo durante las 16 semanas?',
        respuesta: 'Acompañamiento semanal con coaches en vivo, revisión detallada de tus tareas y canal privado de dudas en la comunidad.',
      },
    ],
    meta: {
      title: 'Curso de SEO en Guadalajara | Formación en Posicionamiento Orgánico',
      description: 'Curso de SEO en Guadalajara. Aprende a posicionar marcas en Google, ChatGPT y Gemini con el Diplomado de aprendoclub.',
    },
  },
  {
    nombre: 'Málaga',
    slug: 'malaga',
    pais: 'España',
    gentilicio: 'en Málaga',
    salarioPromedio: '€27.000 – €39.000 / año',
    salarioNota: 'El auge del Málaga TechPark y la llegada de sedes tecnológicas multinacionales ha disparado la demanda de especialistas en posicionamiento orgánico con capacidad analítica.',
    faqs: [
      {
        pregunta: '¿Hay demanda de SEO en Málaga?',
        respuesta: 'Málaga es hoy uno de los polos tecnológicos de mayor crecimiento en Europa. Agencias internacionales y startups de la Costa del Sol buscan talento capacitado en IA y SEO.',
      },
      {
        pregunta: '¿Cómo es la dinámica de mentoría?',
        respuesta: 'Trabajas codo a codo en grupos reducidos con coaches activos en el sector que revisan tus proyectos y te guían paso a paso.',
      },
      {
        pregunta: '¿El temario está actualizado para 2026?',
        respuesta: 'Completamente. Incluye los últimos cambios de AI Overviews de Google, optimización para LLMs y automatización con Python básico y prompts avanzados.',
      },
    ],
    meta: {
      title: 'Curso de SEO en Málaga | Diplomado Especialista en aprendoclub',
      description: 'Curso de SEO en Málaga. Formación avanzada en posicionamiento web e inteligencia artificial para profesionales en Andalucía.',
    },
  },
  {
    nombre: 'Maracaibo',
    slug: 'maracaibo',
    pais: 'Venezuela',
    gentilicio: 'en Maracaibo',
    salarioPromedio: '$500 – $1,500 USD / mes',
    salarioNota: 'Desde Maracaibo, especializarse en SEO permite generar ingresos en divisas trabajando remotamente para clientes de EE.UU., España, México y Colombia sin depender de la economía local.',
    faqs: [
      {
        pregunta: '¿Qué necesito para cursar desde Maracaibo?',
        respuesta: 'Una computadora con conexión a internet y ganas de practicar. Todas las sesiones quedan grabadas en alta definición por si tienes cortes imprevistos de electricidad o internet.',
      },
      {
        pregunta: '¿Cómo se consiguen los primeros clientes?',
        respuesta: 'En el programa dedicamos módulos específicos a la captación de clientes freelance, elaboración de propuestas de auditoría y fijación de precios en dólares.',
      },
      {
        pregunta: '¿Se requiere experiencia previa en marketing?',
        respuesta: 'No, explicamos desde los conceptos básicos de motores de búsqueda hasta técnicas avanzadas de link building y SEO técnico.',
      },
    ],
    meta: {
      title: 'Curso de SEO en Maracaibo | Trabaja en Remoto para el Exterior',
      description: 'Curso de SEO en Maracaibo. Aprende posicionamiento orgánico y consigue clientes internacionales en dólares con aprendoclub.',
    },
  },
  {
    nombre: 'Puebla',
    slug: 'puebla',
    pais: 'México',
    gentilicio: 'en Puebla',
    salarioPromedio: '$18,000 – $35,000 MXN / mes',
    salarioNota: 'Puebla cuenta con un mercado universitario y comercial creciente. El SEO permite trabajar tanto para marcas de la región como acceder a salarios de CDMX o remotos internacionales sin salir de Puebla.',
    faqs: [
      {
        pregunta: '¿El curso es presencial u online en Puebla?',
        respuesta: 'Es 100% online con clases en vivo y comunidad activa 24/7 en Discord. Tienes la cercanía del acompañamiento personalizado sin las limitaciones de un aula física.',
      },
      {
        pregunta: '¿Enseña SEO tradicional o con Inteligencia Artificial?',
        respuesta: 'Ambos. Dominarás los fundamentos técnicos, de contenido y enlaces, complementados con las técnicas más punteras de optimización para motores de búsqueda con IA.',
      },
      {
        pregunta: '¿Hay facilidades de pago?',
        respuesta: 'Sí, ofrecemos opción de pago en cuotas para que puedas iniciar tu formación con comodidad.',
      },
    ],
    meta: {
      title: 'Curso de SEO en Puebla | Aprende Posicionamiento Web',
      description: 'Curso de SEO en Puebla. Aprende posicionamiento web profesional y optimización para IA con el Diplomado de aprendoclub.',
    },
  },
  {
    nombre: 'Toledo',
    slug: 'toledo',
    pais: 'España',
    gentilicio: 'en Toledo',
    salarioPromedio: '€25.000 – €35.000 / año',
    salarioNota: 'Por su proximidad con Madrid y el auge del teletrabajo en Castilla-La Mancha, profesionales en Toledo acceden a sueldos y oportunidades de agencias madrileñas o remotas de toda España.',
    faqs: [
      {
        pregunta: '¿Cómo compatibilizar el curso viviendo en Toledo?',
        respuesta: 'La flexibilidad de la plataforma y el formato en vivo en horario de tarde te permiten formarte a tu propio ritmo con feedback semanal en directo.',
      },
      {
        pregunta: '¿Qué herramientas se utilizan?',
        respuesta: 'Aprenderás a usar Ahrefs, Semrush, Google Search Console, Screaming Frog y herramientas de IA generativa.',
      },
      {
        pregunta: '¿Tengo acceso a la comunidad después del curso?',
        respuesta: 'Sí, el acceso a la comunidad de aprendoclub y al material grabado se mantiene para que continúes consultando y compartiendo con otros especialistas.',
      },
    ],
    meta: {
      title: 'Curso de SEO en Toledo | Formación Especializada en aprendoclub',
      description: 'Curso de SEO en Toledo. Especialízate en SEO técnico, de contenidos e IA con el Diplomado de 16 semanas de aprendoclub.',
    },
  },
  {
    nombre: 'Valencia',
    slug: 'valencia',
    pais: 'España',
    gentilicio: 'en Valencia',
    salarioPromedio: '€28.000 – €40.000 / año',
    salarioNota: 'Valencia cuenta con un ecosistema de startups (hub de La Marina) y agencias consolidadas. Los perfiles que dominan SEO técnico, arquitectura de información y automatización con IA tienen una alta tasa de colocación.',
    faqs: [
      {
        pregunta: '¿Qué diferencia este curso de otros en Valencia?',
        respuesta: 'No es teoría pregrabada de hace tres años. Es un programa vivo de 16 semanas actualizado semana a semana según los cambios de algoritmos de Google y la IA.',
      },
      {
        pregunta: '¿Cómo me ayuda a conseguir empleo en Valencia?',
        respuesta: 'Saldrás con un portafolio de casos reales auditados, optimizados y listos para mostrar a empleadores o prospectos de clientes.',
      },
      {
        pregunta: '¿Quiénes son los instructores?',
        respuesta: 'Arianna Lupi (fundadora de aprendoclub y consultora internacional) junto a coaches especialistas con años de experiencia en proyectos de gran escala.',
      },
    ],
    meta: {
      title: 'Curso de SEO en Valencia | Diplomado SEO + AIO en aprendoclub',
      description: 'Curso de SEO en Valencia. Aprende posicionamiento orgánico y optimización para ChatGPT y Gemini con el Diplomado de aprendoclub.',
    },
  },
]

async function run() {
  const payload = await getPayload({ config })
  console.log('--- Iniciando Seed de 10 Ciudades SEO en Neon DB ---')

  for (const c of CIUDADES) {
    const existing = await payload.find({
      collection: 'ciudades-seo',
      where: { slug: { equals: c.slug } },
      limit: 1,
    })

    if (existing.docs[0]) {
      console.log(`Actualizando ciudad: ${c.nombre} (${c.slug})`)
      await payload.update({
        collection: 'ciudades-seo',
        id: existing.docs[0].id,
        data: c,
        context: { disableRevalidate: true },
      })
    } else {
      console.log(`Creando ciudad: ${c.nombre} (${c.slug})`)
      await payload.create({
        collection: 'ciudades-seo',
        data: c,
        context: { disableRevalidate: true },
      })
    }
  }

  const count = await payload.count({ collection: 'ciudades-seo' })
  console.log(`Total ciudades en BD: ${count.totalDocs}`)
  console.log('--- Seed de Ciudades finalizado con éxito ---')
  await payload.destroy()
  process.exit(0)
}

run().catch((err) => {
  console.error('Error durante el seed de ciudades:', err)
  process.exit(1)
})
