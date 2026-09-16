import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { domains, resolveSiteConfig } from '../src/config/site.mjs';

// Construye cada entorno en su propio directorio: no reemplaza dist ni la demo local.
assert.equal(resolveSiteConfig({}).indexable, false);
assert.equal(resolveSiteConfig({ SITE_URL: `${domains.production}/` }).indexable, true);
assert.equal(resolveSiteConfig({ SITE_URL: 'https://otro-dominio.example' }).indexable, false);
assert.equal(resolveSiteConfig({ SITE_URL: domains.demo, SEO_NOINDEX: 'false' }).indexable, false);
for (const value of ['ftp://example.com', `${domains.production}/ruta`, `${domains.production}?x=1`, 'https://user:pass@example.com', 'incorrecto']) {
  assert.throws(() => resolveSiteConfig({ SITE_URL: value }));
}
assert.throws(() => resolveSiteConfig({ SEO_NOINDEX: 'yes' }));

const filesUnder = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(directory, entry.name);
  return entry.isDirectory() ? filesUnder(file) : [file];
});
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(match => attributes(match[0]));
const meta = (html, name) => tags(html, 'meta').find(tag => tag.name === name || tag.property === name)?.content;
const read = file => readFileSync(file, 'utf8');
const serviceSlugs = ['impermeabilizacion-de-techos', 'manto-asfaltico', 'membrana-liquida', 'impermeabilizacion-de-azoteas', 'impermeabilizacion-industrial', 'reparacion-de-filtraciones', 'paisajismo'];
const projects = JSON.parse(read('src/data/proyectos.json'));
const confirmedProjects = projects.filter(p => p.publicarSEO && [p.problema, p.solucion, p.resultado].every(v => v.trim()));
const expectedPaths = ['/', '/servicios/', '/proyectos/', ...serviceSlugs.map(slug => `/${slug}/`), ...confirmedProjects.map(p => `/proyectos/${p.slug}/`)];
const results = [];

for (const scenario of [
  { name: 'demo', url: domains.demo, noindex: 'false', indexed: false },
  { name: 'production', url: domains.production, noindex: 'false', indexed: true },
  { name: 'production-noindex', url: domains.production, noindex: 'true', indexed: false },
]) {
  const directory = path.resolve('artifacts', 'seo', scenario.name);
  const build = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', directory], {
    env: { ...process.env, SITE_URL: scenario.url, SEO_NOINDEX: scenario.noindex }, encoding: 'utf8',
  });
  assert.equal(build.status, 0, `${scenario.name}: build falló\n${build.stdout}\n${build.stderr}`);
  const htmlFiles = filesUnder(directory).filter(file => file.endsWith('.html'));
  for (const cssFile of filesUnder(directory).filter(file => file.endsWith('.css'))) {
    for (const match of read(cssFile).matchAll(/url\(["']?(\/fonts\/[^)"']+)["']?\)/g)) {
      assert.ok(existsSync(path.join(directory, match[1])), `Falta fuente local: ${match[1]}`);
    }
  }
  assert.equal(htmlFiles.length, 11 + projects.length, 'Faltan rutas HTML');
  const titles = new Set();
  const descriptions = new Set();
  const linkedPages = new Set(['/']);
  for (const file of htmlFiles) {
    const html = read(file);
    assert.ok(!/fonts\.(googleapis|gstatic)\.com/.test(html), 'La página depende de fuentes externas');
    const relative = path.relative(directory, file).replaceAll('\\', '/');
    const pagePath = relative === 'index.html' ? '/' : `/${relative.replace(/index\.html$/, '')}`;
    const errorPage = relative === '404.html';
    const project = projects.find(p => pagePath === `/proyectos/${p.slug}/`);
    const pageIndexed = scenario.indexed && !errorPage && (!project || confirmedProjects.includes(project));
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${pagePath}: H1`);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = meta(html, 'description');
    assert.ok(title && !titles.has(title), `${pagePath}: title vacío o duplicado`);
    assert.ok(description && !descriptions.has(description), `${pagePath}: description vacía o duplicada`);
    titles.add(title); descriptions.add(description);
    assert.equal(meta(html, 'robots'), !scenario.indexed ? 'noindex, nofollow' : pageIndexed ? 'index, follow' : 'noindex, follow', `${pagePath}: robots`);
    const canonical = tags(html, 'link').filter(tag => tag.rel === 'canonical');
    assert.equal(canonical.length, errorPage ? 0 : 1, `${pagePath}: canonical`);
    if (!errorPage) {
      assert.equal(canonical[0].href, scenario.url + pagePath);
      assert.equal(meta(html, 'og:url'), scenario.url + pagePath);
    }
    for (const name of ['og:title', 'og:description', 'og:image', 'og:type', 'twitter:card']) assert.ok(meta(html, name), `${pagePath}: falta ${name}`);
    assert.equal(meta(html, 'og:image'), `${scenario.url}/imagenes/ivcon-social.jpg`);
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1])['@graph'];
    assert.ok(graph.some(node => node['@type'] === 'Organization' || node['@type'] === 'GeneralContractor'));
    if (pagePath !== '/' && !errorPage) assert.ok(graph.some(node => node['@type'] === 'BreadcrumbList'), `${pagePath}: breadcrumbs`);
    if (serviceSlugs.some(slug => pagePath === `/${slug}/`)) {
      assert.ok(graph.some(node => node['@type'] === 'Service'), `${pagePath}: Service`);
      for (const label of ['Beneficios', 'Aplicaciones', 'Tipos de superficie', 'Cómo abordamos']) assert.ok(html.includes(label), `${pagePath}: contenido ${label}`);
    }
    if (scenario.indexed) assert.ok(!html.includes(domains.demo), `${pagePath}: dominio demo en producción`);
    for (const img of tags(html, 'img')) {
      assert.ok('alt' in img && !/WhatsApp Image/i.test(img.alt), `${pagePath}: ALT`);
    }
    const localReferences = [...tags(html, 'a').map(tag => tag.href), ...tags(html, 'link').filter(tag => tag.rel !== 'canonical').map(tag => tag.href), ...tags(html, 'img').map(tag => tag.src), ...tags(html, 'script').map(tag => tag.src)].filter(value => value?.startsWith('/') || value?.startsWith('#'));
    for (const reference of localReferences) {
      const target = new URL(reference, scenario.url + pagePath);
      const targetPath = decodeURIComponent(target.pathname);
      const targetFile = path.join(directory, targetPath.endsWith('/') ? `${targetPath}index.html` : targetPath);
      assert.ok(existsSync(targetFile), `${pagePath}: recurso o enlace roto ${reference}`);
      if (targetPath.endsWith('/')) linkedPages.add(targetPath);
      if (target.hash && targetFile.endsWith('.html')) assert.ok(read(targetFile).includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${pagePath}: ancla rota ${reference}`);
    }
  }
  for (const route of [...expectedPaths, ...projects.map(p => `/proyectos/${p.slug}/`)]) assert.ok(linkedPages.has(route), `Página huérfana: ${route}`);
  const sitemap = read(path.join(directory, 'sitemap.xml'));
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(locations.sort(), (scenario.indexed ? expectedPaths.map(route => scenario.url + route) : []).sort(), 'Sitemap incluye páginas incorrectas');
  const robots = read(path.join(directory, 'robots.txt'));
  assert.ok(robots.includes('Allow: /') && !robots.includes('Disallow: /'));
  assert.equal(robots.includes(`Sitemap: ${scenario.url}/sitemap.xml`), scenario.indexed);
  for (const file of ['favicon.ico', 'favicon-32.png', 'favicon-192.png', 'apple-touch-icon.png', 'imagenes/ivcon-social.jpg', 'imagenes/logo-web.webp']) assert.ok(existsSync(path.join(directory, file)), `Falta ${file}`);
  results.push({ environment: scenario.name, pages: htmlFiles.length, sitemapURLs: locations.length, result: 'OK' });
  console.log(`${scenario.name}: ${htmlFiles.length} páginas, ${locations.length} URLs en sitemap — OK`);
}
mkdirSync('artifacts/seo', { recursive: true });
writeFileSync('artifacts/seo/results.json', JSON.stringify(results, null, 2) + '\n');
