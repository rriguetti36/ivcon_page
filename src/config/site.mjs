export const domains = Object.freeze({
  demo: 'https://ivcon.soluciones-galera.com',
  production: 'https://ivcon-imper.com',
});

export function resolveSiteConfig(env = {}) {
  const url = new URL(env.SITE_URL?.trim() || domains.demo);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL debe ser un origen HTTP(S), sin ruta, parámetros ni credenciales.');
  }
  const preventIndexing = env.SEO_NOINDEX?.trim() || 'false';
  if (!['true', 'false'].includes(preventIndexing)) throw new Error('SEO_NOINDEX debe ser true o false.');
  return {
    url: url.origin,
    indexable: url.origin === domains.production && preventIndexing !== 'true',
  };
}
