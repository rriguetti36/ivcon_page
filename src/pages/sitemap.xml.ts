import empresa from '../data/empresa.json';
import proyectos from '../data/proyectos.json';
const escape = (s:string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
export const GET = () => { const paths = ['/',...proyectos.filter(p=>p.publicarSEO && [p.problema,p.solucion,p.sistema,p.superficie,p.resultado].every(Boolean)).map(p=>`/proyectos/${p.slug}/`)];return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${empresa.dominio ? paths.map(p=>`<url><loc>${escape(empresa.dominio.replace(/\/$/,'')+p)}</loc></url>`).join('') : ''}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});};
