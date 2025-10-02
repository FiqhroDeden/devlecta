import { Head, Link, router, usePage } from '@inertiajs/react';
import { GuestLayout } from '@/Components/Layout/GuestLayout';
import { ProductCard } from '@/Components/Products/ProductCard';
import { SharedData } from '@/types';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number | null;
    rating: number | null;
    reviews_count: number;
    category: {
        name: string;
    };
    media: Array<{
        path: string;
        type: string;
    }>;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface ProductsIndexProps {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
    filters: {
        category?: string;
    };
}

export default function ProductsIndex({ products, categories, filters }: ProductsIndexProps) {
    const { locale } = usePage<SharedData & { locale: string }>().props;

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters };

        if (value === '') {
            delete newFilters[key as keyof typeof filters];
        } else {
            newFilters[key as keyof typeof filters] = value;
        }

        router.get(`/${locale}/products`, newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        router.get(`/${locale}/products`, {}, {
            preserveState: false,
        });
    };

    const hasActiveFilters = Object.keys(filters).length > 0;

    return (
        <GuestLayout>
            <Head title={locale === 'id' ? 'Produk' : 'Products'} />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            {locale === 'id' ? 'Produk Digital Kami' : 'Our Digital Products'}
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                            {locale === 'id'
                                ? 'Template dan plugin premium yang tersedia di marketplace Envato'
                                : 'Premium templates and plugins available on the Envato marketplace'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="bg-gray-50 py-12 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Category Filter */}
                            <div className="flex-1 min-w-[200px]">
                                <label
                                    htmlFor="category"
                                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    {locale === 'id' ? 'Kategori' : 'Category'}
                                </label>
                                <select
                                    id="category"
                                    value={filters.category || ''}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">
                                        {locale === 'id' ? 'Semua Kategori' : 'All Categories'}
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.slug}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Clear Filters Button */}
                            {hasActiveFilters && (
                                <div className="flex items-end">
                                    <button
                                        onClick={clearFilters}
                                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        {locale === 'id' ? 'Hapus Filter' : 'Clear Filters'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                        {locale === 'id'
                            ? `Menampilkan ${products.data.length} dari ${products.total} produk`
                            : `Showing ${products.data.length} of ${products.total} products`}
                    </div>

                    {/* Products Grid */}
                    {products.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {products.data.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {products.last_page > 1 && (
                                <div className="mt-12 flex items-center justify-center space-x-2">
                                    {Array.from({ length: products.last_page }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={`/${locale}/products?page=${page}${filters.category ? `&category=${filters.category}` : ''}`}
                                            className={`rounded-md px-4 py-2 text-sm font-medium ${
                                                page === products.current_page
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            {page}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-12 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                {locale === 'id' ? 'Tidak ada produk ditemukan' : 'No products found'}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {locale === 'id'
                                    ? 'Coba ubah filter pencarian Anda'
                                    : 'Try changing your search filters'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
