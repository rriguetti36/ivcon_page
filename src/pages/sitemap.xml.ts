import proyectos from '../data/proyectos.json';
import { servicios, servicePath } from '../data/servicios';
import { absoluteUrl, indexable } from '../lib/seo';
import { projectIndexable } from '../lib/projects';
const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
export const GET = () => {
  const paths = indexable ? ['/', '/servicios/', ...servicios.map(servicePath), '/proyectos/', ...proyectos.filter(projectIndexable).map(p => `/proyectos/${p.slug}/`)] : [];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `\n  <url><loc>${escape(absoluteUrl(path))}</loc></url>`).join('')}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
