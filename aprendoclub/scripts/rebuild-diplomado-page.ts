import { getPayload } from 'payload'
import config from '../payload.config'

const ctx = { context: { disableRevalidate: true } }

async function run() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'diplomado' } },
    limit: 1,
    depth: 0,
  })
  const page: any = docs[0]
  const byType = (t: string) => page.layout.find((b: any) => b.blockType === t)

  const hero = byType('hero')
  const historia = page.layout.find((b: any) => b.blockType === 'featureGrid' && b.eyebrow === 'Nuestra historia')
  const audience = byType('audience')
  const metodologia = page.layout.find((b: any) => b.blockType === 'featureGrid' && b.eyebrow === 'Metodología EPAM')
  const curriculum = byType('curriculum16Semanas')
  const howItWorks = byType('howItWorks')
  const diplomadoTeam = byType('diplomadoTeam')
  const diplomadoBenefits = byType('diplomadoBenefits')
  const diplomadoPricing = byType('diplomadoPricing')
  const faqRef = byType('faqRef')
  const ctaBannerFinal = byType('ctaBanner')
  const relatedLinks = byType('relatedLinks')

  // --- Nuevo: testimonios en video (reales, mismos videos curados que /testimonios) ---
  const youtubeTestimonials = {
    blockType: 'youtubeTestimonials',
    eyebrow: 'EN SUS PALABRAS',
    titulo: 'Estudiantes que ya viven el cambio',
    videos: [
      { nombre: 'Christian', youtube: 'https://youtu.be/F5CPFlZ0UnM' },
      { nombre: 'Angel', youtube: 'https://youtu.be/KRkTa9r4qOc' },
      { nombre: 'Gabriela', youtube: 'https://youtu.be/wyDF494GcF0' },
      { nombre: 'Claudia', youtube: 'https://youtu.be/tRhxo-MQeo4' },
      { nombre: 'Daniel', youtube: 'https://youtu.be/LKJn3F4kzMs' },
      { nombre: 'Venezia', youtube: 'https://youtu.be/eTZUpCWZJtA' },
    ],
  }

  // --- Nuevo: antes y después ---
  const antesDespues = {
    blockType: 'antesDespues',
    eyebrow: 'Tu primer paso',
    titulo: 'El antes y el después que cambia tu carrera',
    antesLabel: 'Antes de entrar',
    antes: [
      { texto: 'Sabes un poco de todo y no te especializas en nada' },
      { texto: 'Sigues cursos desactualizados, sin IA integrada' },
      { texto: 'No tienes con quién revisar tu trabajo ni una comunidad de apoyo' },
      { texto: 'Tu CV dice "marketing digital" y se pierde entre miles de perfiles' },
      { texto: 'No tienes un portafolio ni proyectos que muestren tu progreso' },
      { texto: 'Buscas trabajo sin saber cómo posicionarte' },
    ],
    despuesLabel: 'Al completar el diplomado',
    despues: [
      { texto: 'Dominas una de las habilidades mejor pagadas del marketing digital' },
      { texto: 'Aplicas IA en tu flujo de trabajo todos los días' },
      { texto: 'Tienes un portafolio revisado por coaches especializados' },
      { texto: 'Cuentas con una certificación que diferencia tu perfil' },
      { texto: 'Accedes a vacantes curadas antes de que se abran al público' },
      { texto: 'Estás listo para trabajar remoto, de forma independiente o en una empresa' },
    ],
  }

  // --- Nuevo: la oportunidad (stats) ---
  const oportunidad = {
    blockType: 'stats',
    eyebrow: 'La oportunidad',
    headerTitulo: 'El mercado de SEO está en su mejor momento',
    subtitulo:
      'Hay más demanda de especialistas SEO que personas capacitadas para cubrirla. Esa es tu oportunidad.',
    items: [
      {
        value: '$500–$4,000',
        titulo: 'Rango salarial mensual',
        label: 'de un especialista SEO con 1 a 3 años de experiencia en agencias remotas',
      },
      { value: '68%', titulo: 'de empresas en LATAM', label: 'no encuentran especialistas SEO capacitados' },
      {
        value: '+200%',
        titulo: 'de crecimiento en AIO',
        label: 'posicionarse en plataformas de IA generativa ya se paga extra hoy',
      },
      {
        value: '92%',
        titulo: 'de nuestros egresados',
        label: 'consigue trabajo o clientes antes de terminar el diplomado',
      },
    ],
  }

  // --- Nuevo: comparativa ---
  const comparativa = {
    blockType: 'comparativaTabla',
    eyebrow: '¿Por qué aprendoclub?',
    titulo: 'Lo que otras opciones no tienen y aquí sí obtienes',
    subtitulo: 'Hay muchas formas de aprender SEO. Pocas te preparan para el mercado laboral.',
    colOfrecenLabel: 'Lo que ofrecen',
    colFaltaLabel: 'Lo que no tienen',
    filas: [
      {
        nombre: 'Platzi / Domestika',
        ofrecen: 'Catálogo amplio y producción audiovisual cuidada.',
        falta: 'Una ruta diseñada, un coach que corrige tu trabajo y entrenamiento para el mercado laboral.',
      },
      {
        nombre: 'YouTube y contenido gratuito',
        ofrecen: 'Información gratis y disponible todo el tiempo.',
        falta: 'Orden, corrección de tu trabajo, comunidad y preparación para el mercado.',
      },
      {
        nombre: 'Bootcamps de $2,000 a $5,000',
        ofrecen: 'Fecha de inicio y cierre definidas, algo de mentoría.',
        falta: 'Horario flexible, precio accesible y vacantes curadas.',
      },
      {
        nombre: 'Cursos grabados genéricos',
        ofrecen: 'Contenido a tu ritmo y bajo costo.',
        falta: 'Actualización constante, mentores en vivo, comunidad y entrenamiento laboral.',
      },
    ],
  }

  // --- Nuevo: facilidades de pago (ctaBanner) ---
  const facilidadesPago = {
    blockType: 'ctaBanner',
    titulo: '¿Necesitas facilidades de pago?',
    texto:
      'No dejes que el dinero decida tu futuro. Agenda una asesoría gratuita con nuestro equipo de admisiones y encontramos juntos la opción que más te conviene.',
    boton: { label: 'Agendar asesoría gratuita', href: 'https://wa.link/85a89y' },
  }

  // --- Actualizado: ecosistema / todo lo que recibes (evita "real") ---
  if (diplomadoBenefits) {
    diplomadoBenefits.eyebrow = 'Todo lo que recibes'
    diplomadoBenefits.titulo = 'No es solo un diplomado. Es un ecosistema completo'
    diplomadoBenefits.subtitulo = 'Valor total de más de $10,500 USD. Tú accedes desde $780.'
    diplomadoBenefits.items = [
      {
        texto: 'Ruta completa de 16 semanas, de cero a especialista SEO: SEO técnico, on-page y AIO.',
        valor: '$3,000',
      },
      { texto: '3 sesiones en vivo por semana con coaches para resolver dudas sobre tu proyecto.', valor: '$2,000' },
      { texto: 'Acompañamiento continuo, con soporte personalizado en cada etapa.', valor: '$4,500' },
      {
        texto: 'Clases especiales con expertos en link building, SEO internacional y e-commerce.',
        valor: 'BONUS',
      },
      {
        texto: 'Cursos cortos y actualizaciones constantes: SEO con IA, AIO avanzado, SEO para redes y marca personal.',
        valor: 'BONUS',
      },
      { texto: 'Comunidad activa las 24 horas: grupo privado y red de contactos en LinkedIn.', valor: 'BONUS' },
    ]
    diplomadoBenefits.extras = [
      { text: 'Bolsa de trabajo curada, con vacantes SEO que no están en portales públicos' },
      { text: 'Plantillas, frameworks y SOPs: las mismas herramientas que usan los consultores con sus clientes' },
      { text: 'Certificación oficial como Especialista SEO de aprendoclub' },
    ]
  }

  const newLayout = [
    hero,
    youtubeTestimonials,
    antesDespues,
    oportunidad,
    diplomadoPricing,
    comparativa,
    curriculum,
    diplomadoBenefits,
    facilidadesPago,
    metodologia,
    howItWorks,
    historia,
    diplomadoTeam,
    audience,
    faqRef,
    ctaBannerFinal,
    relatedLinks,
  ].filter(Boolean)

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { layout: newLayout },
    ...ctx,
  })
  console.log('[diplomado] layout reordenado, ' + newLayout.length + ' bloques')
}

await run()
