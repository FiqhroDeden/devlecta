import { Head, Link, usePage } from '@inertiajs/react';
import { GuestLayout } from '@/Components/Layout/GuestLayout';
import { SharedData } from '@/types';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number | null;
    envato_url: string;
    rating: number | null;
    reviews_count: number;
    demo_link: string | null;
    docs_link: string | null;
    features: string[] | null;
    changelog: Array<{ version: string; changes: string }> | null;
    category: {
        name: string;
    };
    media: Array<{
        path: string;
        type: string;
    }>;
}

interface ProductShowProps {
    product: Product;
    related_products: Product[];
}

export default function ProductShow({ product, related_products }: ProductShowProps) {
    const { locale } = usePage<SharedData & { locale: string }>().props;

    const handleEnvatoClick = () => {
        // Track GA4 event
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'envato_redirect', {
                product_id: product.id,
                product_name: product.name,
            });
        }
        window.open(product.envato_url, '_blank');
    };

    return (
        <GuestLayout>
            <Head title={product.name} />

            {/* Breadcrumb */}
            <section className="bg-gray-100 py-4 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex text-sm text-gray-500 dark:text-gray-400">
                        <Link href={`/${locale}`} className="hover:text-gray-700 dark:hover:text-gray-200">
                            {locale === 'id' ? 'Beranda' : 'Home'}
                        </Link>
                        <span className="mx-2">/</span>
                        <Link href={`/${locale}/products`} className="hover:text-gray-700 dark:hover:text-gray-200">
                            {locale === 'id' ? 'Produk' : 'Products'}
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 dark:text-white">{product.name}</span>
                    </nav>
                </div>
            </section>

            {/* Product Header */}
            <section className="bg-white py-12 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Product Info */}
                        <div>
                            <div className="mb-4 flex items-center space-x-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {product.category.name}
                                </span>
                                {product.rating && (
                                    <div className="flex items-center">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`h-5 w-5 ${i < Math.floor(product.rating!) ? 'fill-current' : 'fill-gray-300'}`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            {product.rating.toFixed(1)} ({product.reviews_count}{' '}
                                            {locale === 'id' ? 'ulasan' : 'reviews'})
                                        </span>
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                            {product.price && (
                                <p className="mt-4 text-3xl font-bold text-blue-600">${product.price}</p>
                            )}
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{product.description}</p>

                            {/* Features */}
                            {product.features && product.features.length > 0 && (
                                <div className="mt-8">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {locale === 'id' ? 'Fitur Utama' : 'Key Features'}
                                    </h2>
                                    <ul className="mt-4 space-y-2">
                                        {product.features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                                            >
                                                <svg
                                                    className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTA Buttons */}
                            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <button
                                    onClick={handleEnvatoClick}
                                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-semibold text-white hover:bg-blue-700"
                                >
                                    <svg
                                        className="mr-2 h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    {locale === 'id' ? 'Beli di Envato' : 'Buy on Envato'}
                                </button>
                                {product.demo_link && (
                                    <a
                                        href={product.demo_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        <svg
                                            className="mr-2 h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                        {locale === 'id' ? 'Lihat Demo' : 'View Demo'}
                                    </a>
                                )}
                                <Link
                                    href={`/${locale}/contact?service_interest=Template Customization&product=${product.name}`}
                                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    {locale === 'id' ? 'Minta Kustomisasi' : 'Request Customization'}
                                </Link>
                            </div>

                            {product.docs_link && (
                                <div className="mt-4">
                                    <a
                                        href={product.docs_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                    >
                                        {locale === 'id' ? '📖 Lihat Dokumentasi' : '📖 View Documentation'}
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Product Images */}
                        <div className="space-y-4">
                            {product.media.map((media, index) => (
                                <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                    <img
                                        src={`/storage/${media.path}`}
                                        alt={`${product.name} - Screenshot ${index + 1}`}
                                        className="w-full"
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Changelog */}
            {product.changelog && product.changelog.length > 0 && (
                <section className="bg-gray-50 py-12 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {locale === 'id' ? 'Riwayat Perubahan' : 'Changelog'}
                        </h2>
                        <div className="mt-6 space-y-6">
                            {product.changelog.map((entry, index) => (
                                <div key={index} className="border-l-4 border-blue-600 pl-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {locale === 'id' ? 'Versi' : 'Version'} {entry.version}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{entry.changes}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Products */}
            {related_products.length > 0 && (
                <section className="bg-white py-12 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {locale === 'id' ? 'Produk Terkait' : 'Related Products'}
                        </h2>
                        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {related_products.map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    href={`/${locale}/products/${relatedProduct.slug}`}
                                    className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <div className="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                                        {relatedProduct.media[0] && (
                                            <img
                                                src={`/storage/${relatedProduct.media[0].path}`}
                                                alt={relatedProduct.name}
                                                className="h-full w-full object-cover transition group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {relatedProduct.name}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                            {relatedProduct.description}
                                        </p>
                                        {relatedProduct.price && (
                                            <p className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                                                ${relatedProduct.price}
                                            </p>
                                        )}
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
