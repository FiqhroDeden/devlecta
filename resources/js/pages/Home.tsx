import { Head, Link, usePage } from '@inertiajs/react';
import { GuestLayout } from '@/Components/Layout/GuestLayout';
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

interface Testimonial {
    id: number;
    client_name: string;
    company: string | null;
    role: string | null;
    text: string;
    rating: number;
    avatar_path: string | null;
}

interface HomeProps {
    featured_portfolio: Portfolio[];
    testimonials: Testimonial[];
}

export default function Home({ featured_portfolio, testimonials }: HomeProps) {
    const { locale } = usePage<SharedData & { locale: string }>().props;

    return (
        <GuestLayout>
            <Head title={locale === 'id' ? 'Beranda' : 'Home'} />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                            {locale === 'id'
                                ? 'Membangun Solusi Digital Terbaik'
                                : 'Building the Best Digital Solutions'}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                            {locale === 'id'
                                ? 'Agensi web profesional yang mengkhususkan diri dalam pengembangan kustom dan produk digital berkualitas tinggi untuk bisnis Anda.'
                                : 'Professional web agency specializing in custom development and high-quality digital products for your business.'}
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href={`/${locale}/contact`}
                                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                {locale === 'id' ? 'Mulai Proyek' : 'Start a Project'}
                            </Link>
                            <Link
                                href={`/${locale}/portfolio`}
                                className="text-base font-semibold leading-6 text-white hover:text-blue-100"
                            >
                                {locale === 'id' ? 'Lihat Portfolio' : 'View Portfolio'}{' '}
                                <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="bg-white py-16 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            {locale === 'id' ? 'Layanan Kami' : 'Our Services'}
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            {locale === 'id'
                                ? 'Kami menawarkan solusi lengkap untuk kebutuhan digital Anda'
                                : 'We offer comprehensive solutions for your digital needs'}
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {locale === 'id' ? 'Pengembangan Kustom' : 'Custom Development'}
                            </h3>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                {locale === 'id'
                                    ? 'Solusi web dan mobile yang disesuaikan dengan kebutuhan bisnis Anda.'
                                    : 'Tailored web and mobile solutions designed for your business needs.'}
                            </p>
                            <Link
                                href={`/${locale}/services`}
                                className="mt-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
                            >
                                {locale === 'id' ? 'Pelajari Lebih Lanjut' : 'Learn More'} →
                            </Link>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {locale === 'id' ? 'Produk Digital' : 'Digital Products'}
                            </h3>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                {locale === 'id'
                                    ? 'Template dan plugin premium yang tersedia di marketplace Envato.'
                                    : 'Premium templates and plugins available on the Envato marketplace.'}
                            </p>
                            <Link
                                href={`/${locale}/products`}
                                className="mt-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
                            >
                                {locale === 'id' ? 'Lihat Produk' : 'View Products'} →
                            </Link>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {locale === 'id' ? 'Konsultasi & Dukungan' : 'Consulting & Support'}
                            </h3>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                {locale === 'id'
                                    ? 'Panduan ahli dan dukungan teknis untuk proyek Anda.'
                                    : 'Expert guidance and technical support for your projects.'}
                            </p>
                            <Link
                                href={`/${locale}/contact`}
                                className="mt-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
                            >
                                {locale === 'id' ? 'Hubungi Kami' : 'Contact Us'} →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Portfolio */}
            <section className="bg-gray-50 py-16 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            {locale === 'id' ? 'Proyek Unggulan' : 'Featured Projects'}
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            {locale === 'id'
                                ? 'Lihat beberapa proyek terbaik yang telah kami selesaikan'
                                : 'Check out some of the best projects we have completed'}
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featured_portfolio.map((project) => (
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
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {project.category.name}
                                        </span>
                                        {project.type === 'envato_product' && (
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                {locale === 'id' ? 'Tersedia di Envato' : 'Available on Envato'}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        {project.title}
                                    </h3>
                                    <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                        {project.description}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.technologies.slice(0, 3).map((tech, index) => (
                                            <span
                                                key={index}
                                                className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                            >
                                                {tech.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Link
                            href={`/${locale}/portfolio`}
                            className="inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            {locale === 'id' ? 'Lihat Semua Proyek' : 'View All Projects'}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {testimonials.length > 0 && (
                <section className="bg-white py-16 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                {locale === 'id' ? 'Apa Kata Klien Kami' : 'What Our Clients Say'}
                            </h2>
                        </div>
                        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900"
                                >
                                    <div className="flex items-center">
                                        {testimonial.avatar_path ? (
                                            <img
                                                src={`/storage/${testimonial.avatar_path}`}
                                                alt={testimonial.client_name}
                                                className="h-12 w-12 rounded-full"
                                            />
                                        ) : (
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                                                {testimonial.client_name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <div className="ml-4">
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {testimonial.client_name}
                                            </p>
                                            {testimonial.role && testimonial.company && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {testimonial.role} at {testimonial.company}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                                        "{testimonial.text}"
                                    </p>
                                    <div className="mt-4 flex text-yellow-400">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="bg-blue-600 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        {locale === 'id'
                            ? 'Siap Memulai Proyek Anda?'
                            : 'Ready to Start Your Project?'}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                        {locale === 'id'
                            ? 'Hubungi kami hari ini dan mari diskusikan bagaimana kami dapat membantu mewujudkan visi digital Anda.'
                            : "Contact us today and let's discuss how we can help bring your digital vision to life."}
                    </p>
                    <div className="mt-8">
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-block rounded-md bg-white px-8 py-3 text-base font-semibold text-blue-600 hover:bg-blue-50"
                        >
                            {locale === 'id' ? 'Hubungi Kami' : 'Contact Us'}
                        </Link>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
