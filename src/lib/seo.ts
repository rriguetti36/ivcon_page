import empresa from '../data/empresa.json';

export const siteUrl = import.meta.env.SITE!.replace(/\/$/, '');
export const indexable = !import.meta.env.DEV && import.meta.env.SITE_INDEXABLE === true;
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).href;
export const organizationId = `${siteUrl}/#organization`;
export const organizationSchema = {
  '@type': empresa.direccion ? 'GeneralContractor' : 'Organization',
  '@id': organizationId,
  name: empresa.nombre,
  url: `${siteUrl}/`,
  description: 'Impermeabilización de techos, azoteas y proyectos industriales en Lima y todo el Perú.',
  logo: absoluteUrl('/imagenes/logo-web.webp'),
  areaServed: [{ '@type': 'Country', name: 'Perú' }, { '@type': 'City', name: 'Lima' }],
  ...(empresa.telefono ? { telephone: empresa.telefono } : {}),
  ...(empresa.correo ? { email: empresa.correo } : {}),
  ...(empresa.direccion ? { address: { '@type': 'PostalAddress', streetAddress: empresa.direccion, addressCountry: 'PE' } } : {}),
  ...(empresa.googleMaps ? { sameAs: [empresa.googleMaps] } : {}),
};

export type Breadcrumb = { name: string; path: string };
export const breadcrumbSchema = (items: Breadcrumb[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem', position: i + 1, name: item.name, item: absoluteUrl(item.path),
  })),
});
