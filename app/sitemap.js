import { getCategories } from '@/lib/products';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alphamedcure.com';

  let categories = [];
  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  const staticRoutes = [
    '',
    '/products',
    '/services',
    '/about',
    '/compliance',
    '/contact',
    '/terms',
    '/privacy',
    '/cookies',
    '/login',
    '/register',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/products' || route === '/services' ? 0.9 : 0.7,
  }));

  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/products?category=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
