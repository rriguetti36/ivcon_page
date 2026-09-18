import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Derivados técnicos del logo aprobado. Los PNG originales se conservan intactos.
const source = 'public/imagenes/logo-recortado.png';
await sharp(source).resize({ width: 720 }).webp({ quality: 88 }).toFile('public/imagenes/logo-web.webp');
await sharp(source).flatten({ background: '#f7f7f2' }).resize(1200, 630, { fit: 'contain', background: '#f7f7f2' }).jpeg({ quality: 90 }).toFile('public/imagenes/ivcon-social.jpg');
const isotipo = await sharp(source).extract({ left: 0, top: 0, width: 550, height: 550 }).png().toBuffer();
for (const [size, name] of [[32, 'favicon-32.png'], [48, 'favicon-48.png'], [192, 'favicon-192.png'], [180, 'apple-touch-icon.png']]) {
  await sharp(isotipo).resize(size, size).png().toFile(`public/${name}`);
}
// ICO con imagen PNG de 32 px, compatible con navegadores actuales.
const icon = await sharp(isotipo).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32; header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(icon.length, 14);
header.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([header, icon]));
console.log('Logo WebP, imagen social e iconos generados desde el logo existente.');
