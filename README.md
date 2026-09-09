# IVCON — web de servicios

Sitio Astro con HTML generado, diseño adaptable y configuración local. No requiere base de datos ni una página escrita a mano por proyecto.

## Ejecutar

```sh
npm install
npm run dev
```

Preview local: http://localhost:4321 . Para publicar: `npm run build`; subir `dist/` a un alojamiento estático. `npm run preview` sirve la versión compilada.

## Contacto y SEO local

Editar `src/data/empresa.json`: teléfono, WhatsApp con código de país (solo dígitos), correo, dirección comercial real si corresponde, horarios, enlace público de Google Maps/Business Profile y dominio HTTPS definitivo sin barra final.

Mientras `dominio` esté vacío, el sitio lleva noindex y robots bloquea rastreo para evitar indexar el preview. Al configurar el dominio y recompilar, se activan indexación, canonical y sitemap. No publicar con ese campo vacío si se busca aparecer en Google.

El esquema usa Organization mientras no haya dirección real; con dirección pasa a GeneralContractor. Solo se incluyen datos proporcionados. La ficha de Google Business Profile se debe crear/verificar con el propietario y mantener consistente con estos datos. Tras publicar, verificar dominio en Search Console y enviar `/sitemap.xml`. El SEO facilita la comprensión y el rastreo; no garantiza posiciones ni que Google muestre exactamente el title.

## Imágenes y banner

- Logo: `public/imagenes/logo.png`. Si no existe, se muestra la marca tipográfica IVCON.
- Banner: `public/imagenes/banner.webp`, `banner.jpg` o `banner.png` (en ese orden). También admite `portada.jpg`.
- Video: `public/imagenes/banner.mp4` o `banner.webm`. Tiene prioridad sobre la imagen; esta actúa como poster. Usar video ligero, sin sonido; evitar texto incrustado. En movimiento reducido se oculta el video.
- Sin archivos, se muestran composiciones geométricas decorativas, no fotografías de obras ajenas.

## Mantenedor por configuración

Editar `src/data/proyectos.json`. Cada registro genera automáticamente `/proyectos/SLUG/`. Los campos son `nombre`, `ubicacion`, `sector`, `problema`, `solucion`, `sistema`, `superficie`, `resultado`, `publicarSEO` y `slug`.

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

Los datos técnicos no proporcionados están vacíos, y las fichas incompletas llevan noindex y no aparecen en sitemap. Completar con información real y cambiar `publicarSEO` a `true` cuando estén listas. Las cifras de experiencia y nombres de proyectos proceden del cliente. No se inventan resultados, testimonios ni plazos de garantía.

Después de modificar JSON o fotos, recompilar y publicar. En desarrollo Astro actualiza contenido; si no detecta archivos nuevos, reiniciar `npm run dev`.

## Consultas

El formulario prepara un mensaje para WhatsApp al 993 081 821 (+51 Perú); no envía automáticamente ni almacena datos. Si no hay WhatsApp pero sí correo, abre un borrador mailto. Si no hay ninguno, permite conservar el texto sin simular envío.

## Comprobaciones

`npm run build` genera inicio, siete fichas, robots y sitemap. Pruebas de navegador: `npx playwright test` (usan Microsoft Edge instalado). Se incluye Node 22 como dependencia local para ejecutar Astro actualizado sin modificar Node del sistema.
