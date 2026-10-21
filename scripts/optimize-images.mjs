/**
 * Converte imagens para .webp otimizado, mantendo o nome do arquivo.
 *
 * Uso: node scripts/optimize-images.mjs <pasta-de-origem> <pasta-de-destino>
 * Exemplo: node scripts/optimize-images.mjs Identidade-HAZE/mockups public/images
 * Texturas e mockups da marca ficam em Identidade-HAZE/ (ver BRAND.md).
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const [inputDir, outputDir] = process.argv.slice(2);

if (!inputDir || !outputDir) {
  console.error('Uso: node scripts/optimize-images.mjs <pasta-de-origem> <pasta-de-destino>');
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

for (const file of fs.readdirSync(inputDir)) {
  const { name, ext } = path.parse(file);
  if (!/^\.(png|jpe?g|webp)$/i.test(ext)) continue;

  const out = path.join(outputDir, `${name}.webp`);
  await sharp(path.join(inputDir, file)).webp({ quality: 82, effort: 6 }).toFile(out);
  console.log(`${out}  ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}
