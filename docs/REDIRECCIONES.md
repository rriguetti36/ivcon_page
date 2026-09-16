# Redirecciones 301 para el cambio de dominio

El inventario de redirecciones futuras se mantiene en `config/redirects.json`. Está vacío: no se inventaron URLs antiguas ni se activaron redirecciones.

Formato de cada entrada: objeto con `from` (ruta antigua), `to` (ruta nueva) y `status` (301). Usar rutas que comiencen con `/`, sin dominio. Completar únicamente después de revisar las URLs reales del sitio anterior mediante su sitemap, Search Console o registros del servidor.

Este archivo es un inventario; el hosting no lo aplica automáticamente. Al conocer el servidor definitivo, convertir las entradas en reglas nativas de Nginx, Apache o el proveedor elegido. Las redirecciones deben devolver HTTP 301, sin cadenas ni bucles. No usar páginas HTML con meta refresh como sustituto.

Al migrar:

1. Inventariar las URLs antiguas de `ivcon-imper.com` y asignarles la página equivalente. No redirigir indiscriminadamente todas las rutas a Inicio.
2. Implementar y probar las reglas 301 en el alojamiento definitivo.
3. Definir un único origen HTTPS; redirigir HTTP y, si existe, www al origen definitivo.
4. Si se retira el subdominio demo, redirigir sus rutas equivalentes al dominio definitivo. Si la demo permanece, conservar su build separado con `noindex, nofollow`.
5. Comprobar `curl -I URL_ANTIGUA`: 301 y Location correcto; la URL final debe responder 200 con canonical de producción.
6. Conservar las reglas mientras existan enlaces o tráfico hacia las URLs antiguas.

No se modificó ningún servidor ni el sitio publicado como parte de esta preparación local.
