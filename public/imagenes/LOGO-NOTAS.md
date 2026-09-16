La cabecera usa logo-web.webp (720 × 265); como respaldo usa logo-recortado.png y luego logo.png.
El archivo logo.png original se conserva sin cambios.
La versión actual es un recorte exacto del original, sin IA, redimensionamiento ni filtros.
Región: x=20, y=210, ancho=1496, alto=550 píxeles. Conserva los metadatos del original.
El script scripts/crop-logo.mjs compara todos los píxeles del resultado con la región original y comprueba que logo.png no cambió.

El script scripts/prepare-brand-assets.mjs genera derivados de distribución desde logo-recortado.png:

- logo-web.webp: versión reducida y comprimida para la cabecera.
- ivcon-social.jpg: logo sobre el color corporativo en un lienzo 1200 × 630 para Open Graph.
- favicon.ico, favicon-32.png, favicon-192.png y apple-touch-icon.png en public/: recorte cuadrado del isotipo existente (x=0, y=0, ancho=550, alto=550).

Estos derivados sí se redimensionan/comprimen; los dos PNG originales siguen intactos. No se generó una identidad visual nueva ni se utilizó IA para sustituir el logo.
