import fs from 'fs'
import path from 'path'

function generate() {
  const csvPath = path.resolve(process.cwd(), '../.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv')
  const lines = fs.readFileSync(csvPath, 'utf8').split('\n').filter(Boolean)

  const dict: Record<string, string> = {}

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',')
    if (parts.length >= 2) {
      const srcUrl = parts[0].trim()
      const dstUrl = parts[1].trim()
      const srcPath = srcUrl.replace(/^https?:\/\/(www\.)?aprendoseo\.com/, '').replace(/\/+$/, '') || '/'
      const dstPath = dstUrl.replace(/^https?:\/\/(www\.)?aprendoclub\.com/, '').replace(/\/+$/, '') || '/'

      dict[srcPath.toLowerCase()] = dstPath
      if (srcPath !== '/') {
        dict[srcPath.toLowerCase() + '/'] = dstPath
      }
    }
  }

  // Ensure root
  dict['/'] = '/'
  dict[''] = '/'

  const workerDir = path.resolve(process.cwd(), '../cloudflare-redirect-worker')
  fs.mkdirSync(path.join(workerDir, 'src'), { recursive: true })

  const wranglerToml = `name = "aprendoseo-redirects"
main = "src/index.js"
compatibility_date = "2026-09-22"
account_id = "2440cecb1195a265bd32c8f80f465977"

routes = [
  { pattern = "aprendoseo.com/*", zone_id = "038d39d6afd8fc39815e9dedaaacc3a6" },
  { pattern = "www.aprendoseo.com/*", zone_id = "038d39d6afd8fc39815e9dedaaacc3a6" }
]
`
  fs.writeFileSync(path.join(workerDir, 'wrangler.toml'), wranglerToml, 'utf8')

  const workerJs = `// Cloudflare Worker para Redirecciones 301 aprendoseo.com -> aprendoclub.com
// Generado automáticamente con el 100% de las URLs mapeadas y Catch-All dinámico

const REDIRECTS = ${JSON.stringify(dict, null, 2)};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const lowerPath = pathname.toLowerCase();
    const cleanLower = lowerPath.replace(/\\/+$/, '') || '/';

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
      return Response.redirect(\`https://www.aprendoclub.com/cursos-seo/\${city}\${url.search}\`, 301);
    }
    if (cleanLower.startsWith('/cursos-seos-con-ia/curso-seo-')) {
      const city = cleanLower.replace('/cursos-seos-con-ia/curso-seo-', '');
      return Response.redirect(\`https://www.aprendoclub.com/cursos-seo/\${city}\${url.search}\`, 301);
    }
    if (cleanLower.startsWith('/cursos-seos-con-ia/')) {
      const city = cleanLower.replace('/cursos-seos-con-ia/', '');
      return Response.redirect(\`https://www.aprendoclub.com/cursos-seo/\${city}\${url.search}\`, 301);
    }

    // B) Categoría legacy aprender-seo: /aprender-seo/:slug -> /empieza-en-seo/:slug
    if (cleanLower.startsWith('/aprender-seo/')) {
      const slug = cleanLower.replace('/aprender-seo/', '');
      return Response.redirect(\`https://www.aprendoclub.com/empieza-en-seo/\${slug}\${url.search}\`, 301);
    }

    // C) /seo-on-page/:slug -> /seo-onpage/:slug
    if (cleanLower.startsWith('/seo-on-page/')) {
      const slug = cleanLower.replace('/seo-on-page/', '');
      return Response.redirect(\`https://www.aprendoclub.com/seo-onpage/\${slug}\${url.search}\`, 301);
    }

    // D) /seo-herramientas/:slug -> /herramientas-seo/:slug
    if (cleanLower.startsWith('/seo-herramientas/')) {
      const slug = cleanLower.replace('/seo-herramientas/', '');
      return Response.redirect(\`https://www.aprendoclub.com/herramientas-seo/\${slug}\${url.search}\`, 301);
    }

    // 3. Comodín Catch-All para cualquier otra ruta o la raíz
    const targetUrl = new URL(url.pathname, 'https://www.aprendoclub.com');
    targetUrl.search = url.search;
    return Response.redirect(targetUrl.toString(), 301);
  }
};
`
  fs.writeFileSync(path.join(workerDir, 'src/index.js'), workerJs, 'utf8')
  console.log(`Worker generado con ${Object.keys(dict).length} entradas de redirección en ${workerDir}`)
}

generate()
