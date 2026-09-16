# Tipografías de IVCON

Se conservan las familias aprobadas: Barlow Condensed (600, 700, 800) y DM Sans (400, 500, 600, 700). Se sirven archivos WOFF2 desde el mismo sitio, sin peticiones a Google durante la visita. Los subconjuntos latin y latin-ext incluyen los caracteres usados en español.

Fuentes obtenidas de la distribución oficial de Google Fonts el 15 de septiembre de 2026:

- Barlow Condensed v13: https://fonts.google.com/specimen/Barlow+Condensed
- DM Sans v17: https://fonts.google.com/specimen/DM+Sans

DM Sans usa el mismo archivo variable para los cuatro pesos. El nombre `dm-sans-400-*.woff2` identifica el recurso compartido; `src/styles/fonts.css` declara los pesos originales. No se modificó el diseño de los glifos.

Licencias originales incluidas: `BarlowCondensed-OFL.txt` y `DMSans-OFL.txt` (SIL Open Font License 1.1). Conservarlas junto a los archivos al distribuir el proyecto.

CSS de origen:
https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap

Para actualizar las fuentes, obtener los WOFF2 oficiales de esas mismas familias/pesos, mantener sus licencias, actualizar `src/styles/fonts.css` y comprobar las capturas antes de publicar. No se descargan fuentes durante el build.
