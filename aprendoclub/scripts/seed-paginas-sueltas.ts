import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  const payload = await getPayload({ config })
  console.log('--- Iniciando Seed de Páginas Sueltas y Legales (Fase 38) ---')

  const paginas = [
    {
      slug: 'contacto',
      title: 'Contacto — Habla con el Equipo de aprendoclub',
      layout: [
        {
          blockType: 'hero' as const,
          badgeText: 'Estamos para ayudarte',
          eyebrow: 'CONTACTO',
          tituloPre: 'Hablemos de tu',
          tituloAccent: 'Carrera y Formación',
          tituloPost: 'en SEO e IA',
          subtitulo:
            '¿Tienes dudas sobre el Diplomado, los Talleres o necesitas orientación personalizada? Escríbenos directamente y te responderemos en breve.',
          ctaPrimario: {
            label: 'Ver programas formativos',
            href: '/programas',
          },
          ctaSecundario: {
            label: 'Conoce al equipo',
            href: '/quienes-somos',
          },
        },
        {
          blockType: 'featureGrid' as const,
          eyebrow: 'CANALES DE ATENCIÓN',
          titulo: '¿Cómo prefieres comunicarte con nosotros?',
          subtitulo: 'Canales directos para resolver tus dudas antes de inscribirte o durante tu formación.',
          items: [
            {
              iconMode: 'icon' as const,
              icon: 'MessageSquare',
              titulo: 'Atención Directa',
              descripcion:
                'Comunícate con nuestro equipo de admisiones para conocer próximas fechas de inicio, cupos disponibles y facilidades de pago.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'Mail',
              titulo: 'Correo Electrónico',
              descripcion:
                'Escríbenos a hola@aprendoclub.com para consultas institucionales, colaboraciones, soporte de estudiantes o prensa.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'Calendar',
              titulo: 'Asesoría Personalizada',
              descripcion:
                'Si no sabes si tu perfil encaja con el Diplomado o el Taller, evaluamos tu experiencia previa y objetivos profesionales.',
            },
          ],
        },
        {
          blockType: 'ctaBanner' as const,
          titulo: '¿Listo para dar el siguiente paso en tu carrera digital?',
          texto:
            'Aprende habilidades de alto valor en SEO e Inteligencia Artificial con proyectos reales y acompañamiento de cerca.',
          boton: {
            label: 'Explorar todos los programas',
            href: '/programas',
          },
        },
      ],
    },
    {
      slug: 'glosario',
      title: 'Glosario SEO — Conceptos y Términos Clave de Posicionamiento',
      layout: [
        {
          blockType: 'hero' as const,
          badgeText: 'Diccionario para Especialistas',
          eyebrow: 'RECURSOS Y TERMINOLOGÍA',
          tituloPre: 'Glosario SEO:',
          tituloAccent: 'Conceptos Esenciales',
          tituloPost: 'Explicados Fácil',
          subtitulo:
            'La guía rápida de terminología técnica, estratégica y analítica para entender el SEO moderno y la optimización para inteligencia artificial.',
          ctaPrimario: {
            label: 'Aprender gratis desde cero',
            href: '/programas/curso-basico-de-seo',
          },
          ctaSecundario: {
            label: 'Ver formación avanzada',
            href: '/programas/diplomado',
          },
        },
        {
          blockType: 'featureGrid' as const,
          eyebrow: 'TERMINOLOGÍA IMPRESCINDIBLE',
          titulo: 'Conceptos clave que todo profesional del marketing debe dominar',
          subtitulo: 'Definiciones prácticas orientadas al impacto en tráfico orgánico y negocio.',
          items: [
            {
              iconMode: 'icon' as const,
              icon: 'Search',
              titulo: 'Search Intent (Intención de Búsqueda)',
              descripcion:
                'El objetivo real que busca resolver el usuario al consultar Google (informativa, transaccional, comercial o navegacional).',
            },
            {
              iconMode: 'icon' as const,
              icon: 'Award',
              titulo: 'E-E-A-T',
              descripcion:
                'Experiencia, Expertise, Autoridad y Confiabilidad (Trustworthiness): pilares de calidad humana evaluados por los algoritmos de Google.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'Bot',
              titulo: 'AIO (AI Optimization)',
              descripcion:
                'Estrategias de arquitectura y contenido diseñadas para que los motores generativos (ChatGPT, Gemini, Perplexity) citen y recomienden tu marca.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'Code',
              titulo: 'Crawl Budget (Presupuesto de Rastreo)',
              descripcion:
                'Límite de tiempo y recursos que los bots de Google dedican a rastrear e indexar URLs en tu servidor.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'Link',
              titulo: 'Backlinks & Autoridad',
              descripcion:
                'Enlaces externos que apuntan a tu sitio transmitiendo popularidad y votos de confianza a ojos del buscador.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'Layers',
              titulo: 'Etiqueta Canónica (Canonical)',
              descripcion:
                'Elemento HTML rel="canonical" que evita problemas de contenido duplicado indicando cuál es la URL prioritaria.',
            },
          ],
        },
        {
          blockType: 'ctaBanner' as const,
          titulo: 'Aplica estos conceptos en proyectos reales con clientes',
          texto:
            'En aprendoclub no nos quedamos en la teoría: aprendes a ejecutar auditorías completas y planes de posicionamiento medibles.',
          boton: {
            label: 'Conoce el Diplomado de SEO + AIO',
            href: '/programas/diplomado',
          },
        },
      ],
    },
    {
      slug: 'politica-privacidad',
      title: 'Política de Privacidad — aprendoclub',
      layout: [
        {
          blockType: 'sectionHeader' as const,
          eyebrow: 'LEGAL & TRANSPARENCIA',
          titulo: 'Política de Privacidad',
          subtitulo:
            'En aprendoclub respetamos y protegemos la privacidad de tus datos personales. A continuación detallamos cómo recopilamos, tratamos y protegemos tu información.',
        },
        {
          blockType: 'featureGrid' as const,
          eyebrow: 'TRATAMIENTO DE DATOS',
          titulo: 'Compromiso de protección y seguridad de tus datos',
          subtitulo: 'Transparencia absoluta en el cumplimiento de normativas de protección de datos.',
          items: [
            {
              iconMode: 'icon' as const,
              icon: 'Shield',
              titulo: '1. Responsable del Tratamiento',
              descripcion:
                'aprendoclub es el responsable de recabar, gestionar y custodiar los datos personales facilitados a través de nuestro sitio web y plataforma de formación.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'Database',
              titulo: '2. Información que Recopilamos',
              descripcion:
                'Recopilamos datos de contacto (nombre, correo electrónico, teléfono) para gestionar tu acceso al campus, inscripciones a cursos y avisos de clases.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'Lock',
              titulo: '3. Finalidad del Uso de Datos',
              descripcion:
                'Tus datos se utilizan exclusivamente para impartir la formación contratada, emitir certificaciones, atender tus consultas y enviar comunicaciones de valor formativo.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'EyeOff',
              titulo: '4. No Cesión a Terceros',
              descripcion:
                'No comercializamos, alquilamos ni cedemos tus datos personales a terceros con fines publicitarios ajenos a los servicios formativos de aprendoclub.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'CheckCircle',
              titulo: '5. Derechos del Usuario',
              descripcion:
                'Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación y oposición enviando un correo a hola@aprendoclub.com en cualquier momento.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'Server',
              titulo: '6. Seguridad y Conservación',
              descripcion:
                'Aplicamos medidas técnicas y organizativas rigurosas (cifrado SSL/TLS, servidores seguros) para evitar accesos no autorizados o pérdidas de información.',
            },
          ],
        },
        {
          blockType: 'ctaBanner' as const,
          titulo: '¿Tienes dudas sobre el tratamiento de tus datos?',
          texto:
            'Nuestro equipo está a tu disposición para resolver cualquier consulta sobre nuestras políticas y términos de servicio.',
          boton: {
            label: 'Contactar a soporte',
            href: '/contacto',
          },
        },
      ],
    },
    {
      slug: 'politica-reembolso',
      title: 'Política de Reembolso y Garantía — aprendoclub',
      layout: [
        {
          blockType: 'sectionHeader' as const,
          eyebrow: 'GARANTÍA Y CONFIANZA',
          titulo: 'Política de Reembolso y Devolución',
          subtitulo:
            'Queremos que te formes con total tranquilidad. Conoce los términos, condiciones y plazos de nuestra garantía de satisfacción.',
        },
        {
          blockType: 'featureGrid' as const,
          eyebrow: 'CONDICIONES DE GARANTÍA',
          titulo: 'Claridad en cada proceso de inscripción y cancelación',
          subtitulo: 'Reglas transparentes para proteger tu inversión educativa.',
          items: [
            {
              iconMode: 'icon' as const,
              icon: 'Award',
              titulo: '1. Periodo de Garantía',
              descripcion:
                'Nuestros programas insignia cuentan con un plazo de garantía de satisfacción desde el inicio oficial de las clases para que compruebes la calidad de la enseñanza.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'Clock',
              titulo: '2. Plazo y Comunicación',
              descripcion:
                'Las solicitudes de cancelación y reembolso deben remitirse por escrito a hola@aprendoclub.com dentro del periodo estipulado en las condiciones de cada programa.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'HelpCircle',
              titulo: '3. Compromiso de Participación',
              descripcion:
                'Para validar la garantía pedimos haber asistido a las sesiones iniciales y revisado los primeros materiales para confirmar una evaluación de buena fe.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'CreditCard',
              titulo: '4. Emisión del Reembolso',
              descripcion:
                'Aprobada la solicitud, el reembolso se procesa de forma íntegra a través de la misma pasarela de pago o método bancario original en un plazo de 5 a 10 días hábiles.',
            },
          ],
        },
        {
          blockType: 'ctaBanner' as const,
          titulo: 'Aprende con una metodología probada por más de 2,000 profesionales',
          texto:
            'Revisa los testimonios y opiniones de estudiantes que han transformado sus carreras con aprendoclub.',
          boton: {
            label: 'Ver casos de éxito y testimonios',
            href: '/testimonios',
          },
        },
      ],
    },
    {
      slug: 'aviso-legal',
      title: 'Aviso Legal — aprendoclub',
      layout: [
        {
          blockType: 'sectionHeader' as const,
          eyebrow: 'INFORMACIÓN LEGAL',
          titulo: 'Aviso Legal',
          subtitulo:
            'Información general y condiciones legales aplicables al acceso, navegación y uso del portal aprendoclub.com.',
        },
        {
          blockType: 'featureGrid' as const,
          eyebrow: 'CONDICIONES DE USO',
          titulo: 'Información general de la plataforma y responsabilidades',
          subtitulo: 'Términos de titularidad, derechos de propiedad intelectual y normativa aplicable.',
          items: [
            {
              iconMode: 'icon' as const,
              icon: 'Info',
              titulo: '1. Titular del Sitio Web',
              descripcion:
                'aprendoclub opera como academia digital dedicada a la formación especializada en posicionamiento en buscadores (SEO), marketing digital e inteligencia artificial.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'FileText',
              titulo: '2. Propiedad Intelectual e Industrial',
              descripcion:
                'Todos los temarios, vídeos, documentos descargables, marcas, logotipos y código fuente son titularidad exclusiva de aprendoclub o de sus respectivos licenciantes.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'AlertTriangle',
              titulo: '3. Exclusión de Responsabilidad',
              descripcion:
                'aprendoclub no se hace responsable del uso indebido de los contenidos formativos por parte de los usuarios ni de contingencias técnicas ajenas en redes de telecomunicaciones.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'ExternalLink',
              titulo: '4. Enlaces Externos',
              descripcion:
                'El sitio puede contener enlaces hacia herramientas o webs de terceros cuyo contenido, disponibilidad y políticas de privacidad son ajenas a aprendoclub.',
            },
          ],
        },
        {
          blockType: 'ctaBanner' as const,
          titulo: '¿Quieres conocer nuestra historia y equipo docente?',
          texto:
            'Descubre cómo nació aprendoclub y conoce a los profesionales que te acompañarán en cada clase.',
          boton: {
            label: 'Ver quiénes somos',
            href: '/quienes-somos',
          },
        },
      ],
    },
    {
      slug: 'terminos-condiciones',
      title: 'Términos y Condiciones del Servicio — aprendoclub',
      layout: [
        {
          blockType: 'sectionHeader' as const,
          eyebrow: 'CONDICIONES DE CONTRATACIÓN',
          titulo: 'Términos y Condiciones del Servicio',
          subtitulo:
            'Normas y acuerdos generales que regulan el acceso a la plataforma de aprendizaje, los cursos, talleres y la comunidad de aprendoclub.',
        },
        {
          blockType: 'featureGrid' as const,
          eyebrow: 'NORMAS DEL CAMPUS',
          titulo: 'Acuerdo de uso para alumnos y miembros de la comunidad',
          subtitulo: 'Pautas de convivencia, licencias de acceso y compromisos de pago.',
          items: [
            {
              iconMode: 'icon' as const,
              icon: 'CheckSquare',
              titulo: '1. Aceptación del Acuerdo',
              descripcion:
                'La contratación de cualquier formación, programa o taller en aprendoclub implica la aceptación expresa y sin reservas de los presentes términos de servicio.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'UserCheck',
              titulo: '2. Licencia de Uso Personal',
              descripcion:
                'El acceso al campus virtual y a las grabaciones es estrictamente personal e intransferible. Queda prohibida la reproducción pública, cesión de claves o reventa del material.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'CreditCard',
              titulo: '3. Pagos y Planes en Cuotas',
              descripcion:
                'En inscripciones financiadas en cuotas, el alumno se compromete al abono puntual de las mensualidades pactadas hasta completar el importe total del programa contratado.',
            },
            {
              iconMode: 'icon' as const,
              icon: 'Users',
              titulo: '4. Código de Conducta en la Comunidad',
              descripcion:
                'Mantenemos un entorno colaborativo y respetuoso. Cualquier comportamiento ofensivo, discriminatorio o spam conllevará la expulsión del alumno sin derecho a compensación.',
            },
          ],
        },
        {
          blockType: 'ctaBanner' as const,
          titulo: 'Comienza hoy tu preparación con los mejores especialistas',
          texto:
            'Descubre los programas formativos disponibles y únete a la próxima convocatoria.',
          boton: {
            label: 'Explorar programas',
            href: '/programas',
          },
        },
      ],
    },
  ]

  for (const p of paginas) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: p.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const id = existing.docs[0].id
      await payload.update({
        collection: 'pages',
        id,
        data: {
          title: p.title,
          layout: p.layout as any,
        },
        context: { disableRevalidate: true },
      })
      console.log(`[seed:pages] Página actualizada: /${p.slug} (ID ${id})`)
    } else {
      const created = await payload.create({
        collection: 'pages',
        data: {
          slug: p.slug,
          title: p.title,
          layout: p.layout as any,
        },
        context: { disableRevalidate: true },
      })
      console.log(`[seed:pages] Página creada: /${p.slug} (ID ${created.id})`)
    }
  }

  console.log('--- Seed de páginas sueltas y legales completado exitosamente ---')
  process.exit(0)
}

run().catch((err) => {
  console.error('Error en seed:', err)
  process.exit(1)
})
