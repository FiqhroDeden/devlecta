import { Link, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

interface PortfolioCardProps {
    portfolio: {
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
    };
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
    const { locale } = usePage<SharedData & { locale: string }>().props;

    return (
        <Link
            href={`/${locale}/portfolio/${portfolio.slug}`}
            className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
            <div className="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                {portfolio.media[0] ? (
                    <img
                        src={`/storage/${portfolio.media[0].path}`}
                        alt={portfolio.title}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                        <svg
                            className="h-16 w-16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                )}
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {portfolio.category.name}
                    </span>
                    {portfolio.type === 'envato_product' && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {locale === 'id' ? 'Tersedia di Envato' : 'Available on Envato'}
                        </span>
                    )}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {portfolio.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {portfolio.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {portfolio.technologies.slice(0, 3).map((tech, index) => (
                        <span
                            key={index}
                            className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                            {tech.name}
                        </span>
                    ))}
                    {portfolio.technologies.length > 3 && (
                        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            +{portfolio.technologies.length - 3}
                        </span>
                    )}
                </div>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:text-blue-700 dark:text-blue-400">
                    {locale === 'id' ? 'Lihat Detail' : 'View Details'} →
                </div>
            </div>
        </Link>
    );
}
