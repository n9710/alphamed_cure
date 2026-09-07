import prisma from './prisma';
import { isUserVerified } from './auth';
import { INITIAL_CATEGORIES } from '@/data/categories';
import { INITIAL_PRODUCTS } from '@/data/products';

/**
 * Fetch products with price security.
 * Only verified customers or administrators can retrieve pricing details.
 * Falls back gracefully to structured development data if the database is not yet seeded.
 */
export async function getProducts({
  categorySlug,
  query,
  featured,
  page = 1,
  limit = 20,
  user = null,
} = {}) {
  const canSeePrices = isUserVerified(user);
  const skip = (page - 1) * limit;

  try {
    const where = {
      isActive: true,
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      ...(featured !== undefined ? { isFeatured: featured } : {}),
      ...(query
        ? {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { sku: { contains: query, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          slug: true,
          sku: true,
          shortDesc: true,
          isFeatured: true,
          images: true,
          tags: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          ...(canSeePrices
            ? {
                price: {
                  select: {
                    priceINR: true,
                    priceUSD: true,
                    unit: true,
                    minOrderQty: true,
                  },
                },
              }
            : {}),
        },
      }),
      prisma.product.count({ where }),
    ]);

    // If database has records, return them
    if (total > 0) {
      return {
        products,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        canSeePrices,
      };
    }
  } catch (err) {
    console.warn('Prisma getProducts query error or unseeded DB, using development data:', err.message);
  }

  // Fallback to development data
  let filtered = [...INITIAL_PRODUCTS];

  if (categorySlug) {
    filtered = filtered.filter((p) => p.categorySlug === categorySlug);
  }

  if (featured !== undefined) {
    filtered = filtered.filter((p) => p.isFeatured === featured);
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const paginated = filtered.slice(skip, skip + limit).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    sku: p.sku,
    shortDesc: p.shortDesc,
    isFeatured: p.isFeatured,
    images: p.images,
    tags: p.tags,
    category: {
      name: p.categoryName,
      slug: p.categorySlug,
    },
    // Price security: NEVER attach price to fallback data for unverified
    ...(canSeePrices
      ? {
          price: {
            priceINR: 1250,
            priceUSD: 15,
            unit: 'Box',
            minOrderQty: 10,
          },
        }
      : {}),
  }));

  return {
    products: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit) || 1,
    canSeePrices,
  };
}

/**
 * Fetch single product details by slug with price security.
 */
export async function getProductBySlug(slug, user = null) {
  const canSeePrices = isUserVerified(user);

  try {
    const product = await prisma.product.findUnique({
      where: { slug, isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        sku: true,
        description: true,
        shortDesc: true,
        isFeatured: true,
        images: true,
        specifications: true,
        tags: true,
        seoTitle: true,
        seoDescription: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        ...(canSeePrices
          ? {
              price: {
                select: {
                  priceINR: true,
                  priceUSD: true,
                  unit: true,
                  minOrderQty: true,
                },
              },
            }
          : {}),
      },
    });

    if (product) {
      return {
        ...product,
        canSeePrices,
      };
    }
  } catch (err) {
    console.warn('Prisma getProductBySlug query error or unseeded DB:', err.message);
  }

  // Fallback to development data
  const fallback = INITIAL_PRODUCTS.find((p) => p.slug === slug);
  if (!fallback) return null;

  return {
    id: fallback.id,
    name: fallback.name,
    slug: fallback.slug,
    sku: fallback.sku,
    description: fallback.description,
    shortDesc: fallback.shortDesc,
    isFeatured: fallback.isFeatured,
    images: fallback.images,
    specifications: fallback.specifications,
    tags: fallback.tags,
    seoTitle: `${fallback.name} | Alphamed Cure`,
    seoDescription: fallback.shortDesc,
    category: {
      name: fallback.categoryName,
      slug: fallback.categorySlug,
    },
    canSeePrices,
    ...(canSeePrices
      ? {
          price: {
            priceINR: 1250,
            priceUSD: 15,
            unit: 'Box',
            minOrderQty: 10,
          },
        }
      : {}),
  };
}

/**
 * Fetch all active categories with product counts.
 */
export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { products: { where: { isActive: true } } },
        },
      },
    });

    if (categories.length > 0) {
      return categories;
    }
  } catch (err) {
    console.warn('Prisma getCategories query error or unseeded DB:', err.message);
  }

  // Fallback to development categories with counts from INITIAL_PRODUCTS
  return INITIAL_CATEGORIES.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    icon: cat.icon,
    sortOrder: cat.sortOrder,
    _count: {
      products: INITIAL_PRODUCTS.filter((p) => p.categorySlug === cat.slug).length,
    },
  }));
}
