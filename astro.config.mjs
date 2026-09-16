import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import { resolveSiteConfig } from './src/config/site.mjs';

const site = resolveSiteConfig({ ...loadEnv('', process.cwd(), ''), ...process.env });
export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: { define: { 'import.meta.env.SITE_INDEXABLE': JSON.stringify(site.indexable) } },
});
