# IVCON — web de servicios

Sitio Astro con HTML generado, diseño adaptable y configuración local. No requiere base de datos ni una página escrita a mano por proyecto.

## Ejecutar

```sh
npm install
npm run dev
```

Preview local: http://localhost:4321 . Para publicar: `npm run build`; subir `dist/` a un alojamiento estático. `npm run preview` sirve la versión compilada.

## Contacto y SEO local

Editar `src/data/empresa.json`: teléfono, WhatsApp con código de país (solo dígitos), correo, dirección comercial real si corresponde, horarios y enlace público de Google Maps/Business Profile. El dominio se configura exclusivamente mediante `SITE_URL`.

Copiar `.env.example` a `.env` y mantener `SITE_URL=https://ivcon.soluciones-galera.com` para la demo. Sin configuración también se usa este origen seguro. Para producción cambiar únicamente a `SITE_URL=https://ivcon-imper.com` y volver a compilar. Se leen `.env`, `.env.local` y las variables del proceso/hosting (estas últimas tienen prioridad). Usar estos mecanismos; no depender de archivos `.env.production` o `.env.development` para esta configuración.

La demo y cualquier dominio distinto al definitivo llevan `noindex, nofollow`. En desarrollo (`npm run dev`) también se fuerza noindex. En el build del dominio definitivo se habilita `index, follow` para las páginas publicables. `SEO_NOINDEX=true` permite deshabilitarlo incluso en producción; su valor predeterminado es `false`. Este interruptor no permite indexar accidentalmente la demo.

Canonical, Open Graph, Schema.org y sitemap utilizan el mismo origen. `robots.txt` permite rastreo para que el buscador pueda leer el noindex; solo anuncia el sitemap en producción indexable. El sitemap queda vacío en demo y excluye siempre las páginas noindex y la 404. No confundir permitir rastreo con permitir indexación.

El esquema usa Organization mientras no haya dirección real; con dirección pasa a GeneralContractor. Solo se incluyen datos proporcionados. La ficha de Google Business Profile se debe crear/verificar con el propietario y mantener consistente con estos datos. Tras publicar, verificar dominio en Search Console y enviar `/sitemap.xml`. El SEO facilita la comprensión y el rastreo; no garantiza posiciones ni que Google muestre exactamente el title.

## Imágenes y banner

- Logo de cabecera: `public/imagenes/logo-web.webp`, con respaldo en `logo-recortado.png` y `logo.png`. Los PNG originales se conservan. Ejecutar `npm run assets:brand` si cambia el logo aprobado; también regenera favicon, apple-touch-icon e imagen social. Ver `public/imagenes/LOGO-NOTAS.md`.
- Banner: `public/imagenes/banner.webp`, `banner.jpg` o `banner.png` (en ese orden). También admite `portada.jpg`.
- Video: `public/imagenes/banner.mp4` o `banner.webm`. Tiene prioridad sobre la imagen; esta actúa como poster. Usar video ligero, sin sonido; evitar texto incrustado. En movimiento reducido se oculta el video.
- Sin archivos, se muestran composiciones geométricas decorativas, no fotografías de obras ajenas.

## Mantenedor por configuración

Editar `src/data/proyectos.json`. Cada registro genera automáticamente `/proyectos/SLUG/`. Los campos son `nombre`, `ubicacion`, `sector`, `descripcion`, `problema`, `solucion`, `sistema`, `superficie`, `resultado`, `publicarSEO`, `slug`, `servicios` e `imagenesAlt`.

`servicios` es una lista de slugs de servicios confirmados para esa obra; dejarla vacía si se desconoce el sistema utilizado. `imagenesAlt` permite textos descriptivos por nombre de archivo, por ejemplo: `{"01-general.webp":"Descripción de lo que realmente muestra esta fotografía"}`. Si no se especifica, se usa el nombre y ubicación de la obra, nunca el nombre de archivo de WhatsApp.

Agregar fotografías JPG, JPEG, PNG, WebP o AVIF en la carpeta del proyecto:

```text
public/imagenes/
  logo.png
  banner.mp4
  banner.jpg
  linea-2-metro-lima/
  hospital-chupaca-junin/
  edificio-las-olas-ancon/
  centro-salud-palmira/
  hospital-sisa-san-martin/
  universidad-santa-chimbote/
  paisajismo-ivcon/
```

Las fotos se ordenan por nombre: `01-general.jpg`, `02-detalle.webp`, etc. La primera es la portada. Al hacer clic se amplían; Escape cierra la imagen. Para crear un nuevo proyecto, agregar un registro y una carpeta que coincida con su slug. No es un panel web: el mantenedor es el JSON editable, sin credenciales ni backend.

Los datos técnicos no proporcionados están vacíos, y las fichas incompletas llevan noindex y no aparecen en sitemap. Completar problema/necesidad, solución y resultado con información real y cambiar `publicarSEO` a `true` cuando estén listas. El sistema y el área son opcionales: no se exige inventarlos para publicar. Cargar fotos reales y revisar ALT antes de habilitar una ficha. Las cifras de experiencia y nombres de proyectos proceden del cliente. No se inventan resultados, testimonios ni plazos de garantía.

Después de modificar JSON o fotos, recompilar y publicar. En desarrollo Astro actualiza contenido; si no detecta archivos nuevos, reiniciar `npm run dev`.

## Consultas

El formulario prepara un mensaje para WhatsApp al 993 081 821 (+51 Perú); no envía automáticamente ni almacena datos. Si no hay WhatsApp pero sí correo, abre un borrador mailto. Si no hay ninguno, permite conservar el texto sin simular envío.

## Comprobaciones

`npm run build` genera 18 páginas HTML (incluida 404), robots y sitemap. `npm run test:seo` construye y valida demo, producción y producción con noindex en `artifacts/seo/`, sin reemplazar `dist/`. Comprueba metadatos, sitemap, schema, enlaces, anclas e iconos. `npm test` ejecuta las pruebas de navegador con Microsoft Edge instalado, incluido móvil y WhatsApp. Se incluye Node 22 como dependencia local para ejecutar Astro actualizado sin modificar Node del sistema.

## Servicios y publicación

Las tipografías aprobadas se sirven desde `public/fonts/` en WOFF2, con sus licencias y sin solicitudes externas. Se declaran en `src/styles/fonts.css` y no se descargan durante el build.

Los contenidos de los siete servicios se mantienen en `src/data/servicios.ts` y comparten una plantilla Astro. Índices: `/servicios/` y `/proyectos/`. No hay blog ni panel administrativo.

La compilación es estática: cambiar una variable del hosting sin recompilar no modifica el HTML publicado. Subir el contenido de `dist/` al alojamiento correspondiente. Configurar el servidor para servir `404.html` con estado HTTP 404, sin redirigir errores al inicio con estado 200.

Entrega SEO, inventario y checklist: [docs/SEO-ENTREGA.md](docs/SEO-ENTREGA.md). Redirecciones futuras: [docs/REDIRECCIONES.md](docs/REDIRECCIONES.md); inventario vacío en `config/redirects.json`.
