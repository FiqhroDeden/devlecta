import { Head, Link, usePage } from '@inertiajs/react';
import { GuestLayout } from '@/Components/Layout/GuestLayout';
import { SharedData } from '@/types';

export default function Services() {
    const { locale } = usePage<SharedData & { locale: string }>().props;

    const services = [
        {
            title: locale === 'id' ? 'Pengembangan Web' : 'Web Development',
            description:
                locale === 'id'
                    ? 'Aplikasi web kustom yang dibangun dengan Laravel, React, dan teknologi modern lainnya.'
                    : 'Custom web applications built with Laravel, React, and other modern technologies.',
            features: [
                locale === 'id' ? 'Arsitektur skalabel' : 'Scalable architecture',
                locale === 'id' ? 'Desain responsif' : 'Responsive design',
                locale === 'id' ? 'Kinerja optimal' : 'Optimal performance',
                locale === 'id' ? 'Keamanan terbaik' : 'Best-in-class security',
            ],
        },
        {
            title: locale === 'id' ? 'Pengembangan Mobile' : 'Mobile Development',
            description:
                locale === 'id'
                    ? 'Aplikasi mobile native dan cross-platform untuk iOS dan Android.'
                    : 'Native and cross-platform mobile apps for iOS and Android.',
            features: [
                locale === 'id' ? 'UI/UX intuitif' : 'Intuitive UI/UX',
                locale === 'id' ? 'Performa tinggi' : 'High performance',
                locale === 'id' ? 'Integrasi API' : 'API integration',
                locale === 'id' ? 'Notifikasi push' : 'Push notifications',
            ],
        },
        {
            title: locale === 'id' ? 'E-commerce' : 'E-commerce Solutions',
            description:
                locale === 'id'
                    ? 'Platform e-commerce lengkap dengan manajemen produk, pembayaran, dan pengiriman.'
                    : 'Complete e-commerce platforms with product management, payments, and shipping.',
            features: [
                locale === 'id' ? 'Gateway pembayaran' : 'Payment gateways',
                locale === 'id' ? 'Manajemen inventori' : 'Inventory management',
                locale === 'id' ? 'Integrasi pengiriman' : 'Shipping integration',
                locale === 'id' ? 'Analitik & laporan' : 'Analytics & reporting',
            ],
        },
        {
            title: locale === 'id' ? 'UI/UX Design' : 'UI/UX Design',
            description:
                locale === 'id'
                    ? 'Desain antarmuka yang menarik dan pengalaman pengguna yang intuitif.'
                    : 'Beautiful interface designs and intuitive user experiences.',
            features: [
                locale === 'id' ? 'Penelitian pengguna' : 'User research',
                locale === 'id' ? 'Wireframing & prototyping' : 'Wireframing & prototyping',
                locale === 'id' ? 'Desain visual' : 'Visual design',
                locale === 'id' ? 'Pengujian usability' : 'Usability testing',
            ],
        },
        {
            title: locale === 'id' ? 'Konsultasi Teknis' : 'Technical Consulting',
            description:
                locale === 'id'
                    ? 'Panduan ahli untuk arsitektur, skalabilitas, dan best practices.'
                    : 'Expert guidance on architecture, scalability, and best practices.',
            features: [
                locale === 'id' ? 'Audit kode' : 'Code audits',
                locale === 'id' ? 'Review arsitektur' : 'Architecture review',
                locale === 'id' ? 'Optimasi performa' : 'Performance optimization',
                locale === 'id' ? 'Pelatihan tim' : 'Team training',
            ],
        },
        {
            title: locale === 'id' ? 'Pemeliharaan & Dukungan' : 'Maintenance & Support',
            description:
                locale === 'id'
                    ? 'Dukungan berkelanjutan, perbaikan bug, dan peningkatan fitur.'
                    : 'Ongoing support, bug fixes, and feature enhancements.',
            features: [
                locale === 'id' ? 'Dukungan 24/7' : '24/7 support',
                locale === 'id' ? 'Update reguler' : 'Regular updates',
                locale === 'id' ? 'Monitoring proaktif' : 'Proactive monitoring',
                locale === 'id' ? 'Perbaikan bug' : 'Bug fixes',
            ],
        },
    ];

    const process = [
        {
            title: locale === 'id' ? 'Discovery' : 'Discovery',
            description:
                locale === 'id'
                    ? 'Memahami tujuan bisnis, target audiens, dan persyaratan teknis Anda.'
                    : 'Understanding your business goals, target audience, and technical requirements.',
        },
        {
            title: locale === 'id' ? 'Perencanaan' : 'Planning',
            description:
                locale === 'id'
                    ? 'Membuat roadmap proyek, wireframes, dan spesifikasi teknis yang detail.'
                    : 'Creating detailed project roadmap, wireframes, and technical specifications.',
        },
        {
            title: locale === 'id' ? 'Desain' : 'Design',
            description:
                locale === 'id'
                    ? 'Merancang antarmuka pengguna yang menarik dan pengalaman yang intuitif.'
                    : 'Designing beautiful user interfaces and intuitive experiences.',
        },
        {
            title: locale === 'id' ? 'Pengembangan' : 'Development',
            description:
                locale === 'id'
                    ? 'Membangun solusi dengan kode berkualitas tinggi dan best practices.'
                    : 'Building the solution with high-quality code and best practices.',
        },
        {
            title: locale === 'id' ? 'Pengujian' : 'Testing',
            description:
                locale === 'id'
                    ? 'Pengujian menyeluruh untuk memastikan kualitas dan kinerja optimal.'
                    : 'Thorough testing to ensure quality and optimal performance.',
        },
        {
            title: locale === 'id' ? 'Peluncuran' : 'Launch',
            description:
                locale === 'id'
                    ? 'Deploy ke production dan memastikan transisi yang mulus.'
                    : 'Deploying to production and ensuring a smooth transition.',
        },
    ];

    return (
        <GuestLayout>
            <Head title={locale === 'id' ? 'Layanan' : 'Services'} />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            {locale === 'id' ? 'Layanan Kami' : 'Our Services'}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
                            {locale === 'id'
                                ? 'Solusi digital lengkap untuk membantu bisnis Anda tumbuh dan berkembang'
                                : 'Comprehensive digital solutions to help your business grow and thrive'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="bg-white py-16 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {service.title}
                                </h3>
                                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                    {service.description}
                                </p>
                                <ul className="mt-4 space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                                        >
                                            <svg
                                                className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600"
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
                        ))}
                    </div>
                </div>
            </section>

            {/* Development Process */}
            <section className="bg-gray-50 py-16 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            {locale === 'id' ? 'Proses Pengembangan Kami' : 'Our Development Process'}
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            {locale === 'id'
                                ? 'Pendekatan terstruktur untuk memastikan kesuksesan proyek Anda'
                                : 'A structured approach to ensure the success of your project'}
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {process.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="flex items-start">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                                        {index + 1}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {step.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="bg-white py-16 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            {locale === 'id' ? 'Teknologi Yang Kami Gunakan' : 'Technologies We Use'}
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            {locale === 'id'
                                ? 'Stack teknologi modern dan terbukti untuk hasil terbaik'
                                : 'Modern and proven technology stack for the best results'}
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
                        {['Laravel', 'React', 'Vue.js', 'TypeScript', 'MySQL', 'Redis', 'Tailwind CSS', 'Inertia.js'].map(
                            (tech, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
                                >
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{tech}</span>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        {locale === 'id'
                            ? 'Mari Diskusikan Proyek Anda'
                            : "Let's Discuss Your Project"}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                        {locale === 'id'
                            ? 'Hubungi kami hari ini untuk konsultasi gratis dan lihat bagaimana kami dapat membantu'
                            : 'Contact us today for a free consultation and see how we can help'}
                    </p>
                    <div className="mt-8">
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-block rounded-md bg-white px-8 py-3 text-base font-semibold text-blue-600 hover:bg-blue-50"
                        >
                            {locale === 'id' ? 'Mulai Proyek' : 'Start a Project'}
                        </Link>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
