#!/usr/bin/env node
// One-off batch converter: public/**/*.{jpg,jpeg,png} -> sibling .avif + .webp
// Uses the sharp binary already present in node_modules (no new deps).
// Excludes public/opengraph.png (kept as PNG for OG crawler compatibility).
// Idempotent: skips a source if its .avif sibling already exists, unless --force is passed.

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const FORCE = process.argv.includes("--force");
const EXCLUDE = new Set([path.join(PUBLIC_DIR, "opengraph.png")]);
const EXTS = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTS.has(ext) && !EXCLUDE.has(full)) {
        out.push(full);
      }
    }
  }
  return out;
}

function sizeOf(p) {
  try {
    return fs.statSync(p).size;
  } catch {
    return 0;
  }
}

async function convertOne(srcPath) {
  const ext = path.extname(srcPath);
  const base = srcPath.slice(0, -ext.length);
  const avifPath = `${base}.avif`;
  const webpPath = `${base}.webp`;

  const originalBytes = sizeOf(srcPath);
  const skip = !FORCE && fs.existsSync(avifPath);

  if (skip) {
    return {
      src: srcPath,
      originalBytes,
      avifBytes: sizeOf(avifPath),
      skipped: true,
    };
  }

  const image = sharp(srcPath);
  await image.clone().avif({ quality: 55 }).toFile(avifPath);
  await image.clone().webp({ quality: 80 }).toFile(webpPath);

  return {
    src: srcPath,
    originalBytes,
    avifBytes: sizeOf(avifPath),
    skipped: false,
  };
}

async function main() {
  const sources = walk(PUBLIC_DIR).sort((a, b) => sizeOf(b) - sizeOf(a));

  const results = [];
  for (const src of sources) {
    const result = await convertOne(src);
    results.push(result);
    const rel = path.relative(PUBLIC_DIR, result.src);
    const savedPct = result.originalBytes
      ? (
          ((result.originalBytes - result.avifBytes) / result.originalBytes) *
          100
        ).toFixed(1)
      : "0.0";
    const tag = result.skipped ? "SKIP " : "DONE ";
    console.log(
      `${tag}${rel.padEnd(40)} ${result.originalBytes.toString().padStart(8)} -> ${result.avifBytes
        .toString()
        .padStart(8)} bytes (-${savedPct}%)`
    );
  }

  const totalOriginal = results.reduce((sum, r) => sum + r.originalBytes, 0);
  const totalAvif = results.reduce((sum, r) => sum + r.avifBytes, 0);
  const savedBytes = totalOriginal - totalAvif;
  const savedPct = totalOriginal
    ? ((savedBytes / totalOriginal) * 100).toFixed(1)
    : "0.0";

  console.log("");
  console.log("=== Resumen conversión AVIF ===");
  console.log(`Fuentes procesadas: ${results.length}`);
  console.log(`Total original:     ${totalOriginal.toLocaleString()} bytes`);
  console.log(`Total AVIF:         ${totalAvif.toLocaleString()} bytes`);
  console.log(`Ahorro:             ${savedBytes.toLocaleString()} bytes (${savedPct}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
