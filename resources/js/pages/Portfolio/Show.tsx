import { Head, Link, usePage } from '@inertiajs/react';
import { GuestLayout } from '@/Components/Layout/GuestLayout';
import { SharedData } from '@/types';

interface Portfolio {
    id: number;
    title: string;
    slug: string;
    description: string;
    type: 'custom_project' | 'envato_product';
    industry: string | null;
    challenge: string | null;
    solution: string | null;
    results: Record<string, string> | null;
    duration: string | null;
    client_name: string | null;
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

interface PortfolioShowProps {
    portfolio: Portfolio;
    related_projects: Portfolio[];
    envato_url?: string;
}

export default function PortfolioShow({ portfolio, related_projects, envato_url }: PortfolioShowProps) {
    const { locale } = usePage<SharedData & { locale: string }>().props;

    const handleEnvatoClick = () => {
        if (envato_url) {
            // Track GA4 event
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'envato_redirect', {
                    product_id: portfolio.id,
                    product_name: portfolio.title,
                });
            }
            window.open(envato_url, '_blank');
        }
    };

    return (
        <GuestLayout>
            <Head title={portfolio.title} />

            {/* Breadcrumb */}
            <section className="bg-gray-100 py-4 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex text-sm text-gray-500 dark:text-gray-400">
                        <Link href={`/${locale}`} className="hover:text-gray-700 dark:hover:text-gray-200">
                            {locale === 'id' ? 'Beranda' : 'Home'}
                        </Link>
                        <span className="mx-2">/</span>
                        <Link href={`/${locale}/portfolio`} className="hover:text-gray-700 dark:hover:text-gray-200">
                            Portfolio
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 dark:text-white">{portfolio.title}</span>
                    </nav>
                </div>
            </section>

            {/* Project Header */}
            <section className="bg-white py-12 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Project Info */}
                        <div>
                            <div className="mb-4 flex items-center space-x-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {portfolio.category.name}
                                </span>
                                {portfolio.type === 'envato_product' && (
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {locale === 'id' ? 'Tersedia di Envato' : 'Available on Envato'}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                                {portfolio.title}
                            </h1>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                                {portfolio.description}
                            </p>

                            {/* Project Meta */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {portfolio.client_name && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {locale === 'id' ? 'Klien' : 'Client'}
                                        </p>
                                        <p className="mt-1 text-base text-gray-900 dark:text-white">
                                            {portfolio.client_name}
                                        </p>
                                    </div>
                                )}
                                {portfolio.industry && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {locale === 'id' ? 'Industri' : 'Industry'}
                                        </p>
                                        <p className="mt-1 text-base text-gray-900 dark:text-white">
                                            {portfolio.industry}
                                        </p>
                                    </div>
                                )}
                                {portfolio.duration && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {locale === 'id' ? 'Durasi' : 'Duration'}
                                        </p>
                                        <p className="mt-1 text-base text-gray-900 dark:text-white">
                                            {portfolio.duration}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Technologies */}
                            <div className="mt-8">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {locale === 'id' ? 'Teknologi yang Digunakan' : 'Technologies Used'}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {portfolio.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                        >
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="mt-8 flex space-x-4">
                                {envato_url && (
                                    <button
                                        onClick={handleEnvatoClick}
                                        className="inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                                    >
                                        {locale === 'id' ? 'Beli di Envato' : 'Buy on Envato'}
                                    </button>
                                )}
                                <Link
                                    href={`/${locale}/contact?service_interest=${portfolio.type === 'envato_product' ? 'Template Customization' : 'Custom Development'}&product=${portfolio.title}`}
                                    className="inline-block rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    {locale === 'id' ? 'Minta Kustom' : 'Request Customization'}
                                </Link>
                            </div>
                        </div>

                        {/* Project Images */}
                        <div className="space-y-4">
                            {portfolio.media.map((media, index) => (
                                <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                    <img
                                        src={`/storage/${media.path}`}
                                        alt={`${portfolio.title} - Image ${index + 1}`}
                                        className="w-full"
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenge, Solution, Results */}
            {(portfolio.challenge || portfolio.solution || portfolio.results) && (
                <section className="bg-gray-50 py-12 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {portfolio.challenge && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {locale === 'id' ? 'Tantangan' : 'Challenge'}
                                    </h2>
                                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                                        {portfolio.challenge}
                                    </p>
                                </div>
                            )}
                            {portfolio.solution && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {locale === 'id' ? 'Solusi' : 'Solution'}
                                    </h2>
                                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                                        {portfolio.solution}
                                    </p>
                                </div>
                            )}
                            {portfolio.results && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {locale === 'id' ? 'Hasil' : 'Results'}
                                    </h2>
                                    <ul className="mt-4 space-y-2">
                                        {Object.entries(portfolio.results).map(([key, value], index) => (
                                            <li key={index} className="text-gray-600 dark:text-gray-400">
                                                <span className="font-medium">{key}:</span> {value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Projects */}
            {related_projects.length > 0 && (
                <section className="bg-white py-12 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {locale === 'id' ? 'Proyek Terkait' : 'Related Projects'}
                        </h2>
                        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {related_projects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/${locale}/portfolio/${project.slug}`}
                                    className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <div className="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                                        {project.media[0] && (
                                            <img
                                                src={`/storage/${project.media[0].path}`}
                                                alt={project.title}
                                                className="h-full w-full object-cover transition group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {project.title}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                            {project.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </GuestLayout>
    );
}
