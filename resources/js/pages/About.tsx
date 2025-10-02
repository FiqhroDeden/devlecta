import { Head, Link, usePage } from '@inertiajs/react';
import { GuestLayout } from '@/Components/Layout/GuestLayout';
import { SharedData } from '@/types';

export default function About() {
    const { locale } = usePage<SharedData & { locale: string }>().props;

    const team = [
        {
            name: 'John Doe',
            role: locale === 'id' ? 'CEO & Pendiri' : 'CEO & Founder',
            bio:
                locale === 'id'
                    ? 'Lebih dari 15 tahun pengalaman dalam pengembangan web dan kepemimpinan tim.'
                    : 'Over 15 years of experience in web development and team leadership.',
        },
        {
            name: 'Jane Smith',
            role: locale === 'id' ? 'Lead Developer' : 'Lead Developer',
            bio:
                locale === 'id'
                    ? 'Spesialis dalam Laravel dan React dengan passion untuk kode yang bersih.'
                    : 'Specialist in Laravel and React with a passion for clean code.',
        },
        {
            name: 'Mike Johnson',
            role: locale === 'id' ? 'UI/UX Designer' : 'UI/UX Designer',
            bio:
                locale === 'id'
                    ? 'Menciptakan pengalaman pengguna yang indah dan intuitif.'
                    : 'Creating beautiful and intuitive user experiences.',
        },
    ];

    const values = [
        {
            title: locale === 'id' ? 'Kualitas' : 'Quality',
            description:
                locale === 'id'
                    ? 'Kami berkomitmen untuk memberikan solusi berkualitas tinggi yang melebihi harapan.'
                    : 'We are committed to delivering high-quality solutions that exceed expectations.',
            icon: '⭐',
        },
        {
            title: locale === 'id' ? 'Inovasi' : 'Innovation',
            description:
                locale === 'id'
                    ? 'Kami terus mengeksplorasi teknologi baru dan pendekatan terbaik.'
                    : 'We continuously explore new technologies and best practices.',
            icon: '💡',
        },
        {
            title: locale === 'id' ? 'Transparansi' : 'Transparency',
            description:
                locale === 'id'
                    ? 'Komunikasi terbuka dan jujur dengan klien kami adalah prioritas.'
                    : 'Open and honest communication with our clients is a priority.',
            icon: '🤝',
        },
        {
            title: locale === 'id' ? 'Kepuasan Klien' : 'Client Satisfaction',
            description:
                locale === 'id'
                    ? 'Kesuksesan Anda adalah kesuksesan kami. Kami bekerja sampai Anda puas.'
                    : 'Your success is our success. We work until you are satisfied.',
            icon: '🎯',
        },
    ];

    const stats = [
        {
            number: '10+',
            label: locale === 'id' ? 'Tahun Pengalaman' : 'Years Experience',
        },
        {
            number: '100+',
            label: locale === 'id' ? 'Proyek Selesai' : 'Projects Completed',
        },
        {
            number: '50+',
            label: locale === 'id' ? 'Klien Puas' : 'Happy Clients',
        },
        {
            number: '20+',
            label: locale === 'id' ? 'Produk Envato' : 'Envato Products',
        },
    ];

    return (
        <GuestLayout>
            <Head title={locale === 'id' ? 'Tentang Kami' : 'About Us'} />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            {locale === 'id' ? 'Tentang Devlecta' : 'About Devlecta'}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
                            {locale === 'id'
                                ? 'Kami adalah tim profesional yang berdedikasi untuk menciptakan solusi digital terbaik'
                                : 'We are a professional team dedicated to creating the best digital solutions'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Company Story */}
            <section className="bg-white py-16 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {locale === 'id' ? 'Cerita Kami' : 'Our Story'}
                            </h2>
                            <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
                                <p>
                                    {locale === 'id'
                                        ? 'Devlecta didirikan dengan visi untuk menyediakan solusi digital berkualitas tinggi yang membantu bisnis tumbuh dan berkembang. Kami percaya bahwa teknologi harus menjadi enabler, bukan hambatan.'
                                        : 'Devlecta was founded with the vision of providing high-quality digital solutions that help businesses grow and thrive. We believe technology should be an enabler, not a barrier.'}
                                </p>
                                <p>
                                    {locale === 'id'
                                        ? 'Selama bertahun-tahun, kami telah bekerja dengan berbagai klien dari berbagai industri, mulai dari startup hingga perusahaan besar. Setiap proyek adalah kesempatan untuk belajar dan berkembang.'
                                        : 'Over the years, we have worked with various clients from different industries, from startups to large enterprises. Each project is an opportunity to learn and grow.'}
                                </p>
                                <p>
                                    {locale === 'id'
                                        ? 'Kami juga aktif di komunitas developer dengan menciptakan produk digital berkualitas tinggi yang tersedia di marketplace Envato, membantu ribuan developer dan bisnis di seluruh dunia.'
                                        : 'We are also active in the developer community by creating high-quality digital products available on the Envato marketplace, helping thousands of developers and businesses worldwide.'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-900"
                                    >
                                        <p className="text-3xl font-bold text-blue-600">{stat.number}</p>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-gray-50 py-16 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {locale === 'id' ? 'Nilai-Nilai Kami' : 'Our Values'}
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            {locale === 'id'
                                ? 'Prinsip-prinsip yang memandu setiap keputusan yang kami buat'
                                : 'The principles that guide every decision we make'}
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800"
                            >
                                <div className="text-4xl">{value.icon}</div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    {value.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="bg-white py-16 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {locale === 'id' ? 'Tim Kami' : 'Our Team'}
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            {locale === 'id'
                                ? 'Bertemu dengan para profesional di balik Devlecta'
                                : 'Meet the professionals behind Devlecta'}
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-900"
                            >
                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl text-white">
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    {member.name}
                                </h3>
                                <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">{member.role}</p>
                                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        {locale === 'id' ? 'Mari Bekerja Bersama' : "Let's Work Together"}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                        {locale === 'id'
                            ? 'Hubungi kami hari ini dan lihat bagaimana kami dapat membantu proyek Anda'
                            : 'Contact us today and see how we can help with your project'}
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
