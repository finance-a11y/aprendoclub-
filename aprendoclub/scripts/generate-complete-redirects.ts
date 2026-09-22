import fs from 'fs'
import path from 'path'

function run() {
  const deliverablesDir = path.resolve(process.cwd(), '../.planning/deliverables/v1.8')
  const baseCsvPath = path.join(deliverablesDir, 'redirects-phase33-cloudflare.csv')
  const baseContent = fs.readFileSync(baseCsvPath, 'utf8')
  const baseLines = baseContent.split('\n').filter((l) => l.trim().length > 0)

  // Skip header: source_url,target_url,status_code,preserve_query_string
  const specificRules: { src: string; dst: string }[] = []
  for (let i = 1; i < baseLines.length; i++) {
    const parts = baseLines[i].split(',')
    if (parts.length >= 2) {
      specificRules.push({
        src: parts[0].trim(),
        dst: parts[1].trim(),
      })
    }
  }

  console.log(`Reglas base cargadas: ${specificRules.length}`)

  // Deduplicar y normalizar
  const rulesMap = new Map<string, string>()
  for (const r of specificRules) {
    rulesMap.set(r.src, r.dst)
  }

  // Asegurar que tengamos las dos versiones de dominio: con www y sin www
  const allDomainRules: { src: string; dst: string; subpath: boolean; preserveSuffix: boolean }[] = []

  for (const [src, dst] of rulesMap.entries()) {
    const pathOnly = src.replace(/^https?:\/\/(www\.)?aprendoseo\.com/, '')
    allDomainRules.push({
      src: `https://www.aprendoseo.com${pathOnly}`,
      dst,
      subpath: false,
      preserveSuffix: false,
    })
    allDomainRules.push({
      src: `https://aprendoseo.com${pathOnly}`,
      dst,
      subpath: false,
      preserveSuffix: false,
    })
  }

  // Agregar reglas raíz / comodín para atrapar cualquier ruta no mapeada
  // En Cloudflare Bulk Redirects con SUBPATH_MATCHING=true y PRESERVE_PATH_SUFFIX=true
  // cualquier URL que no coincida con una regla específica caerá aquí y preservará la ruta hacia aprendoclub.com
  allDomainRules.push({
    src: 'https://www.aprendoseo.com/',
    dst: 'https://www.aprendoclub.com/',
    subpath: true,
    preserveSuffix: true,
  })
  allDomainRules.push({
    src: 'https://aprendoseo.com/',
    dst: 'https://www.aprendoclub.com/',
    subpath: true,
    preserveSuffix: true,
  })
  allDomainRules.push({
    src: 'https://www.aprendoseo.com',
    dst: 'https://www.aprendoclub.com',
    subpath: false,
    preserveSuffix: false,
  })
  allDomainRules.push({
    src: 'https://aprendoseo.com',
    dst: 'https://www.aprendoclub.com',
    subpath: false,
    preserveSuffix: false,
  })

  // 1. Archivo para Cloudflare Bulk Redirects (SIN HEADER, formato 7 columnas oficial)
  // Formato: <SOURCE_URL>,<TARGET_URL>,<STATUS_CODE>,<PRESERVE_QUERY_STRING>,<INCLUDE_SUBDOMAINS>,<SUBPATH_MATCHING>,<PRESERVE_PATH_SUFFIX>
  const cloudflareNoHeaderLines: string[] = allDomainRules.map((r) => {
    return `${r.src},${r.dst},301,true,false,${r.subpath ? 'true' : 'false'},${r.preserveSuffix ? 'true' : 'false'}`
  })

  const noHeaderPath = path.join(deliverablesDir, 'redirects-phase33-cloudflare-noheader.csv')
  fs.writeFileSync(noHeaderPath, cloudflareNoHeaderLines.join('\n') + '\n', 'utf8')
  console.log(`Guardado ${noHeaderPath} (${cloudflareNoHeaderLines.length} líneas)`)

  // 2. Archivo Both Domains con Header
  const bothDomainsWithHeaderLines = [
    'source_url,target_url,status_code,preserve_query_string,include_subdomains,subpath_matching,preserve_path_suffix',
    ...cloudflareNoHeaderLines,
  ]
  const bothDomainsPath = path.join(deliverablesDir, 'redirects-phase33-cloudflare-both-domains.csv')
  fs.writeFileSync(bothDomainsPath, bothDomainsWithHeaderLines.join('\n') + '\n', 'utf8')
  console.log(`Guardado ${bothDomainsPath} (${bothDomainsWithHeaderLines.length} líneas)`)

  console.log(`\nGeneración de archivos CSV de redirecciones completada con éxito.`)
}

run()
