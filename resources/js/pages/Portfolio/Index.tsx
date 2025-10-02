import { Head, usePage } from '@inertiajs/react';
import { GuestLayout } from '@/Components/Layout/GuestLayout';
import { PortfolioCard } from '@/Components/Portfolio/PortfolioCard';
import { PortfolioFilters } from '@/Components/Portfolio/PortfolioFilters';
import { SharedData } from '@/types';

interface Portfolio {
    id: number;
    title: string;
    slug: string;
    description: string;
    type: 'custom_project' | 'envato_product';
    category: {
        name: string;
    };
    technologies: Array<{
        name: string;
    }>;
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

interface Technology {
    id: number;
    name: string;
    slug: string;
}

interface PortfolioIndexProps {
    portfolios: {
        data: Portfolio[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
    technologies: Technology[];
    filters: {
        category?: string;
        technology?: string;
        type?: string;
    };
}

export default function PortfolioIndex({
    portfolios,
    categories,
    technologies,
    filters,
}: PortfolioIndexProps) {
    const { locale } = usePage<SharedData & { locale: string }>().props;

    return (
        <GuestLayout>
            <Head title="Portfolio" />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            {locale === 'id' ? 'Portofolio Kami' : 'Our Portfolio'}
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                            {locale === 'id'
                                ? 'Jelajahi proyek dan produk yang telah kami kerjakan'
                                : 'Explore the projects and products we have worked on'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="bg-gray-50 py-12 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Filters */}
                    <PortfolioFilters
                        categories={categories}
                        technologies={technologies}
                        filters={filters}
                    />

                    {/* Results Count */}
                    <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                        {locale === 'id'
                            ? `Menampilkan ${portfolios.data.length} dari ${portfolios.total} proyek`
                            : `Showing ${portfolios.data.length} of ${portfolios.total} projects`}
                    </div>

                    {/* Portfolio Grid */}
                    {portfolios.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {portfolios.data.map((portfolio) => (
                                    <PortfolioCard key={portfolio.id} portfolio={portfolio} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {portfolios.last_page > 1 && (
                                <div className="mt-12 flex items-center justify-center space-x-2">
                                    {Array.from({ length: portfolios.last_page }, (_, i) => i + 1).map(
                                        (page) => (
                                            <a
                                                key={page}
                                                href={`/${locale}/portfolio?page=${page}${filters.category ? `&category=${filters.category}` : ''}${filters.technology ? `&technology=${filters.technology}` : ''}${filters.type ? `&type=${filters.type}` : ''}`}
                                                className={`rounded-md px-4 py-2 text-sm font-medium ${
                                                    page === portfolios.current_page
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                                }`}
                                            >
                                                {page}
                                            </a>
                                        ),
                                    )}
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
                                {locale === 'id' ? 'Tidak ada proyek ditemukan' : 'No projects found'}
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
