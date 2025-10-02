import { Link, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

interface ProductCardProps {
    product: {
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
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const { locale } = usePage<SharedData & { locale: string }>().props;

    return (
        <Link
            href={`/${locale}/products/${product.slug}`}
            className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
            <div className="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                {product.media[0] ? (
                    <img
                        src={`/storage/${product.media[0].path}`}
                        alt={product.name}
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
                        {product.category.name}
                    </span>
                    {product.rating && (
                        <div className="flex items-center text-sm">
                            <svg
                                className="mr-1 h-4 w-4 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                {product.rating.toFixed(1)} ({product.reviews_count})
                            </span>
                        </div>
                    )}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {product.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                    {product.price && (
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ${product.price}
                        </span>
                    )}
                    <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 dark:text-blue-400">
                        {locale === 'id' ? 'Lihat Detail' : 'View Details'} →
                    </span>
                </div>
            </div>
        </Link>
    );
}
