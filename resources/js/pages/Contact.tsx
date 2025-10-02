import { Head, usePage } from '@inertiajs/react';
import { GuestLayout } from '@/Components/Layout/GuestLayout';
import { ContactForm } from '@/Components/Forms/ContactForm';
import { SharedData } from '@/types';

interface ContactProps {
    service_interest?: string;
    product?: string;
}

export default function Contact({ service_interest, product }: ContactProps) {
    const { locale, flash } = usePage<SharedData & { locale: string; flash: { success?: string; error?: string } }>()
        .props;

    return (
        <GuestLayout>
            <Head title={locale === 'id' ? 'Kontak' : 'Contact'}>
                <script src={`https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`} />
            </Head>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            {locale === 'id' ? 'Hubungi Kami' : 'Contact Us'}
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                            {locale === 'id'
                                ? 'Mari diskusikan proyek Anda dan lihat bagaimana kami dapat membantu'
                                : "Let's discuss your project and see how we can help"}
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="bg-gray-50 py-12 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {locale === 'id' ? 'Informasi Kontak' : 'Contact Information'}
                                </h2>
                                <p className="mt-4 text-gray-600 dark:text-gray-400">
                                    {locale === 'id'
                                        ? 'Hubungi kami melalui formulir atau langsung ke kontak di bawah ini'
                                        : 'Contact us via the form or directly through the contacts below'}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <svg
                                        className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Email</p>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">info@devlecta.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg
                                        className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {locale === 'id' ? 'Alamat' : 'Address'}
                                        </p>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                                            {locale === 'id'
                                                ? 'Jakarta, Indonesia'
                                                : 'Jakarta, Indonesia'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg
                                        className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {locale === 'id' ? 'Jam Kerja' : 'Business Hours'}
                                        </p>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                                            {locale === 'id'
                                                ? 'Senin - Jumat: 9:00 - 18:00 WIB'
                                                : 'Monday - Friday: 9:00 AM - 6:00 PM WIB'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                {flash?.success && (
                                    <div className="mb-6 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                                        <p className="text-sm text-green-800 dark:text-green-200">{flash.success}</p>
                                    </div>
                                )}
                                {flash?.error && (
                                    <div className="mb-6 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                                        <p className="text-sm text-red-800 dark:text-red-200">{flash.error}</p>
                                    </div>
                                )}
                                <ContactForm serviceInterest={service_interest} product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
