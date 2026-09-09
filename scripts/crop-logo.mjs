import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const source = 'public/imagenes/logo.png';
const destination = 'public/imagenes/logo-recortado.png';
const region = { left: 20, top: 210, width: 1496, height: 550 };
const originalHash = createHash('sha256').update(await readFile(source)).digest('hex');
await sharp(source).extract(region).keepMetadata().png().toFile(destination);
const expected = await sharp(source).extract(region).ensureAlpha().raw().toBuffer();
const actual = await sharp(destination).ensureAlpha().raw().toBuffer();
if (!expected.equals(actual)) throw new Error('El recorte cambió los valores de los píxeles.');
if (createHash('sha256').update(await readFile(source)).digest('hex') !== originalHash) {
  throw new Error('El archivo original fue modificado.');
}
console.log('Recorte 1496 × 550 verificado: píxeles idénticos al original, archivo original intacto.');
