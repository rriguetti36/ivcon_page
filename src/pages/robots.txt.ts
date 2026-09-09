import empresa from '../data/empresa.json';
export const GET = () => new Response(empresa.dominio ? `User-agent: *\nAllow: /\nSitemap: ${empresa.dominio.replace(/\/$/,'')}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n', {headers:{'Content-Type':'text/plain; charset=utf-8'}});
