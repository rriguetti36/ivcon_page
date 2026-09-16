import { test, expect } from '@playwright/test';

test('servicios, metadatos e iconos accesibles', async ({ page, request }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/servicios/');
  const links = await page.locator('.service-card a').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href')));
  expect(links).toHaveLength(7);
  for (const link of links) {
    const response = await page.goto(link);
    expect(response.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('navigation', { name: 'Ruta de navegación' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    const graph = await page.locator('script[type="application/ld+json"]').evaluate(script => JSON.parse(script.textContent)['@graph']);
    expect(graph.some(node => node['@type'] === 'Service')).toBe(true);
    const steps = await page.locator('h1,h2,h3').evaluateAll(headings => headings.map(heading => Number(heading.tagName.slice(1))));
    for (let i = 1; i < steps.length; i++) expect(steps[i] - steps[i - 1]).toBeLessThanOrEqual(1);
  }
  for (const asset of ['/favicon.ico', '/favicon-32.png', '/favicon-192.png', '/apple-touch-icon.png', '/imagenes/ivcon-social.jpg', '/imagenes/logo-web.webp']) {
    const response = await request.get(asset);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/^image\//);
  }
  expect(errors).toEqual([]);
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`navegación y contenido sin desbordamiento a ${width}px`, async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/servicios/', '/manto-asfaltico/', '/impermeabilizacion-de-techos/', '/proyectos/', '/proyectos/linea-2-metro-lima/']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => [...document.fonts].some(font => font.family.includes('Barlow Condensed') && font.status === 'loaded'))).toBe(true);
      expect(await page.evaluate(() => performance.getEntriesByType('resource').some(resource => /fonts\.(googleapis|gstatic)\.com/.test(resource.name)))).toBe(false);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true);
      const header = page.locator('header');
      expect(await header.evaluate(element => element.scrollWidth <= element.clientWidth), `header ${route}`).toBe(true);
      for (const image of await page.locator('img').all()) {
        expect(await image.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
      }
    }
    await page.goto('/');
    if (width <= 1100) {
      const toggle = page.locator('.mobile-menu > summary');
      await toggle.click();
      const navigation = page.getByRole('navigation', { name: 'Principal móvil', exact: true });
      await expect(navigation).toBeVisible();
      const box = await navigation.getByRole('link', { name: 'Soluciones' }).boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(44);
      await page.keyboard.press('Escape');
      await expect(navigation).not.toBeVisible();
      await toggle.click();
      await navigation.getByRole('link', { name: 'Sistemas' }).click();
      await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '');
      await toggle.click();
      await navigation.getByRole('link', { name: 'Soluciones' }).click();
      await expect(page).toHaveURL(/\/servicios\/$/);
    } else {
      await expect(page.getByRole('navigation', { name: 'Principal', exact: true })).toBeVisible();
    }
    if (width === 390 || width === 1440) {
      await page.goto('/manto-asfaltico/');
      await page.screenshot({ path: `artifacts/servicio-${width}.png`, fullPage: true });
    }
  });
}

test('404 real con branding y enlaces de recuperación', async ({ page }) => {
  const response = await page.goto('/ruta-inexistente-para-prueba/');
  expect(response.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Esta página no existe');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await page.getByRole('link', { name: 'Volver al inicio' }).click();
  await expect(page).toHaveURL('/');
});

test('consulta WhatsApp desde móvil conserva el mensaje', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#contacto');
  await page.getByLabel('Tu nombre').fill('Consulta móvil');
  await page.getByLabel('Ciudad o región').fill('Lima');
  await page.getByLabel('¿Qué ocurre en tu proyecto?').fill('Filtración en azotea');
  await page.evaluate(() => { window.open = url => { window.__consultation = String(url); return null; }; });
  await page.getByRole('button', { name: 'Consultar por WhatsApp' }).click();
  const url = await page.evaluate(() => window.__consultation);
  expect(url).toMatch(/^https:\/\/wa.me\/51993081821\?text=/);
  expect(decodeURIComponent(url)).toContain('Filtración en azotea');
});
