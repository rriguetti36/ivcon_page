import fs from 'node:fs';
import path from 'node:path';
export function photos(folder: string) {
  const directory = path.join(process.cwd(), 'public', 'imagenes', folder);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort((a,b) => a.localeCompare(b, 'es', {numeric:true})).map(f => `/imagenes/${folder}/${encodeURIComponent(f)}`);
}
export function asset(names: string[]) {
  const name = names.find(n => fs.existsSync(path.join(process.cwd(), 'public', 'imagenes', n)));
  return name ? `/imagenes/${name}` : null;
}
