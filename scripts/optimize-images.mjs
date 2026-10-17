/**
 * Converte as fotos de fundo para .webp otimizado (2400 px de largura) em public/images/.
 *
 * Uso: node scripts/optimize-images.mjs <pasta-com-as-fotos>
 * Os arquivos devem ter o nome do slot: hero, porto, rota, travessia,
 * antes-depois, para-quem, proximo-passo (qualquer extensão .png/.jpg/.jpeg/.webp).
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SLOTS = ['hero', 'porto', 'rota', 'travessia', 'antes-depois', 'para-quem', 'proximo-passo'];
const inputDir = process.argv[2];

if (!inputDir) {
  console.error('Uso: node scripts/optimize-images.mjs <pasta-com-as-fotos>');
  process.exit(1);
}

fs.mkdirSync('public/images', { recursive: true });

for (const file of fs.readdirSync(inputDir)) {
  const { name, ext } = path.parse(file);
  if (!SLOTS.includes(name) || !/^\.(png|jpe?g|webp)$/i.test(ext)) continue;

  const out = `public/images/${name}.webp`;
  await sharp(path.join(inputDir, file)).resize({ width: 2400, withoutEnlargement: false }).webp({ quality: 84, effort: 6 }).toFile(out);
  console.log(`${out}  ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}
