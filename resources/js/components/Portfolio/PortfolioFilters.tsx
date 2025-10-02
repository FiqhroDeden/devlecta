import { router, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

interface PortfolioFiltersProps {
    categories: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    technologies: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    filters: {
        category?: string;
        technology?: string;
        type?: string;
    };
}

export function PortfolioFilters({ categories, technologies, filters }: PortfolioFiltersProps) {
    const { locale } = usePage<SharedData & { locale: string }>().props;

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters };

        if (value === '') {
            delete newFilters[key as keyof typeof filters];
        } else {
            newFilters[key as keyof typeof filters] = value;
        }

        router.get(`/${locale}/portfolio`, newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        router.get(`/${locale}/portfolio`, {}, {
            preserveState: false,
        });
    };

    const hasActiveFilters = Object.keys(filters).length > 0;

    return (
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

                {/* Technology Filter */}
                <div className="flex-1 min-w-[200px]">
                    <label
                        htmlFor="technology"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        {locale === 'id' ? 'Teknologi' : 'Technology'}
                    </label>
                    <select
                        id="technology"
                        value={filters.technology || ''}
                        onChange={(e) => handleFilterChange('technology', e.target.value)}
                        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">
                            {locale === 'id' ? 'Semua Teknologi' : 'All Technologies'}
                        </option>
                        {technologies.map((technology) => (
                            <option key={technology.id} value={technology.slug}>
                                {technology.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Type Filter */}
                <div className="flex-1 min-w-[200px]">
                    <label
                        htmlFor="type"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        {locale === 'id' ? 'Tipe' : 'Type'}
                    </label>
                    <select
                        id="type"
                        value={filters.type || ''}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">{locale === 'id' ? 'Semua Tipe' : 'All Types'}</option>
                        <option value="custom_project">
                            {locale === 'id' ? 'Proyek Kustom' : 'Custom Project'}
                        </option>
                        <option value="envato_product">
                            {locale === 'id' ? 'Produk Envato' : 'Envato Product'}
                        </option>
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
    );
}
