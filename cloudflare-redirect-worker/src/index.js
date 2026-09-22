// Cloudflare Worker para Redirecciones 301 aprendoseo.com -> aprendoclub.com
// Generado automáticamente con el 100% de las URLs mapeadas y Catch-All dinámico

const REDIRECTS = {
  "/reto": "/programas/reto",
  "/reto/": "/programas/reto",
  "/curso-seo-con-ia": "/programas/taller-seo-con-ia",
  "/curso-seo-con-ia/": "/programas/taller-seo-con-ia",
  "/diplomado": "/programas/diplomado",
  "/diplomado/": "/programas/diplomado",
  "/seo-basico/chat-gpt-seo": "/seo-basico/chat-gpt-seo",
  "/seo-basico/chat-gpt-seo/": "/seo-basico/chat-gpt-seo",
  "/seo-basico/como-aparecer-en-google": "/seo-basico/como-aparecer-en-google",
  "/seo-basico/como-aparecer-en-google/": "/seo-basico/como-aparecer-en-google",
  "/seo-basico/como-aprender-seo-desde-cero": "/seo-basico/como-aprender-seo-desde-cero",
  "/seo-basico/como-aprender-seo-desde-cero/": "/seo-basico/como-aprender-seo-desde-cero",
  "/aprender-seo/aprender-seo-desde-cero": "/seo-basico/como-aprender-seo-desde-cero",
  "/aprender-seo/aprender-seo-desde-cero/": "/seo-basico/como-aprender-seo-desde-cero",
  "/seo-basico/como-conseguir-clientes-si-eres-consultor-seo": "/seo-basico/como-conseguir-clientes-si-eres-consultor-seo",
  "/seo-basico/como-conseguir-clientes-si-eres-consultor-seo/": "/seo-basico/como-conseguir-clientes-si-eres-consultor-seo",
  "/seo-basico/como-construir-backlinks": "/seo-basico/como-construir-backlinks",
  "/seo-basico/como-construir-backlinks/": "/seo-basico/como-construir-backlinks",
  "/seo-basico/como-funciona-el-seo-para-posicionar-tu-web": "/seo-basico/como-funciona-el-seo-para-posicionar-tu-web",
  "/seo-basico/como-funciona-el-seo-para-posicionar-tu-web/": "/seo-basico/como-funciona-el-seo-para-posicionar-tu-web",
  "/seo-basico/como-hacer-seo-en-latinoamerica": "/seo-basico/como-hacer-seo-en-latinoamerica",
  "/seo-basico/como-hacer-seo-en-latinoamerica/": "/seo-basico/como-hacer-seo-en-latinoamerica",
  "/seo-basico/como-pasar-de-seo-in-house-a-seo-freelancer": "/seo-basico/como-pasar-de-seo-in-house-a-seo-freelancer",
  "/seo-basico/como-pasar-de-seo-in-house-a-seo-freelancer/": "/seo-basico/como-pasar-de-seo-in-house-a-seo-freelancer",
  "/seo-basico/como-posicionarse-en-google": "/seo-basico/como-posicionarse-en-google",
  "/seo-basico/como-posicionarse-en-google/": "/seo-basico/como-posicionarse-en-google",
  "/seo-basico/como-vivir-del-seo": "/seo-basico/como-vivir-del-seo",
  "/seo-basico/como-vivir-del-seo/": "/seo-basico/como-vivir-del-seo",
  "/seo-basico/consejos-seo": "/seo-basico/consejos-seo",
  "/seo-basico/consejos-seo/": "/seo-basico/consejos-seo",
  "/seo-basico/contenido-seo": "/seo-basico/contenido-seo",
  "/seo-basico/contenido-seo/": "/seo-basico/contenido-seo",
  "/seo-basico/diccionario-seo": "/seo-basico/diccionario-seo",
  "/seo-basico/diccionario-seo/": "/seo-basico/diccionario-seo",
  "/seo-basico/elementos-de-una-pagina-web": "/seo-basico/elementos-de-una-pagina-web",
  "/seo-basico/elementos-de-una-pagina-web/": "/seo-basico/elementos-de-una-pagina-web",
  "/seo-basico/errores-seo": "/seo-basico/errores-seo",
  "/seo-basico/errores-seo/": "/seo-basico/errores-seo",
  "/seo-basico/estrategia-seo": "/seo-basico/estrategia-seo",
  "/seo-basico/estrategia-seo/": "/seo-basico/estrategia-seo",
  "/seo-basico/factores-del-seo-on-page": "/seo-basico/factores-del-seo-on-page",
  "/seo-basico/factores-del-seo-on-page/": "/seo-basico/factores-del-seo-on-page",
  "/seo-basico/formas-de-mejorar-el-seo": "/seo-basico/formas-de-mejorar-el-seo",
  "/seo-basico/formas-de-mejorar-el-seo/": "/seo-basico/formas-de-mejorar-el-seo",
  "/seo-basico/geo-cambiando-el-seo": "/seo-basico/geo-cambiando-el-seo",
  "/seo-basico/geo-cambiando-el-seo/": "/seo-basico/geo-cambiando-el-seo",
  "/seo-basico/intencion-de-busqueda-en-seo-que-es-y-como-funciona": "/seo-basico/intencion-de-busqueda-en-seo-que-es-y-como-funciona",
  "/seo-basico/intencion-de-busqueda-en-seo-que-es-y-como-funciona/": "/seo-basico/intencion-de-busqueda-en-seo-que-es-y-como-funciona",
  "/seo-basico/marketing-digital": "/seo-basico/marketing-digital",
  "/seo-basico/marketing-digital/": "/seo-basico/marketing-digital",
  "/seo-basico/metricas-seo": "/seo-basico/metricas-seo",
  "/seo-basico/metricas-seo/": "/seo-basico/metricas-seo",
  "/seo-basico/motor-de-busqueda": "/seo-basico/motor-de-busqueda",
  "/seo-basico/motor-de-busqueda/": "/seo-basico/motor-de-busqueda",
  "/seo-basico/palabras-clave": "/seo-basico/palabras-clave",
  "/seo-basico/palabras-clave/": "/seo-basico/palabras-clave",
  "/seo-basico/que-es-eeat": "/seo-basico/que-es-eeat",
  "/seo-basico/que-es-eeat/": "/seo-basico/que-es-eeat",
  "/seo-basico/que-es-la-redaccion-seo": "/seo-basico/que-es-la-redaccion-seo",
  "/seo-basico/que-es-la-redaccion-seo/": "/seo-basico/que-es-la-redaccion-seo",
  "/seo-basico/que-es-seo": "/seo-basico/que-es-seo",
  "/seo-basico/que-es-seo/": "/seo-basico/que-es-seo",
  "/seo-basico/que-es-una-url": "/seo-basico/que-es-una-url",
  "/seo-basico/que-es-una-url/": "/seo-basico/que-es-una-url",
  "/seo-basico/que-son-las-palabras-clave-lsi": "/seo-basico/que-son-las-palabras-clave-lsi",
  "/seo-basico/que-son-las-palabras-clave-lsi/": "/seo-basico/que-son-las-palabras-clave-lsi",
  "/seo-basico/seo-para-ecommerce": "/seo-basico/seo-para-ecommerce",
  "/seo-basico/seo-para-ecommerce/": "/seo-basico/seo-para-ecommerce",
  "/seo-basico/seo-vs-sem": "/seo-basico/seo-vs-sem",
  "/seo-basico/seo-vs-sem/": "/seo-basico/seo-vs-sem",
  "/seo-basico/serp-tipos-de-resultados-de-busqueda": "/seo-basico/serp-tipos-de-resultados-de-busqueda",
  "/seo-basico/serp-tipos-de-resultados-de-busqueda/": "/seo-basico/serp-tipos-de-resultados-de-busqueda",
  "/seo-basico/titulo-seo": "/seo-basico/titulo-seo",
  "/seo-basico/titulo-seo/": "/seo-basico/titulo-seo",
  "/empieza-en-seo/agencia-seo-vs-seo-freelanc": "/empieza-en-seo/agencia-seo-vs-seo-freelanc",
  "/empieza-en-seo/agencia-seo-vs-seo-freelanc/": "/empieza-en-seo/agencia-seo-vs-seo-freelanc",
  "/empieza-en-seo/como-aprender-seo-en-mexico": "/empieza-en-seo/como-aprender-seo-en-mexico",
  "/empieza-en-seo/como-aprender-seo-en-mexico/": "/empieza-en-seo/como-aprender-seo-en-mexico",
  "/empieza-en-seo/como-aprender-seo-sin-conocimientos-previos": "/empieza-en-seo/como-aprender-seo-sin-conocimientos-previos",
  "/empieza-en-seo/como-aprender-seo-sin-conocimientos-previos/": "/empieza-en-seo/como-aprender-seo-sin-conocimientos-previos",
  "/empieza-en-seo/como-negociar-un-salario-en-seo": "/empieza-en-seo/como-negociar-un-salario-en-seo",
  "/empieza-en-seo/como-negociar-un-salario-en-seo/": "/empieza-en-seo/como-negociar-un-salario-en-seo",
  "/empieza-en-seo/como-posicionar-mi-tienda-online-desde-cero": "/empieza-en-seo/como-posicionar-mi-tienda-online-desde-cero",
  "/empieza-en-seo/como-posicionar-mi-tienda-online-desde-cero/": "/empieza-en-seo/como-posicionar-mi-tienda-online-desde-cero",
  "/empieza-en-seo/habilidades-para-ser-un-especialista-seo": "/empieza-en-seo/habilidades-para-ser-un-especialista-seo",
  "/empieza-en-seo/habilidades-para-ser-un-especialista-seo/": "/empieza-en-seo/habilidades-para-ser-un-especialista-seo",
  "/empieza-en-seo/portafolio-seo": "/empieza-en-seo/portafolio-seo",
  "/empieza-en-seo/portafolio-seo/": "/empieza-en-seo/portafolio-seo",
  "/empieza-en-seo/posicionamiento-web-en-google": "/empieza-en-seo/posicionamiento-web-en-google",
  "/empieza-en-seo/posicionamiento-web-en-google/": "/empieza-en-seo/posicionamiento-web-en-google",
  "/empieza-en-seo/que-es-el-posicionamiento-web-seo": "/empieza-en-seo/que-es-el-posicionamiento-web-seo",
  "/empieza-en-seo/que-es-el-posicionamiento-web-seo/": "/empieza-en-seo/que-es-el-posicionamiento-web-seo",
  "/empieza-en-seo/que-es-un-seo-manager": "/empieza-en-seo/que-es-un-seo-manager",
  "/empieza-en-seo/que-es-un-seo-manager/": "/empieza-en-seo/que-es-un-seo-manager",
  "/empieza-en-seo/que-hace-un-especialista-seo": "/empieza-en-seo/que-hace-un-especialista-seo",
  "/empieza-en-seo/que-hace-un-especialista-seo/": "/empieza-en-seo/que-hace-un-especialista-seo",
  "/empieza-en-seo/que-hay-que-estudiar-para-ser-seo": "/empieza-en-seo/que-hay-que-estudiar-para-ser-seo",
  "/empieza-en-seo/que-hay-que-estudiar-para-ser-seo/": "/empieza-en-seo/que-hay-que-estudiar-para-ser-seo",
  "/empieza-en-seo/tecnicas-de-seo": "/empieza-en-seo/tecnicas-de-seo",
  "/empieza-en-seo/tecnicas-de-seo/": "/empieza-en-seo/tecnicas-de-seo",
  "/empieza-en-seo/un-seo-necesita-saber-programar": "/empieza-en-seo/un-seo-necesita-saber-programar",
  "/empieza-en-seo/un-seo-necesita-saber-programar/": "/empieza-en-seo/un-seo-necesita-saber-programar",
  "/seo-onpage/analisis-de-competidores": "/seo-onpage/analisis-de-competidores",
  "/seo-onpage/analisis-de-competidores/": "/seo-onpage/analisis-de-competidores",
  "/seo-onpage/como-funciona-una-pagina-web": "/seo-onpage/como-funciona-una-pagina-web",
  "/seo-onpage/como-funciona-una-pagina-web/": "/seo-onpage/como-funciona-una-pagina-web",
  "/seo-onpage/copywriting-seo": "/seo-onpage/copywriting-seo",
  "/seo-onpage/copywriting-seo/": "/seo-onpage/copywriting-seo",
  "/seo-onpage/densidad-de-palabras-clave": "/seo-onpage/densidad-de-palabras-clave",
  "/seo-onpage/densidad-de-palabras-clave/": "/seo-onpage/densidad-de-palabras-clave",
  "/seo-onpage/descubre-el-seo-on-page-que-es-y-para-que-sirve": "/seo-onpage/descubre-el-seo-on-page-que-es-y-para-que-sirve",
  "/seo-onpage/descubre-el-seo-on-page-que-es-y-para-que-sirve/": "/seo-onpage/descubre-el-seo-on-page-que-es-y-para-que-sirve",
  "/seo-onpage/enlaces-internos-seo": "/seo-onpage/enlaces-internos-seo",
  "/seo-onpage/enlaces-internos-seo/": "/seo-onpage/enlaces-internos-seo",
  "/seo-onpage/estrategias-de-linkbuilding": "/seo-onpage/estrategias-de-linkbuilding",
  "/seo-onpage/estrategias-de-linkbuilding/": "/seo-onpage/estrategias-de-linkbuilding",
  "/seo-onpage/landing-page-estructura": "/seo-onpage/landing-page-estructura",
  "/seo-onpage/landing-page-estructura/": "/seo-onpage/landing-page-estructura",
  "/seo-onpage/planificador-de-palabras-clave-seo": "/seo-onpage/planificador-de-palabras-clave-seo",
  "/seo-onpage/planificador-de-palabras-clave-seo/": "/seo-onpage/planificador-de-palabras-clave-seo",
  "/seo-onpage/que-es-la-canibalizacion-de-las-palabras-clave": "/seo-onpage/que-es-la-canibalizacion-de-las-palabras-clave",
  "/seo-onpage/que-es-la-canibalizacion-de-las-palabras-clave/": "/seo-onpage/que-es-la-canibalizacion-de-las-palabras-clave",
  "/seo-onpage/que-es-un-informe-seo-todo-lo-que-debes-saber": "/seo-onpage/que-es-un-informe-seo-todo-lo-que-debes-saber",
  "/seo-onpage/que-es-un-informe-seo-todo-lo-que-debes-saber/": "/seo-onpage/que-es-un-informe-seo-todo-lo-que-debes-saber",
  "/seo-onpage/rich-snippets-seo": "/seo-onpage/rich-snippets-seo",
  "/seo-onpage/rich-snippets-seo/": "/seo-onpage/rich-snippets-seo",
  "/herramientas-seo/como-ver-el-posicionamiento-de-su-sitio-web-en-google": "/herramientas-seo/como-ver-el-posicionamiento-de-su-sitio-web-en-google",
  "/herramientas-seo/como-ver-el-posicionamiento-de-su-sitio-web-en-google/": "/herramientas-seo/como-ver-el-posicionamiento-de-su-sitio-web-en-google",
  "/herramientas-seo/getlinko": "/herramientas-seo/getlinko",
  "/herramientas-seo/getlinko/": "/herramientas-seo/getlinko",
  "/herramientas-seo/herramientas-palabras-claves": "/herramientas-seo/herramientas-palabras-claves",
  "/herramientas-seo/herramientas-palabras-claves/": "/herramientas-seo/herramientas-palabras-claves",
  "/herramientas-seo/mejores-herramientas-seo": "/herramientas-seo/mejores-herramientas-seo",
  "/herramientas-seo/mejores-herramientas-seo/": "/herramientas-seo/mejores-herramientas-seo",
  "/autor/arianna-lupi": "/autor/arianna-lupi",
  "/autor/arianna-lupi/": "/autor/arianna-lupi",
  "/certificaciones": "/autor/arianna-lupi",
  "/certificaciones/": "/autor/arianna-lupi",
  "/autor/diana-rodriguez": "/autor/diana-rodriguez",
  "/autor/diana-rodriguez/": "/autor/diana-rodriguez",
  "/autor/juan-angulo": "/autor/juan-angulo",
  "/autor/juan-angulo/": "/autor/juan-angulo",
  "/seo-tecnico": "/seo-tecnico",
  "/seo-tecnico/": "/seo-tecnico",
  "/seo-tecnico/que-es": "/seo-tecnico/que-es",
  "/seo-tecnico/que-es/": "/seo-tecnico/que-es",
  "/diplomado/herramientas": "/herramientas-seo",
  "/diplomado/herramientas/": "/herramientas-seo",
  "/herramientas-seo": "/herramientas-seo",
  "/herramientas-seo/": "/herramientas-seo",
  "/links": "/links",
  "/links/": "/links",
  "/comunidad/testimonios": "/testimonios",
  "/comunidad/testimonios/": "/testimonios",
  "/seo-basico": "/seo-basico",
  "/seo-basico/": "/seo-basico",
  "/seo-onpage": "/seo-onpage",
  "/seo-onpage/": "/seo-onpage",
  "/aprende": "/blog",
  "/aprende/": "/blog",
  "/academia-seo": "/quienes-somos",
  "/academia-seo/": "/quienes-somos",
  "/cursos-seo/curso-seo-alicante": "/cursos-seo/alicante",
  "/cursos-seo/curso-seo-alicante/": "/cursos-seo/alicante",
  "/cursos-seo/curso-seo-bilbao": "/cursos-seo/bilbao",
  "/cursos-seo/curso-seo-bilbao/": "/cursos-seo/bilbao",
  "/cursos-seo/curso-seo-caracas": "/cursos-seo/caracas",
  "/cursos-seo/curso-seo-caracas/": "/cursos-seo/caracas",
  "/cursos-seo/curso-seo-cdmx": "/cursos-seo/cdmx",
  "/cursos-seo/curso-seo-cdmx/": "/cursos-seo/cdmx",
  "/cursos-seo/curso-seo-guadalajara": "/cursos-seo/guadalajara",
  "/cursos-seo/curso-seo-guadalajara/": "/cursos-seo/guadalajara",
  "/cursos-seo/curso-seo-malaga": "/cursos-seo/malaga",
  "/cursos-seo/curso-seo-malaga/": "/cursos-seo/malaga",
  "/cursos-seo/curso-seo-maracaibo": "/cursos-seo/maracaibo",
  "/cursos-seo/curso-seo-maracaibo/": "/cursos-seo/maracaibo",
  "/cursos-seo/curso-seo-puebla": "/cursos-seo/puebla",
  "/cursos-seo/curso-seo-puebla/": "/cursos-seo/puebla",
  "/cursos-seo/curso-seo-toledo": "/cursos-seo/toledo",
  "/cursos-seo/curso-seo-toledo/": "/cursos-seo/toledo",
  "/cursos-seo/curso-seo-valencia": "/cursos-seo/valencia",
  "/cursos-seo/curso-seo-valencia/": "/cursos-seo/valencia",
  "/curso-seo-rdss": "/programas/curso-seo-rdss",
  "/curso-seo-rdss/": "/programas/curso-seo-rdss",
  "/curso-basico-de-seo": "/programas/curso-basico-de-seo",
  "/curso-basico-de-seo/": "/programas/curso-basico-de-seo",
  "/autor/ibraim-zayed": "/autor/ibraim-zayed",
  "/autor/ibraim-zayed/": "/autor/ibraim-zayed",
  "/autor/veronica-romero": "/autor/veronica-romero",
  "/autor/veronica-romero/": "/autor/veronica-romero",
  "/contacto": "/contacto",
  "/contacto/": "/contacto",
  "/glosario": "/glosario",
  "/glosario/": "/glosario",
  "/politica-privacidad": "/politica-privacidad",
  "/politica-privacidad/": "/politica-privacidad",
  "/politica-reembolso": "/politica-reembolso",
  "/politica-reembolso/": "/politica-reembolso",
  "/aviso-legal": "/aviso-legal",
  "/aviso-legal/": "/aviso-legal",
  "/terminos-condiciones": "/terminos-condiciones",
  "/terminos-condiciones/": "/terminos-condiciones",
  "/recursos/guia-seo-para-principiantes": "/programas/curso-basico-de-seo",
  "/recursos/guia-seo-para-principiantes/": "/programas/curso-basico-de-seo",
  "/seo-con-ia/evento": "/programas/taller-seo-con-ia",
  "/seo-con-ia/evento/": "/programas/taller-seo-con-ia",
  "/seo-cursos": "/seo-cursos",
  "/seo-cursos/": "/seo-cursos",
  "/seo-cursos/mejores-certificaciones-meta-ads": "/seo-cursos/mejores-certificaciones-meta-ads",
  "/seo-cursos/mejores-certificaciones-meta-ads/": "/seo-cursos/mejores-certificaciones-meta-ads",
  "/seo-cursos/mejores-cursos-seo": "/seo-cursos/mejores-cursos-seo",
  "/seo-cursos/mejores-cursos-seo/": "/seo-cursos/mejores-cursos-seo",
  "/aprender-seo/como-aprender-seo-sin-conocimientos-previos-n3sba": "/empieza-en-seo/como-aprender-seo-sin-conocimientos-previos",
  "/aprender-seo/como-aprender-seo-sin-conocimientos-previos-n3sba/": "/empieza-en-seo/como-aprender-seo-sin-conocimientos-previos",
  "/aprender-seo/cuanto-gana-un-seo": "/empieza-en-seo/cuanto-gana-un-seo",
  "/aprender-seo/cuanto-gana-un-seo/": "/empieza-en-seo/cuanto-gana-un-seo",
  "/aprender-seo/funcion-especialista-seo": "/empieza-en-seo/funcion-especialista-seo",
  "/aprender-seo/funcion-especialista-seo/": "/empieza-en-seo/funcion-especialista-seo",
  "/aprender-seo/trabajar-como-seo": "/empieza-en-seo/trabajar-como-seo",
  "/aprender-seo/trabajar-como-seo/": "/empieza-en-seo/trabajar-como-seo",
  "/": "/",
  "": "/"
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const lowerPath = pathname.toLowerCase();
    const cleanLower = lowerPath.replace(/\/+$/, '') || '/';

    // 1. Coincidencia directa en diccionario
    const match = REDIRECTS[cleanLower] || REDIRECTS[lowerPath] || REDIRECTS[pathname];
    if (match) {
      const target = new URL(match, 'https://www.aprendoclub.com');
      target.search = url.search;
      return Response.redirect(target.toString(), 301);
    }

    // 2. Patrones específicos de URLs legadas:
    // A) Ciudades: /cursos-seo/curso-seo-:ciudad -> /cursos-seo/:ciudad
    if (cleanLower.startsWith('/cursos-seo/curso-seo-')) {
      const city = cleanLower.replace('/cursos-seo/curso-seo-', '');
      return Response.redirect(`https://www.aprendoclub.com/cursos-seo/${city}${url.search}`, 301);
    }
    if (cleanLower.startsWith('/cursos-seos-con-ia/curso-seo-')) {
      const city = cleanLower.replace('/cursos-seos-con-ia/curso-seo-', '');
      return Response.redirect(`https://www.aprendoclub.com/cursos-seo/${city}${url.search}`, 301);
    }
    if (cleanLower.startsWith('/cursos-seos-con-ia/')) {
      const city = cleanLower.replace('/cursos-seos-con-ia/', '');
      return Response.redirect(`https://www.aprendoclub.com/cursos-seo/${city}${url.search}`, 301);
    }

    // B) Categoría legacy aprender-seo: /aprender-seo/:slug -> /empieza-en-seo/:slug
    if (cleanLower.startsWith('/aprender-seo/')) {
      const slug = cleanLower.replace('/aprender-seo/', '');
      return Response.redirect(`https://www.aprendoclub.com/empieza-en-seo/${slug}${url.search}`, 301);
    }

    // C) /seo-on-page/:slug -> /seo-onpage/:slug
    if (cleanLower.startsWith('/seo-on-page/')) {
      const slug = cleanLower.replace('/seo-on-page/', '');
      return Response.redirect(`https://www.aprendoclub.com/seo-onpage/${slug}${url.search}`, 301);
    }

    // D) /seo-herramientas/:slug -> /herramientas-seo/:slug
    if (cleanLower.startsWith('/seo-herramientas/')) {
      const slug = cleanLower.replace('/seo-herramientas/', '');
      return Response.redirect(`https://www.aprendoclub.com/herramientas-seo/${slug}${url.search}`, 301);
    }

    // 3. Comodín Catch-All para cualquier otra ruta o la raíz
    const targetUrl = new URL(url.pathname, 'https://www.aprendoclub.com');
    targetUrl.search = url.search;
    return Response.redirect(targetUrl.toString(), 301);
  }
};
