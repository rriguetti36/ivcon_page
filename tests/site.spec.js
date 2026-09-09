import {test,expect} from '@playwright/test';
test('inicio, contacto y fichas de proyecto',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await expect(page).toHaveTitle('Impermeabilización de Techos en Perú | Manto Asfáltico | IVCON');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, follow');
  await expect(page.locator('.project-card')).toHaveCount(7);
  await page.getByLabel('Tu nombre').fill('Prueba de evaluación');
  await page.getByLabel('Ciudad o región').fill('Tarapoto');
  await page.getByLabel('¿Qué ocurre en tu proyecto?').fill('Goteras en azotea de 100 m²');
  await page.evaluate(()=>{window.open=(url)=>{window.__consultation=String(url);return null;};});
  await page.getByRole('button',{name:'Consultar por WhatsApp'}).click();
  const url=await page.evaluate(()=>window.__consultation);
  expect(url).toContain('https://wa.me/51993081821?text=');
  expect(decodeURIComponent(url)).toContain('Tarapoto');
  const links=await page.locator('.project-card').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
  for(const link of links){await page.goto(link);await expect(page.locator('h1')).toHaveCount(1);await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, follow');}
  expect(errors).toEqual([]);
});
test('móvil sin desbordamiento y preguntas accesibles',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
  await page.locator('summary').filter({hasText:'¿Manto asfáltico o membrana líquida?'}).click();
  await expect(page.locator('details').first()).toHaveAttribute('open','');
  await page.screenshot({path:'artifacts/ivcon-mobile.png',fullPage:true});
});
test('captura de escritorio',async({page})=>{await page.setViewportSize({width:1440,height:1000});await page.goto('/');await page.screenshot({path:'artifacts/ivcon-desktop.png',fullPage:true});});
