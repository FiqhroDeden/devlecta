import { Link, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

interface GuestLayoutProps {
    children: React.ReactNode;
}

export function GuestLayout({ children }: GuestLayoutProps) {
    const { locale } = usePage<SharedData & { locale: string }>().props;

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link
                                href={`/${locale}`}
                                className="text-xl font-bold text-gray-900 dark:text-white"
                            >
                                Devlecta
                            </Link>
                        </div>

                        {/* Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-8">
                            <Link
                                href={`/${locale}`}
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                {locale === 'id' ? 'Beranda' : 'Home'}
                            </Link>
                            <Link
                                href={`/${locale}/services`}
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                {locale === 'id' ? 'Layanan' : 'Services'}
                            </Link>
                            <Link
                                href={`/${locale}/portfolio`}
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                Portfolio
                            </Link>
                            <Link
                                href={`/${locale}/products`}
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                {locale === 'id' ? 'Produk' : 'Products'}
                            </Link>
                            <Link
                                href={`/${locale}/about`}
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                {locale === 'id' ? 'Tentang' : 'About'}
                            </Link>
                            <Link
                                href={`/${locale}/contact`}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                {locale === 'id' ? 'Kontak' : 'Contact'}
                            </Link>
                        </div>

                        {/* Language Toggle */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href={locale === 'en' ? '/id' : '/en'}
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                {locale === 'en' ? 'ID' : 'EN'}
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        {/* Company Info */}
                        <div className="col-span-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Devlecta
                            </h3>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                {locale === 'id'
                                    ? 'Agensi web profesional yang mengkhususkan diri dalam pengembangan kustom dan produk digital.'
                                    : 'Professional web agency specializing in custom development and digital products.'}
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                                {locale === 'id' ? 'Tautan Cepat' : 'Quick Links'}
                            </h4>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link
                                        href={`/${locale}/services`}
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        {locale === 'id' ? 'Layanan' : 'Services'}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/${locale}/portfolio`}
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Portfolio
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/${locale}/products`}
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        {locale === 'id' ? 'Produk' : 'Products'}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                                {locale === 'id' ? 'Kontak' : 'Contact'}
                            </h4>
                            <ul className="mt-4 space-y-2">
                                <li className="text-sm text-gray-600 dark:text-gray-400">
                                    info@devlecta.com
                                </li>
                                <li>
                                    <Link
                                        href={`/${locale}/contact`}
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        {locale === 'id' ? 'Formulir Kontak' : 'Contact Form'}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                                {locale === 'id' ? 'Hukum' : 'Legal'}
                            </h4>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link
                                        href={`/${locale}/privacy`}
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        {locale === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/${locale}/terms`}
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        {locale === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions'}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            © {new Date().getFullYear()} Devlecta. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
