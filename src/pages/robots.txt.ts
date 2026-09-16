import { absoluteUrl, indexable } from '../lib/seo';
// Permitir rastreo en demo para que el buscador pueda leer el noindex de las páginas.
export const GET = () => new Response(
  `User-agent: *\nAllow: /\n${indexable ? `\nSitemap: ${absoluteUrl('/sitemap.xml')}\n` : ''}`,
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
