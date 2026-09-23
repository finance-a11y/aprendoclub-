import { getPayload } from 'payload'
import config from '../payload.config'

const ctx = { context: { disableRevalidate: true } }
const CHECKOUT = 'https://academia.aprendoclub.com/offers/phCioDUy/checkout'

async function upsertTestimonio(payload: any, data: any) {
  const { docs } = await payload.find({
    collection: 'testimonios',
    where: { nombre: { equals: data.nombre } },
    limit: 1,
  })
  if (docs.length) return docs[0].id
  const doc = await payload.create({
    collection: 'testimonios',
    data,
    context: { disableRevalidate: true },
  })
  return doc.id
}

async function upsertFaq(payload: any, pregunta: string, respuesta: string, orden: number) {
  const { docs } = await payload.find({
    collection: 'faq',
    where: { and: [{ page: { equals: 'taller-seo-con-ia' } }, { question: { equals: pregunta } }] },
    limit: 1,
  })
  if (docs.length) return docs[0].id
  const doc = await payload.create({
    collection: 'faq',
    data: { question: pregunta, answer: respuesta, page: 'taller-seo-con-ia', orden },
    context: { disableRevalidate: true },
  })
  return doc.id
}

async function run() {
  const payload = await getPayload({ config })

  // --- Testimonios escritos (contenido de la propia página en vivo, sin inventar) ---
  const t1 = await upsertTestimonio(payload, {
    nombre: 'María G.',
    rol: 'Community manager',
    ubicacion: 'Venezuela',
    quote:
      'Era community manager cobrando $300/mes sin poder justificar subir mis tarifas. En el taller de Ari aprendí a hacer keyword research y estructurar contenido SEO. A las 3 semanas conseguí mi primer cliente de SEO pagando $600/mes.',
  })
  const t2 = await upsertTestimonio(payload, {
    nombre: 'Camila V.',
    rol: 'Freelancer',
    ubicacion: 'Colombia',
    quote:
      'Antes cobraba lo mismo por cualquier trabajo, sin poder justificar una tarifa más alta. En el taller aprendí a hacer una auditoría SEO básica y a presentarla como servicio independiente. A las 2 semanas cerré mi primer paquete de SEO.',
  })
  const t3 = await upsertTestimonio(payload, {
    nombre: 'Oriana L.',
    rol: 'Community manager',
    ubicacion: 'Venezuela',
    quote:
      'Manejaba las redes de 3 clientes cobrando tarifa plana. En el taller aprendí keyword research y a armar un reporte SEO simple. A las 4 semanas uno de mis clientes me contrató aparte para llevarle el SEO, pagando $350 adicionales al mes.',
  })

  // --- FAQ ---
  const faqIds: number[] = []
  const faqs: [string, string][] = [
    [
      '¿Debo tener experiencia previa?',
      'No, no necesitas experiencia previa. Te damos todas las bases para que avances con éxito en el mundo del SEO.',
    ],
    [
      '¿Cómo accedo al taller?',
      'El taller es 100% online vía Zoom. Cuando confirmes tu pago recibís el enlace de acceso y los detalles para conectarte a la sesión en vivo.',
    ],
    [
      '¿Necesito una computadora específica?',
      'Con una computadora o laptop que pueda abrir al menos 5 pestañas del navegador al mismo tiempo alcanza.',
    ],
    [
      '¿Y si soy principiante total?',
      'El taller está diseñado para todos los niveles. Vas a tener toda la información para empezar desde cero y aplicar SEO desde el primer día.',
    ],
    [
      '¿Vale la pena si solo tengo $30 para invertir en mi formación ahora mismo?',
      'Sí. En un día aprendes a ofrecer un servicio que se paga entre $300 y $1,500/mes. Un cliente de SEO recupera 10 veces la inversión del taller.',
    ],
    [
      '¿Qué pasa si no puedo conectarme el día del taller?',
      'Si avisas antes, te compartimos la grabación y los materiales. La experiencia en vivo (el panel, las preguntas en tiempo real) no se puede replicar igual.',
    ],
    [
      '¿Aprenderé a usar herramientas de IA como ChatGPT para SEO?',
      'Sí. Uno de los bloques está dedicado a posicionarte en plataformas de IA: cómo aparecer en respuestas de ChatGPT, Gemini y otros sistemas.',
    ],
    [
      '¿Esto tiene aval universitario?',
      'aprendoclub tiene alianza académica con la Universidad Católica Andrés Bello (UCAB) a través de su unidad CIAP. El Diplomado SEO + AIO tiene certificación oficial, y este taller es la puerta de entrada a ese programa.',
    ],
  ]
  for (let i = 0; i < faqs.length; i++) {
    faqIds.push(await upsertFaq(payload, faqs[i][0], faqs[i][1], i + 1))
  }

  // --- Team members del taller (ya existen en la colección) ---
  const { docs: teamDocs } = await payload.find({
    collection: 'team-members',
    where: { nombre: { in: ['Verónica Romero', 'Ibraim Zayed'] } },
    limit: 5,
  })
  const equipoIds = teamDocs.map((d: any) => d.id)

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'programas/taller-seo-con-ia' } },
    limit: 1,
    depth: 0,
  })
  const page: any = docs[0]
  const byType = (t: string) => page.layout.find((b: any) => b.blockType === t)

  const tallerHero = byType('tallerHero')
  if (tallerHero) {
    tallerHero.titulo = 'Especialízate en SEO + IA, en un solo día'
    tallerHero.subtitulo =
      'Aprende a posicionar una marca o negocio en Google, Gemini y ChatGPT, con Arianna Lupi, consultora con más de 8 años de experiencia y +$3M generados a sus clientes con esta habilidad.'
    tallerHero.duracion = '19 de septiembre · 10:00 am · Online vía Zoom'
  }

  const tallerIncluye = byType('tallerIncluye')
  if (tallerIncluye) {
    tallerIncluye.items = [
      { texto: '5 bloques de contenido en vivo (4 horas)', valor: 'valor $80' },
      { texto: 'Panel de preguntas y respuestas con coaches especializados', valor: 'valor $40' },
      { texto: 'Guías y herramientas PDF de apoyo', valor: 'valor $30' },
      { texto: 'Asesoría personalizada en vivo', valor: 'valor $90' },
      { texto: 'Grabación del taller, con acceso 30 días', valor: 'valor $40' },
    ]
  }

  const tallerPricing = byType('tallerPricing')
  if (tallerPricing) {
    tallerPricing.monto = '$30'
    tallerPricing.opciones = [
      { texto: 'Valor total del taller: $280 · Tu inversión hoy: $30' },
      { texto: 'Garantía de 7 días: si no valió la pena, te devolvemos tu dinero' },
    ]
    tallerPricing.cta = { label: 'Reservar mi lugar — $30', href: CHECKOUT }
  }

  // --- Nuevo: prueba social (stats de 1 item) ---
  const proofBar = {
    blockType: 'stats',
    items: [
      {
        value: '+1,000',
        titulo: 'marketers, freelancers y emprendedores en LATAM',
        label: 'ya aplican el sistema aprendoclub para aparecer en búsquedas orgánicas y respuestas de IA',
      },
    ],
  }

  // --- Nuevo: contenido del taller (featureGrid) ---
  const contenido = {
    blockType: 'featureGrid',
    eyebrow: 'Contenido del taller',
    titulo: 'Esto es lo que aprenderás en el taller',
    items: [
      {
        iconMode: 'icon',
        icon: 'compass',
        titulo: 'Domina las reglas del juego',
        descripcion:
          'Cómo funciona el SEO hoy: cómo piensan los buscadores (Google, IA, redes) y cómo detectar las palabras que tus clientes ya están buscando.',
      },
      {
        iconMode: 'icon',
        icon: 'file-text',
        titulo: 'Crea contenido que Google ama',
        descripcion:
          'Escribe títulos, descripciones y publicaciones que se posicionan, no solo se ven bien. Contenido optimizado para cualquier plataforma.',
      },
      {
        iconMode: 'icon',
        icon: 'map-pin',
        titulo: 'Pon tu negocio en el mapa',
        descripcion:
          'Optimiza tu presencia online, súmate a directorios clave y activa la estrategia más rápida para aparecer cuando alguien busca lo que ofreces.',
      },
      {
        iconMode: 'icon',
        icon: 'sparkles',
        titulo: 'Posiciónate en la era de la IA',
        descripcion:
          'Cómo aparecer en respuestas de ChatGPT, Google Gemini y otros sistemas de IA, y convertirte en una fuente de autoridad en tu industria.',
      },
      {
        iconMode: 'icon',
        icon: 'message-circle',
        titulo: 'Panel de discusión y respuestas en vivo',
        descripcion:
          'Cierra el día con un panel interactivo sobre cómo vivir del SEO, crecer como freelancer o escalar tu marca.',
      },
    ],
  }

  // --- Nuevo: ¿es para ti? (reusa antesDespues como sí/no) ---
  const esParaTi = {
    blockType: 'antesDespues',
    eyebrow: '¿Es para ti?',
    titulo: 'Este taller es para ti si...',
    antesLabel: 'No es para ti si...',
    antes: [
      { texto: 'Buscas una fórmula mágica para posicionarte en Google en 24 horas' },
      { texto: 'No estás dispuesto a aplicar lo que aprendes: trabajamos en vivo' },
      { texto: 'Ya tienes experiencia avanzada en SEO técnico y auditorías' },
      { texto: 'Prefieres cursos de meses antes de ver resultados' },
    ],
    despuesLabel: 'Sí es para ti si...',
    despues: [
      { texto: 'Eres community manager y quieres sumar SEO a tus servicios para cobrar más' },
      { texto: 'Eres marketer generalista y quieres especializarte en algo con demanda' },
      { texto: 'Eres freelancer y quieres ofrecer un servicio concreto y bien pagado' },
      { texto: 'Tienes un negocio o marca y quieres aparecer en Google sin pagar publicidad' },
      { texto: 'Eres desarrollador o diseñador y tus clientes siempre preguntan sobre SEO' },
      { texto: 'Quieres entender cómo posicionarte también en ChatGPT, Gemini y otras IAs' },
    ],
  }

  // --- Nuevo: testimonios escritos ---
  const testimonios = {
    blockType: 'testimonialRef',
    eyebrow: 'Resultados de nuestros estudiantes',
    titulo: 'Lo que logran quienes toman el taller',
    items: [t1, t2, t3],
  }

  // --- Nuevo: coaches (reusa diplomadoTeam) ---
  const coaches = {
    blockType: 'diplomadoTeam',
    teamIntro: {
      eyebrow: 'Tus mentores',
      titulo: 'Coaches especializados listos para guiarte',
    },
    equipo: { items: equipoIds },
    mentorSection: {
      titulo: 'Fundadora',
      nombre: 'Arianna Lupi',
      web: 'https://ariannalupi.com',
      bio: [
        {
          texto:
            'Fundadora de aprendoclub, consultora SEO con más de 10 años de experiencia. Ha generado más de $2M en ventas para más de 30 empresas a través de SEO orgánico y formó a más de 10,000 estudiantes en LATAM. Alianza académica con la UCAB (CIAP).',
        },
      ],
    },
  }

  // --- Nuevo: cierre ---
  const cierre = {
    blockType: 'ctaBanner',
    titulo: 'Un solo pago. Un día que cambia tu carrera.',
    texto: 'Tu inversión está protegida: si asistes y sientes que no valió la pena, te devolvemos tu dinero dentro de los 7 días siguientes.',
    boton: { label: 'Reservar mi lugar — $30', href: CHECKOUT },
  }

  const faqRefBlock = {
    blockType: 'faqRef',
    eyebrow: 'Preguntas frecuentes',
    titulo: 'Resolvemos tus dudas',
    items: faqIds,
  }

  const newLayout = [
    tallerHero,
    proofBar,
    contenido,
    esParaTi,
    testimonios,
    coaches,
    tallerIncluye,
    tallerPricing,
    faqRefBlock,
    cierre,
  ].filter(Boolean)

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { layout: newLayout },
    ...ctx,
  })
  console.log('[taller] layout reescrito, ' + newLayout.length + ' bloques')
}

await run()
