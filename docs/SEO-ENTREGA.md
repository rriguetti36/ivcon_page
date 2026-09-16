# Entrega SEO de IVCON

## Resultado

Proyecto Astro 7.3.2 de salida estática, revisado antes de editar. Se conservaron branding, colores, tipografías, secciones comerciales y formulario existentes. Las páginas nuevas reutilizan el layout y las clases visuales del sitio. Cambios preparados localmente; no se publicó ni se modificó el alojamiento remoto.

## 1. Archivos creados

- `.env.example`: variables de dominio e indexación.
- `src/config/site.mjs`: únicos dominios de demo/producción y validación de configuración.
- `src/lib/seo.ts`: URLs absolutas, política de indexación y datos estructurados.
- `src/lib/projects.ts`: descripción y criterio compartido de publicación de proyectos.
- `src/env.d.ts`: tipos de entorno.
- `src/data/servicios.ts`: contenido específico de los siete servicios.
- `src/components/Breadcrumbs.astro`, `ProjectGrid.astro` y `ServiceLinks.astro`: navegación y componentes reutilizados.
- `src/pages/[servicio].astro`: plantilla para siete páginas de servicios.
- `src/pages/servicios/index.astro`, `src/pages/proyectos/index.astro`, `src/pages/404.astro`.
- `public/favicon.ico`, `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png`.
- `public/imagenes/logo-web.webp`, `public/imagenes/ivcon-social.jpg`.
- `src/styles/fonts.css` y `public/fonts/`: ocho WOFF2 de las tipografías originales, dos licencias OFL y documentación de procedencia.
- `scripts/prepare-brand-assets.mjs`: regeneración de derivados del logo existente.
- `scripts/validate-seo.mjs`: validación de builds de los tres entornos.
- `tests/seo-mobile.spec.js`: rutas, metadatos, iconos, menú, móvil, 404 y WhatsApp.
- `config/redirects.json`: inventario vacío de futuras redirecciones.
- `docs/REDIRECCIONES.md` y este documento.

## 2. Archivos modificados

- `astro.config.mjs`: origen del sitio y configuración de indexación.
- `package.json`, `package-lock.json`: comandos de validación e imágenes; declaraciones directas de sharp y Vite usando las mismas versiones ya instaladas. Sin actualizar Astro ni el resto de dependencias.
- `src/layouts/Layout.astro`: metadatos compartidos, favicon, social, JSON-LD, fuentes y menú móvil.
- `src/pages/index.astro`: descripción solicitada, H1 descriptivo, mensaje comercial conservado, cifras existentes y enlaces a los servicios.
- `src/pages/proyectos/[slug].astro`: breadcrumbs, descripción, servicios confirmables y ALT por foto.
- `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`: generación coherente por entorno.
- `src/data/empresa.json`: se retiró el antiguo campo vacío `dominio` para evitar dos configuraciones distintas.
- `src/data/proyectos.json`: campos vacíos para descripción, servicios confirmados y ALT por imagen; se preservaron nombres, ubicaciones y datos existentes.
- `src/styles/global.css`: estilos de nuevas páginas, navegación y corrección de desbordamiento móvil. Se retiró el import CSS externo de Google Fonts.
- `tests/site.spec.js`: política noindex de desarrollo y selector específico de preguntas frecuentes.
- `public/imagenes/LOGO-NOTAS.md`, `README.md`: instrucciones actualizadas.

## 3. Mejoras SEO

- Home conserva el title exacto solicitado y usa la meta description sugerida.
- Un H1 por página; H2/H3 según contenido. El mensaje «La lluvia no se detiene. Las filtraciones, sí.» permanece visible junto al H1 descriptivo.
- Servicios con texto propio, beneficios, aplicaciones, tipos de superficie, proceso, CTA y enlaces relacionados. El paisajismo se presenta como línea complementaria.
- Títulos y descripciones únicos en las 18 páginas HTML generadas.
- Canonical por ruta, sin parámetros, usando SITE_URL; la 404 no emite canonical.
- Open Graph y Twitter con imagen corporativa 1200 × 630, URL absoluta y ALT.
- JSON-LD Organization y Service; BreadcrumbList con rutas reales en páginas internas.
- Si se completa una dirección real, la entidad cambia a GeneralContractor, subtipo de LocalBusiness. Mientras la dirección no existe se usa Organization, sin inventar datos locales. No se añadieron Article a fichas incompletas que no son artículos.
- Sitemap de producción con Inicio, índice de servicios, siete servicios e índice de proyectos: diez URLs actualmente. Las siete fichas pendientes y la 404 se excluyen. No existe blog que agregar.
- `noindex, nofollow` en demo y desarrollo. Las fichas pendientes permanecen `noindex, follow` incluso en producción.
- Robots permite rastreo para que los buscadores vean noindex. Solo anuncia el sitemap en producción indexable.
- Iconos derivados del isotipo aprobado, servidos desde la raíz; logo de cabecera WebP de 32 846 bytes frente a 1 096 999 bytes del recorte PNG (~97 % menos). Los originales no se alteraron.
- ALT descriptivos por proyecto, opción de ALT específico por imagen, carga diferida y decodificación asíncrona de galerías. No hay fotografías reales en el repositorio que renombrar o convertir.
- Menú móvil accesible mediante control nativo, cierre con Escape y al navegar, enlaces táctiles de al menos 44 px. Corrección de la franja de cifras a 320 px.
- Fuentes originales Barlow Condensed y DM Sans alojadas localmente como WOFF2, con display=swap y precarga de los dos recursos principales. Se eliminaron las solicitudes externas y la cadena de import CSS; se incluyen las licencias OFL originales. La revisión detectó una demora de ~9 s en la solicitud externa de fuentes en este entorno. No se añadieron librerías de interfaz ni grandes refactorizaciones.

## 4. Páginas nuevas

1. `/impermeabilizacion-de-techos/`
2. `/manto-asfaltico/`
3. `/membrana-liquida/`
4. `/impermeabilizacion-de-azoteas/`
5. `/impermeabilizacion-industrial/`
6. `/reparacion-de-filtraciones/`
7. `/paisajismo/`
8. `/proyectos/`
9. `/servicios/` (índice para navegación y breadcrumbs)
10. `/404.html` (página de error, excluida del sitemap)

Las siete URLs individuales de proyectos existentes se conservaron.

## 5. Variables de entorno

Copiar `.env.example` a `.env` o establecer variables en el proceso de build del hosting.

```dotenv
SITE_URL=https://ivcon.soluciones-galera.com
SEO_NOINDEX=false
```

| Configuración | Robots meta de las páginas publicables | Sitemap |
| --- | --- | --- |
| Demo o cualquier origen distinto al definitivo | noindex, nofollow | Vacío |
| SITE_URL=https://ivcon-imper.com | index, follow | Diez URLs, más proyectos que se completen |
| Dominio definitivo y SEO_NOINDEX=true | noindex, nofollow | Vacío |
| Servidor de desarrollo, con cualquier dominio | noindex, nofollow | Vacío |

`SEO_NOINDEX` es opcional, por defecto false. Solo deshabilita indexación: no puede habilitar la demo. SITE_URL debe ser un origen HTTP(S), sin rutas, parámetros ni credenciales; acepta una barra final y la normaliza. Los dominios solo se definen en `src/config/site.mjs`.

Se leen `.env`, `.env.local` y variables del proceso (prioridad mayor). No usar archivos `.env.production` o `.env.development` para esta configuración. Las variables se resuelven al compilar; el HTML estático no cambia en tiempo de ejecución.

## 6. Paso al dominio definitivo

Cambiar únicamente SITE_URL, manteniendo SEO_NOINDEX=false o sin definir:

```dotenv
SITE_URL=https://ivcon-imper.com
```

Volver a ejecutar `npm run build` y publicar el contenido de `dist/` en el alojamiento definitivo. Esto actualiza canonical, sitemap, Open Graph, schema y robots. No copiar este build indexable al subdominio de demo: si se conserva la demo, generar su build por separado con su propio SITE_URL.

Después configurar HTTPS, dominio principal, respuesta 404 y redirecciones HTTP 301 en el servidor. Los cambios de DNS, certificados, hosting, Search Console y reglas del servidor no forman parte de los cambios locales realizados.

## 7. Pendientes por falta de información o acceso

- Las siete fichas carecen de problema/necesidad, solución, sistema, área, resultado y fotografías. Se añadió estructura editable y una descripción basada en nombre/ubicación; no se inventaron datos técnicos. Completar con información real, revisar las imágenes y activar publicarSEO cuando corresponda.
- Sistema y m² son opcionales. La elegibilidad requiere problema, solución, resultado y publicarSEO=true; las mismas reglas se usan en el HTML y en el sitemap.
- Centro de Salud Palmira solo tiene ubicación «Perú». Paisajismo IVCON también tiene ubicación genérica. No se asignaron ciudades sin respaldo.
- Faltan correo, dirección, horarios y enlace Google Maps. No se publicaron datos de ejemplo.
- No hay fotografías de obra ni banner. Se conservaron las composiciones geométricas existentes; no se sustituyeron por fotos ajenas.
- No se conocen URLs antiguas ni tecnología de hosting definitiva para implementar 301 reales. Se dejó inventario vacío y procedimiento documentado.
- No se pudo auditar la web remota mediante la herramienta web en esta sesión. La validación corresponde al repositorio y al sitio local; el sitio publicado debe comprobarse después del despliegue.
- No hay mediciones de usuarios reales de LCP/CLS ni validación en Search Console. Las pruebas locales no equivalen a Core Web Vitals del dominio publicado.

## 8. Errores y limitaciones detectados

Corregidos: dominio vacío que omitía canonical y dejaba sitemap vacío sin una transición clara; ausencia de favicon y metadatos sociales completos; falta de páginas de servicios e índices; H1 inicial sin descripción de actividad; navegación oculta en móvil; logo de más de 1 MB; desbordamiento de cifras en pantallas estrechas; falta de página 404 propia; exigencia innecesaria de m² para indexar proyectos.

Pendientes de contenido: las fichas son demasiado incompletas para posicionar como casos de obra. Las cifras de experiencia, superficie y cobertura se conservaron a partir del proyecto y del encargo; no se auditó su respaldo comercial. La cobertura en 25 regiones no se convirtió en una afirmación de 25 regiones con obras documentadas.

## 9. Comandos y validaciones

```sh
npm install
npm run dev
npm run build
npm run test:seo
npm test
npm run preview
```

`npm test` usa Microsoft Edge instalado y el servidor local en puerto 4321. El formulario se prueba interceptando la apertura de WhatsApp: no se envían mensajes.

`npm run test:seo` genera builds independientes bajo `artifacts/seo/` y comprueba todas las páginas de demo, producción y producción con noindex. Valida H1, títulos y descripciones únicos, robots, canonical, Open Graph, JSON-LD, enlaces, anclas, recursos locales e inclusión exacta en sitemap. El archivo de resultados es `artifacts/seo/results.json`.

Resultados de esta entrega:

- Build estático correcto: 18 páginas HTML más robots y sitemap.
- Tres escenarios SEO correctos: 18 páginas por escenario; sitemap con 0, 10 y 0 URLs respectivamente.
- Once pruebas Playwright correctas con Edge: servicios, iconos, menú, anchos 320/390/768/1024/1440, formulario, 404 y capturas.
- Preview compilado de producción: canonical e indexación correctos, error real HTTP 404 y sin errores JavaScript. Recursos y medición orientativa local en `artifacts/seo/preview-performance.json`; no equivale a una medición de campo.
- Tras alojar las fuentes localmente, LCP observado en Inicio de 240 ms a 390 px y 164 ms a 1440 px, con CLS observado 0. Medición de laboratorio local sin limitar red/CPU y ventana breve de observación; no representa el rendimiento del hosting ni una garantía de Core Web Vitals.
- Capturas revisadas en `artifacts/ivcon-desktop.png`, `artifacts/ivcon-mobile.png`, `artifacts/servicio-390.png` y `artifacts/servicio-1440.png`.

Para regenerar iconos e imagen social después de actualizar el logo: `npm run assets:brand`, luego build. Los assets generados se incluyen en el proyecto; el build habitual no necesita regenerarlos.

En esta sesión el lanzador npm del sistema presentó restricciones de acceso. Las validaciones se completaron con Node local equivalente en PowerShell:

```powershell
.\node_modules\node\bin\node.exe node_modules/astro/bin/astro.mjs build
.\node_modules\node\bin\node.exe scripts/validate-seo.mjs
.\node_modules\node\bin\node.exe node_modules/@playwright/test/cli.js test --workers=2
```

## 10. Checklist final de producción

- [ ] Completar y revisar los datos comerciales y las fichas que se quieran indexar.
- [ ] Cargar fotografías reales, preferiblemente WebP o AVIF, con nombres descriptivos y ALT verificables. Revisar peso y resolución antes de publicar.
- [ ] Configurar SITE_URL=https://ivcon-imper.com y comprobar que SEO_NOINDEX no sea true.
- [ ] Ejecutar build y validación SEO; publicar ese dist exclusivamente en el dominio definitivo.
- [ ] Configurar DNS, HTTPS y una sola versión de dominio; definir redirecciones 301 reales desde el inventario de URLs anteriores.
- [ ] Comprobar que Inicio y servicios devuelven 200; rutas inexistentes devuelven 404 con branding y noindex.
- [ ] Verificar en HTML publicado: canonical, og:url y schema del dominio definitivo; index, follow solo donde corresponda.
- [ ] Abrir /robots.txt y /sitemap.xml: sitemap del dominio definitivo, sin demo, errores ni fichas noindex.
- [ ] Comprobar favicon, imagen social, menú y CTA WhatsApp en un teléfono real.
- [ ] Mantener la demo noindex con build independiente o retirarla con 301 equivalentes.
- [ ] Validar JSON-LD con Schema Markup Validator y, donde corresponda, Rich Results Test; no asumir que todos los tipos generan resultados enriquecidos.
- [ ] Verificar el dominio en Search Console, enviar sitemap e inspeccionar URLs representativas.
- [ ] Medir PageSpeed/Lighthouse en el sitio publicado y revisar LCP/CLS con datos de campo cuando existan.

## Referencias

- [Google: noindex requiere permitir rastreo](https://developers.google.com/search/docs/crawling-indexing/block-indexing). Por eso la demo usa noindex en HTML y Allow en robots, sin anunciar sitemap.
- [Astro: variables de entorno](https://docs.astro.build/en/guides/environment-variables/). La configuración de este proyecto se resuelve al compilar el sitio estático.
