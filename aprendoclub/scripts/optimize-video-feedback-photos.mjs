import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "/Users/juan/Downloads/Aprendoclub Web Download";
const OUT_DIR = "/private/tmp/claude-501/-Users-juan-Documents-Codigo-Arianna-aprendoclub/0a058caa-a9cf-4113-b3a4-f7cfa63fdeec/scratchpad/photos-optimized";

fs.mkdirSync(OUT_DIR, { recursive: true });

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name) && entry.name !== ".DS_Store") {
      out.push(full);
    }
  }
  return out;
}

async function run() {
  const files = walk(SRC_DIR);
  for (const src of files) {
    const meta = await sharp(src).metadata();
    const isWide = (meta.width ?? 0) > (meta.height ?? 0);
    const maxW = isWide ? 1600 : 900;
    const targetW = Math.min(meta.width ?? maxW, maxW);

    const relDir = path.dirname(path.relative(SRC_DIR, src));
    const outDir = path.join(OUT_DIR, relDir);
    fs.mkdirSync(outDir, { recursive: true });

    const base = path
      .basename(src, path.extname(src))
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const outPath = path.join(outDir, `${base}.webp`);

    await sharp(src).resize({ width: targetW }).webp({ quality: 80 }).toFile(outPath);

    const before = fs.statSync(src).size;
    const after = fs.statSync(outPath).size;
    console.log(`${path.relative(SRC_DIR, src).padEnd(55)} ${before}b -> ${after}b (${targetW}w)`);
  }
}

await run();
