import { getPayload } from 'payload'
import config from '../payload.config'

interface TerminoData {
  termino: string
  slug: string
  definicion: string
  letra: string
  categoria: 'basico' | 'tecnico' | 'onpage' | 'offpage' | 'herramientas' | 'ia-algoritmos' | 'metricas'
  destacado?: boolean
  ejemplo?: string
}

const TERMINOS: TerminoData[] = [
  {
    "termino": "Ahrefs",
    "slug": "ahrefs",
    "definicion": "Es un programa que ofrece un conjunto de herramientas SEO que ofrece funciones para investigación de palabras clave, análisis de backlinks, análisis de la competencia, seguimiento de rankings y más. Tiene una versión gratuita y otra paga.",
    "letra": "A",
    "categoria": "herramientas",
    "destacado": false
  },
  {
    "termino": "Ahrefs Rank (AR)",
    "slug": "ahrefs-rank-ar",
    "definicion": "Clasifica todos los sitios web en la base de datos de Ahrefs por el tamaño y la calidad de sus perfiles de backlinks.",
    "letra": "A",
    "categoria": "herramientas",
    "destacado": false
  },
  {
    "termino": "AI Overview",
    "slug": "ai-overview",
    "definicion": "Resúmenes generados por IA, como los de Google, que proporcionan respuestas rápidas a las consultas sin necesidad de hacer clic en los resultados de búsqueda.",
    "letra": "A",
    "categoria": "ia-algoritmos",
    "destacado": false
  },
  {
    "termino": "AIO (Artificial Intelligence Optimization)",
    "slug": "aio-artificial-intelligence-optimization",
    "definicion": "Estrategia de optimización orientada a posicionar contenidos y marcas en motores de respuesta impulsados por modelos de lenguaje e inteligencia artificial (como ChatGPT Search, Perplexity y Gemini).",
    "letra": "A",
    "categoria": "ia-algoritmos",
    "destacado": true
  },
  {
    "termino": "Algoritmo de Google",
    "slug": "algoritmo-de-google",
    "definicion": "El sistema complejo que utiliza Google para clasificar y ordenar los resultados de búsqueda, basándose en diversos factores como la relevancia, la calidad del contenido y la experiencia del usuario.",
    "letra": "A",
    "categoria": "ia-algoritmos",
    "destacado": false
  },
  {
    "termino": "Alt text",
    "slug": "alt-text",
    "definicion": "El texto alternativo que se utiliza para describir las imágenes de un sitio web. El alt text es importante para la accesibilidad y el SEO, ya que permite a los motores de búsqueda comprender el contenido de las imágenes y mostrarlas en los resultados de búsqueda de imágenes.",
    "letra": "A",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "AMP (Accelerated Mobile Pages)",
    "slug": "amp-accelerated-mobile-pages",
    "definicion": "Un proyecto de código abierto que busca mejorar la velocidad de carga de las páginas web en dispositivos móviles.",
    "letra": "A",
    "categoria": "tecnico",
    "destacado": false
  },
  {
    "termino": "Analítica web",
    "slug": "analitica-web",
    "definicion": "El conjunto de herramientas y técnicas que permiten medir el tráfico y el comportamiento de los usuarios en un sitio web, proporcionando información valiosa para mejorar su rendimiento.",
    "letra": "A",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Autoridad de dominio (DR)",
    "slug": "autoridad-de-dominio-dr",
    "definicion": "Una métrica de Ahrefs (herramienta de SEO de terceros) que muestra la fuerza relativa del perfil de vínculo de retroceso de un sitio web. Cuanto más alto, mejor.",
    "letra": "A",
    "categoria": "metricas",
    "destacado": false
  },
  {
    "termino": "Backlinks",
    "slug": "backlinks",
    "definicion": "Son enlaces que apuntan desde un sitio web hacia otro. Los backlinks de páginas web con alta autoridad y relevancia son considerados como &quot;votos de confianza&quot; por los motores de búsqueda, lo que contribuye a mejorar el posicionamiento de la página destino.",
    "letra": "B",
    "categoria": "offpage",
    "destacado": true
  },
  {
    "termino": "Black hat SEO",
    "slug": "black-hat-seo",
    "definicion": "Son técnicas de optimización de motores de búsqueda que van en contra de las directrices de los buscadores para posicionar una web. Estas técnicas se centran en engañar a los motores de búsqueda para obtener una clasificación más alta en los resultados de búsqueda, en lugar de crear contenido valioso y útil para los usuarios. El uso de Black hat SEO puede resultar en penalizaciones por parte de los motores de búsqueda.",
    "letra": "B",
    "categoria": "offpage",
    "destacado": false
  },
  {
    "termino": "Canonicalización",
    "slug": "canonicalizacion",
    "definicion": "La práctica de indicar al motor de búsqueda cuál es la versión principal de una página web que tiene contenido duplicado, evitando así problemas de canibalización SEO.",
    "letra": "C",
    "categoria": "tecnico",
    "destacado": true
  },
  {
    "termino": "Clúster de contenidos",
    "slug": "cluster-de-contenidos",
    "definicion": "Es un grupo de páginas web interrelacionadas que se centran en un tema principal. Cada página del clúster cubre un subtema específico relacionado con el tema principal. Los clúster de contenido ayudan a los motores de búsqueda a comprender la profundidad del conocimiento de tu sitio web sobre un tema y pueden mejorar su posicionamiento en los resultados de búsqueda.",
    "letra": "C",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Contenido duplicado",
    "slug": "contenido-duplicado",
    "definicion": "El contenido duplicado es aquel que aparece en dos o más páginas web y es idéntico o muy similar. El contenido duplicado puede penalizarse por los motores de búsqueda, por lo que es importante crear contenido original y único para cada página de tu sitio web.",
    "letra": "C",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "Conversiones",
    "slug": "conversiones",
    "definicion": "Acciones específicas que deseas que realicen los usuarios en tu sitio web, como realizar una compra, suscribirse a una newsletter o descargar un archivo. Las conversiones te ayudan a medir el éxito de tu sitio web y el retorno de la inversión (ROI) de tus esfuerzos de SEO.",
    "letra": "C",
    "categoria": "metricas",
    "destacado": false
  },
  {
    "termino": "Core Web Vitals",
    "slug": "core-web-vitals",
    "definicion": "Conjunto de métricas estandarizadas por Google que evalúan la experiencia real del usuario en una página web: velocidad de carga (LCP), interactividad y capacidad de respuesta (INP) y estabilidad visual durante la carga (CLS).",
    "letra": "C",
    "categoria": "tecnico",
    "destacado": true
  },
  {
    "termino": "Crawl Budget (Presupuesto de Rastreo)",
    "slug": "crawl-budget",
    "definicion": "El límite de páginas y recursos que los robots de Google (Googlebot) rastrean en un sitio web durante un periodo determinado antes de abandonarlo. Optimizar la arquitectura y resolver errores 404 maximiza su aprovechamiento.",
    "letra": "C",
    "categoria": "tecnico",
    "destacado": true
  },
  {
    "termino": "Densidad de palabras clave",
    "slug": "densidad-de-palabras-clave",
    "definicion": "La frecuencia con la que aparece una palabra clave en una página web. Si bien la densidad de palabras clave era un factor importante en el SEO en el pasado, actualmente no es tan relevante. En cambio, lo que se debe priorizar es crear contenido natural y de calidad que incluya las palabras clave de forma natural.",
    "letra": "D",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "Dinorank",
    "slug": "dinorank",
    "definicion": "Esta herramienta es útil para el análisis SEO, ayudando a evaluar el posicionamiento de palabras clave y proporcionando datos adicionales sobre SEO local.",
    "letra": "D",
    "categoria": "herramientas",
    "destacado": false
  },
  {
    "termino": "Diseño web",
    "slug": "diseno-web",
    "definicion": "El diseño web juega un papel crucial en la UX y el SEO. Un diseño atractivo, intuitivo y fácil de navegar anima a los usuarios a permanecer más tiempo en el sitio web y a explorar más contenido, lo que se traduce en un mejor posicionamiento SEO.",
    "letra": "D",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Dominio",
    "slug": "dominio",
    "definicion": "La dirección única que identifica a un sitio web en Internet, como por ejemplo &quot;https://www.ejemplos.co/&quot;.",
    "letra": "D",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Dominios referidos (RD)",
    "slug": "dominios-referidos-rd",
    "definicion": "Los dominios de referencia son el total de sitios web desde los cuales el sitio web o la página web de destino tiene uno o más backlinks.",
    "letra": "D",
    "categoria": "offpage",
    "destacado": false
  },
  {
    "termino": "EEAT (Expertise, Experience, Authority, Trustworthiness)",
    "slug": "eeat-expertise-experience-authority-trustworthiness",
    "definicion": "EAT es un concepto utilizado por Google para evaluar la calidad del contenido y la confiabilidad de un sitio web. Para mejorar el EAT de tu sitio web, debes asegurarte de que el contenido esté creado por expertos en la materia, que sea preciso y actualizado, y que provenga de fuentes confiables.",
    "letra": "E",
    "categoria": "onpage",
    "destacado": true
  },
  {
    "termino": "Enlace externo",
    "slug": "enlace-externo",
    "definicion": "Un enlace que dirige a los usuarios desde tu sitio web hacia otro sitio web. Los enlaces externos se utilizan para proporcionar información adicional al usuario, citar fuentes o ampliar el contexto de tu contenido.",
    "letra": "E",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Enlace interno",
    "slug": "enlace-interno",
    "definicion": "Un enlace que conecta páginas dentro de tu propio sitio web. Los enlaces internos ayudan a los usuarios a navegar por tu sitio web y descubrir contenido relacionado, además de mejorar la estructura y la indexación por parte de los motores de búsqueda.",
    "letra": "E",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Enlaces dofollow",
    "slug": "enlaces-dofollow",
    "definicion": "Enlaces que transmiten autoridad de una página web a otra, lo que beneficia al posicionamiento SEO de la página destino.",
    "letra": "E",
    "categoria": "offpage",
    "destacado": false
  },
  {
    "termino": "Enlaces nofollow",
    "slug": "enlaces-nofollow",
    "definicion": "Enlaces que indican a los motores de búsqueda que no se debe transmitir autoridad a la página destino, utilizados principalmente para evitar el spam SEO.",
    "letra": "E",
    "categoria": "offpage",
    "destacado": false
  },
  {
    "termino": "Etiquetas meta",
    "slug": "etiquetas-meta",
    "definicion": "Etiquetas HTML que se utilizan para proporcionar información a los motores de búsqueda sobre una página web.",
    "letra": "E",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Experiencia de Usuario (UX)",
    "slug": "experiencia-de-usuario-ux",
    "definicion": "La UX se refiere a la experiencia general que tiene un usuario al interactuar con un sitio web. Una buena UX debe ser intuitiva, fácil de usar y agradable, lo que anima a los usuarios a volver al sitio web y a recomendarlo a otros.",
    "letra": "E",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "Featured snippets o Google Answer Boxes",
    "slug": "featured-snippets-o-google-answer-boxes",
    "definicion": "Fragmentos cortos de texto que aparecen en la parte superior de los resultados de búsqueda de Google para responder rápidamente a la consulta de un buscador sin tener que hacer clic.",
    "letra": "F",
    "categoria": "ia-algoritmos",
    "destacado": false
  },
  {
    "termino": "GEO (Generative Engine Optimization)",
    "slug": "geo-generative-engine-optimization",
    "definicion": "Metodología enfocada en incrementar la visibilidad, menciones y citaciones de una marca en respuestas generadas por motores de búsqueda de IA generativa mediante fuentes de alta autoridad y contenido estructurado.",
    "letra": "G",
    "categoria": "ia-algoritmos",
    "destacado": true
  },
  {
    "termino": "Google Analytics",
    "slug": "google-analytics",
    "definicion": "Una herramienta gratuita de analítica web ofrecida por Google. Google Analytics proporciona una amplia variedad de datos sobre el tráfico del sitio web, el comportamiento del usuario, las conversiones y mucho más.",
    "letra": "G",
    "categoria": "herramientas",
    "destacado": false
  },
  {
    "termino": "Google Search Console",
    "slug": "google-search-console",
    "definicion": "Google Search Console es una herramienta gratuita de Google que te ayuda a monitorizar el estado de tu sitio web en los resultados de búsqueda.",
    "letra": "G",
    "categoria": "herramientas",
    "destacado": true
  },
  {
    "termino": "Guest blogging o guest posting",
    "slug": "guest-blogging-o-guest-posting",
    "definicion": "La práctica de escribir artículos como invitado para otros sitios web relacionados con tu temática. El guest blogging te permite llegar a una nueva audiencia, generar backlinks de calidad y posicionarte como un experto en tu sector.",
    "letra": "G",
    "categoria": "offpage",
    "destacado": false
  },
  {
    "termino": "Headings H1, H2, H3 o Encabezados",
    "slug": "headings-h1-h2-h3-o-encabezados",
    "definicion": "Etiquetas HTML que se utilizan para estructurar el contenido de una página web. Los encabezados ayudan a los usuarios y a los motores de búsqueda a comprender la jerarquía del contenido.",
    "letra": "H",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "HTTPS",
    "slug": "https",
    "definicion": "El HTTPS (protocolo de transferencia de hipertexto seguro) es un protocolo que cifra la comunicación entre un navegador web y un sitio web, proporcionando una conexión segura. Garantiza que los datos transmitidos entre el usuario y el sitio web no puedan ser interceptados ni manipulados por partes no autorizadas.",
    "letra": "H",
    "categoria": "tecnico",
    "destacado": false
  },
  {
    "termino": "Indexación (Indexar)",
    "slug": "indexacion-indexar",
    "definicion": "El proceso mediante el cual los motores de búsqueda descubren y añaden páginas web a su índice, haciéndolas visibles en los resultados de búsqueda.",
    "letra": "I",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Intención de Búsqueda",
    "slug": "intencion-de-busqueda",
    "definicion": "El propósito detrás de una consulta de búsqueda, y la correcta interpretación de la intención (informativa, comercial, transaccional, etc.), es clave en el SEO.",
    "letra": "I",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Keyword research",
    "slug": "keyword-research",
    "definicion": "La investigación de palabras clave es el proceso de identificar las palabras clave y frases que los usuarios utilizan para buscar información en Internet relacionada con tu sitio web. Al optimizar tu contenido para las palabras clave relevantes, puedes aumentar las posibilidades de que tu sitio web aparezca en los resultados de búsqueda cuando los usuarios realicen esas búsquedas.",
    "letra": "K",
    "categoria": "basico",
    "destacado": true
  },
  {
    "termino": "KPI 's (Key Performance Indicators)",
    "slug": "kpi-s-key-performance-indicators",
    "definicion": "Indicadores clave de rendimiento que te ayudan a medir el éxito de tu estrategia de SEO.",
    "letra": "K",
    "categoria": "metricas",
    "destacado": false
  },
  {
    "termino": "Link Building",
    "slug": "link-building",
    "definicion": "El proceso de adquirir backlinks de alta calidad de forma estratégica. El linkbuilding no se trata de conseguir la mayor cantidad de enlaces posibles, sino de obtener enlaces de sitios web significativos y con autoridad.",
    "letra": "L",
    "categoria": "offpage",
    "destacado": false
  },
  {
    "termino": "Long tail keywords o Palabras Cola Larga",
    "slug": "long-tail-keywords-o-palabras-cola-larga",
    "definicion": "Son palabras clave o frases más específicas y menos competitivas que las short tail keywords. Por lo general, las long tail keywords tienen un mayor volumen de búsqueda, pero un menor volumen de competencia. Al optimizar tu contenido para long tail keywords, puedes atraer tráfico orgánico más cualificado a tu sitio web.",
    "letra": "L",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "Marketing de contenidos",
    "slug": "marketing-de-contenidos",
    "definicion": "La creación y distribución de contenido valioso, informativo y relevante para tu público objetivo. El marketing de contenidos no solo atrae tráfico orgánico a tu sitio web, sino que también te permite generar backlinks de forma natural, ya que otros sitios web querrán enlazar a tu contenido de calidad.",
    "letra": "M",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Meta descripción",
    "slug": "meta-descripcion",
    "definicion": "La breve descripción que se muestra debajo del título en los resultados de búsqueda. Debe ser atractiva y resumir el contenido de la página.",
    "letra": "M",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "Meta robots",
    "slug": "meta-robots",
    "definicion": "Etiquetas HTML que se utilizan para indicar a los motores de búsqueda cómo deben indexar y mostrar una página web.",
    "letra": "M",
    "categoria": "tecnico",
    "destacado": false
  },
  {
    "termino": "Meta título",
    "slug": "meta-titulo",
    "definicion": "El título que se muestra en los resultados de búsqueda. Debe ser claro, conciso y descriptivo del contenido de la página.",
    "letra": "M",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "Métricas SEO",
    "slug": "metricas-seo",
    "definicion": "Datos específicos que te ayudan a evaluar la efectividad de tu estrategia de SEO.",
    "letra": "M",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Mobile-first indexing",
    "slug": "mobile-first-indexing",
    "definicion": "Es un enfoque de indexación que Google utiliza para clasificar los sitios web. En el mobile-first indexing, Google prioriza la versión móvil de un sitio web al momento de indexarlo y clasificarlo en los resultados de búsqueda. Esto significa que es fundamental asegurarte de que tu sitio web tenga un diseño responsive y que se visualice correctamente en dispositivos móviles.",
    "letra": "M",
    "categoria": "tecnico",
    "destacado": false
  },
  {
    "termino": "Motor de búsqueda",
    "slug": "motor-de-busqueda",
    "definicion": "Un programa informático que permite a los usuarios encontrar información en Internet mediante la introducción de palabras clave o frases. Google, Bing y Yahoo son algunos de los motores de búsqueda más populares.",
    "letra": "M",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Noindex",
    "slug": "noindex",
    "definicion": "Directiva implementada en la etiqueta meta robots o en las cabeceras HTTP que instruye formalmente a los motores de búsqueda a no indexar una página web específica en sus índices de resultados.",
    "letra": "N",
    "categoria": "tecnico",
    "destacado": false
  },
  {
    "termino": "Optimización de contenido",
    "slug": "optimizacion-de-contenido",
    "definicion": "La optimización de contenido implica crear contenido de alta calidad que sea relevante para tu público objetivo y que esté optimizado para los motores de búsqueda. Esto incluye utilizar las palabras clave objetivo de manera natural, escribir contenido informativo y atractivo, y estructurar el contenido de forma que sea fácil de leer y navegar.",
    "letra": "O",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Palabra clave",
    "slug": "palabra-clave",
    "definicion": "Un término o frase que los usuarios utilizan para buscar información en Internet. Las palabras clave son fundamentales para el SEO, ya que permiten conectar tu sitio web con las búsquedas relevantes.",
    "letra": "P",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "Palabra clave de marca",
    "slug": "palabra-clave-de-marca",
    "definicion": "Cualquier palabra clave que contenga el nombre de la marca. Por ejemplo, “precios de aprendoseo”.",
    "letra": "P",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "Palabra clave genérica",
    "slug": "palabra-clave-generica",
    "definicion": "Cualquier palabra clave que no contenga el nombre de la marca. Por ejemplo, “cursos de seo”.",
    "letra": "P",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "Palabra clave principal",
    "slug": "palabra-clave-principal",
    "definicion": "La palabra clave más importante para la que deseas que tu sitio web se posicione en los resultados de búsqueda.",
    "letra": "P",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "Protocolo",
    "slug": "protocolo",
    "definicion": "En el ámbito de redes, un protocolo es un conjunto estandarizado de reglas para formatear y procesar datos. Los protocolos permiten que los ordenadores se comuniquen entre sí.",
    "letra": "P",
    "categoria": "tecnico",
    "destacado": false
  },
  {
    "termino": "Rankings",
    "slug": "rankings",
    "definicion": "La posición que tiene una página o dominio individual del 1 al 100 para una palabra clave específica. Cuanto más alto sea el ránking, mejor. Una página puede posicionarse para múltiples palabras clave.",
    "letra": "R",
    "categoria": "metricas",
    "destacado": false
  },
  {
    "termino": "Rastreo",
    "slug": "rastreo",
    "definicion": "El proceso que siguen los motores de búsqueda para explorar y descubrir las páginas web de un sitio.",
    "letra": "R",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Redirección 301",
    "slug": "redireccion-301",
    "definicion": "Es un código de estado HTTP que indica que una página web se ha movido permanentemente a una nueva ubicación. Las redirecciones 301 son importantes para el SEO porque ayudan a los motores de búsqueda a comprender la nueva ubicación de la página web y evitan que se produzcan errores 404 (página no encontrada).",
    "letra": "R",
    "categoria": "tecnico",
    "destacado": false
  },
  {
    "termino": "Redirecciones",
    "slug": "redirecciones",
    "definicion": "El envío de los usuarios de una página web a otra, utilizadas principalmente para cambios de URL o para evitar contenido duplicado.",
    "letra": "R",
    "categoria": "tecnico",
    "destacado": false
  },
  {
    "termino": "Rich Snippet",
    "slug": "rich-snippet",
    "definicion": "Un Rich Snippet es un tipo de resultado de búsqueda que proporciona información adicional sobre una página web, como calificaciones de estrellas, imágenes o información de contacto. Los Rich Snippets pueden aumentar el CTR (Click-Through Rate) y mejorar la visibilidad de tu sitio web en los resultados de búsqueda.",
    "letra": "R",
    "categoria": "tecnico",
    "destacado": true
  },
  {
    "termino": "Robots.txt",
    "slug": "robots-txt",
    "definicion": "Un archivo de texto que se utiliza para indicar a los robots de búsqueda qué páginas de un sitio web pueden rastrear y cuáles no.",
    "letra": "R",
    "categoria": "tecnico",
    "destacado": false
  },
  {
    "termino": "Schema Markup (Datos Estructurados)",
    "slug": "schema-markup-datos-estructurados",
    "definicion": "Vocabulario estandarizado de marcado semántico (Schema.org en JSON-LD) que ayuda a los motores de búsqueda a interpretar el significado contextual de entidades, productos, personas y eventos, habilitando fragmentos enriquecidos.",
    "letra": "S",
    "categoria": "tecnico",
    "destacado": true
  },
  {
    "termino": "Search Console",
    "slug": "search-console",
    "definicion": "Una herramienta gratuita de Google que te ayuda a monitorizar el rendimiento de tu sitio web en los resultados de búsqueda.",
    "letra": "S",
    "categoria": "herramientas",
    "destacado": false
  },
  {
    "termino": "SEM (Search Engine Marketing)",
    "slug": "sem-search-engine-marketing",
    "definicion": "La estrategia de marketing que utiliza la publicidad en motores de búsqueda, como Google Ads, para promocionar un sitio web y aumentar su visibilidad.",
    "letra": "S",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "SEMrush",
    "slug": "semrush",
    "definicion": "Semrush es otro conjunto de herramientas SEO popular que ofrece una amplia gama de funciones, que incluyen investigación de palabras clave, análisis de la competencia, auditoría SEO en la página, herramientas de marketing de contenido y herramientas de marketing en redes sociales.",
    "letra": "S",
    "categoria": "herramientas",
    "destacado": false
  },
  {
    "termino": "SEO (Search Engine Optimization)",
    "slug": "seo-search-engine-optimization",
    "definicion": "El proceso de optimizar un sitio web para mejorar su posicionamiento en los resultados de búsqueda orgánicos.",
    "letra": "S",
    "categoria": "basico",
    "destacado": true
  },
  {
    "termino": "SEO Local",
    "slug": "seo-local",
    "definicion": "El conjunto de técnicas que se enfocan en optimizar un sitio web para que aparezca en los resultados de búsqueda relevantes para una ubicación geográfica específica.",
    "letra": "S",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "SEO Off-page",
    "slug": "seo-off-page",
    "definicion": "Las acciones que se realizan fuera del sitio web para mejorar su posicionamiento, como la obtención de backlinks de calidad.",
    "letra": "S",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "SEO On-page",
    "slug": "seo-on-page",
    "definicion": "Las acciones que se realizan dentro del sitio web para mejorar su posicionamiento, como optimizar el contenido, la estructura y la velocidad de carga.",
    "letra": "S",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "SEO Técnico",
    "slug": "seo-tecnico",
    "definicion": "Las acciones que se enfocan en optimizar los aspectos técnicos de un sitio web para que sea más fácil de rastrear e indexar por los motores de búsqueda.",
    "letra": "S",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "SERP (Search Engine Results Page)",
    "slug": "serp-search-engine-results-page",
    "definicion": "La página de resultados de búsqueda que muestra un motor de búsqueda en respuesta a una consulta de un usuario.",
    "letra": "S",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Short tail keywords",
    "slug": "short-tail-keywords",
    "definicion": "Son palabras clave o frases cortas y generales que tienen un alto volumen de búsqueda, pero también un alto nivel de competencia. Optimizar tu contenido únicamente para short tail keywords puede ser difícil, ya que hay mucha competencia. Es recomendable utilizar una combinación de short tail keywords y long tail keywords en tu estrategia SEO.",
    "letra": "S",
    "categoria": "onpage",
    "destacado": false
  },
  {
    "termino": "Sitemap",
    "slug": "sitemap",
    "definicion": "Un archivo XML que contiene un listado de todas las páginas web de un sitio, facilitando su indexación por parte de los motores de búsqueda.",
    "letra": "S",
    "categoria": "tecnico",
    "destacado": false
  },
  {
    "termino": "Tasa de rebote (Bounce Rate)",
    "slug": "tasa-de-rebote-bounce-rate",
    "definicion": "La tasa de rebote es el porcentaje de usuarios que abandonan un sitio web después de ver solo una página. Una alta tasa de rebote puede ser una señal de que tu sitio web tiene problemas de UX o contenido.",
    "letra": "T",
    "categoria": "metricas",
    "destacado": false
  },
  {
    "termino": "Ubersuggest",
    "slug": "ubersuggest",
    "definicion": "Ubersuggest es una herramienta SEO gratuita de Neil Patel que ofrece investigación de palabras clave, análisis de la competencia, auditorías de sitios y seguimiento de backlinks. Es una buena opción para principiantes o aquellos con un presupuesto ajustado, pero no tiene todas las funciones de las herramientas SEO pagas.",
    "letra": "U",
    "categoria": "herramientas",
    "destacado": false
  },
  {
    "termino": "Usabilidad",
    "slug": "usabilidad",
    "definicion": "La usabilidad se refiere a la facilidad con la que los usuarios pueden navegar y usar un sitio web. Un sitio web usable debe ser fácil de entender, intuitivo y accesible para todos los usuarios.",
    "letra": "U",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "Velocidad del sitio",
    "slug": "velocidad-del-sitio",
    "definicion": "La rapidez con la que se cargan las páginas web de un sitio. Una mayor velocidad del sitio mejora la experiencia del usuario y el SEO.",
    "letra": "V",
    "categoria": "basico",
    "destacado": false
  },
  {
    "termino": "White-hat SEO",
    "slug": "white-hat-seo",
    "definicion": "Son técnicas de optimización de motores de búsqueda que se centran en crear contenido valioso y de alta calidad, mejorar la estructura y la experiencia de usuario de tu sitio web, y seguir las directrices de los motores de búsqueda. El white hat SEO es la forma recomendada de optimizar tu sitio web para los motores de búsqueda.",
    "letra": "W",
    "categoria": "offpage",
    "destacado": false
  }
]

async function run() {
  const payload = await getPayload({ config })
  console.log('--- Iniciando Seed del Glosario SEO (' + TERMINOS.length + ' términos) ---')

  let creados = 0
  let actualizados = 0

  for (const t of TERMINOS) {
    const existing = await payload.find({
      collection: 'glosario',
      where: { slug: { equals: t.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'glosario',
        id: existing.docs[0].id,
        context: { disableRevalidate: true },
        data: {
          termino: t.termino,
          definicion: t.definicion,
          letra: t.letra,
          categoria: t.categoria,
          destacado: t.destacado ?? false,
        },
      })
      actualizados++
    } else {
      await payload.create({
        collection: 'glosario',
        context: { disableRevalidate: true },
        data: {
          termino: t.termino,
          slug: t.slug,
          definicion: t.definicion,
          letra: t.letra,
          categoria: t.categoria,
          destacado: t.destacado ?? false,
        },
      })
      creados++
    }
  }

  console.log('✅ Seed del Glosario finalizado: ' + creados + ' creados, ' + actualizados + ' actualizados. Total: ' + TERMINOS.length + ' términos.')
}

run().catch(console.error)
