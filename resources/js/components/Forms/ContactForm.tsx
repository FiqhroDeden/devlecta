import { useForm, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { FormEventHandler } from 'react';

interface ContactFormProps {
    serviceInterest?: string;
    product?: string;
}

export function ContactForm({ serviceInterest, product }: ContactFormProps) {
    const { locale } = usePage<SharedData & { locale: string }>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_interest: serviceInterest || '',
        budget_range: '',
        message: product ? `I'm interested in ${product}` : '',
        preferred_lang: locale,
        recaptcha_token: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Get reCAPTCHA token
        if (typeof window !== 'undefined' && (window as any).grecaptcha) {
            (window as any).grecaptcha.ready(() => {
                (window as any).grecaptcha
                    .execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: 'contact' })
                    .then((token: string) => {
                        setData('recaptcha_token', token);
                        post(`/${locale}/contact`, {
                            onSuccess: () => reset(),
                        });
                    });
            });
        } else {
            // Submit without reCAPTCHA in development
            post(`/${locale}/contact`, {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            {/* Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'id' ? 'Nama' : 'Name'} <span className="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'id' ? 'Telepon' : 'Phone'}
                </label>
                <input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Company */}
            <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'id' ? 'Perusahaan' : 'Company'}
                </label>
                <input
                    id="company"
                    type="text"
                    value={data.company}
                    onChange={(e) => setData('company', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
            </div>

            {/* Service Interest */}
            <div>
                <label htmlFor="service_interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'id' ? 'Layanan yang Diminati' : 'Service Interest'} <span className="text-red-500">*</span>
                </label>
                <select
                    id="service_interest"
                    value={data.service_interest}
                    onChange={(e) => setData('service_interest', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                >
                    <option value="">{locale === 'id' ? 'Pilih Layanan' : 'Select Service'}</option>
                    <option value="Custom Web Development">
                        {locale === 'id' ? 'Pengembangan Web Kustom' : 'Custom Web Development'}
                    </option>
                    <option value="Mobile App Development">
                        {locale === 'id' ? 'Pengembangan Aplikasi Mobile' : 'Mobile App Development'}
                    </option>
                    <option value="E-commerce Solution">
                        {locale === 'id' ? 'Solusi E-commerce' : 'E-commerce Solution'}
                    </option>
                    <option value="Template Customization">
                        {locale === 'id' ? 'Kustomisasi Template' : 'Template Customization'}
                    </option>
                    <option value="Consulting">
                        {locale === 'id' ? 'Konsultasi' : 'Consulting'}
                    </option>
                    <option value="Other">{locale === 'id' ? 'Lainnya' : 'Other'}</option>
                </select>
                {errors.service_interest && <p className="mt-1 text-sm text-red-600">{errors.service_interest}</p>}
            </div>

            {/* Budget Range */}
            <div>
                <label htmlFor="budget_range" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'id' ? 'Anggaran' : 'Budget Range'}
                </label>
                <select
                    id="budget_range"
                    value={data.budget_range}
                    onChange={(e) => setData('budget_range', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                    <option value="">{locale === 'id' ? 'Pilih Anggaran' : 'Select Budget'}</option>
                    <option value="<$5k">&lt;$5k</option>
                    <option value="$5k-$10k">$5k-$10k</option>
                    <option value="$10k-$25k">$10k-$25k</option>
                    <option value="$25k-$50k">$25k-$50k</option>
                    <option value=">$50k">&gt;$50k</option>
                </select>
                {errors.budget_range && <p className="mt-1 text-sm text-red-600">{errors.budget_range}</p>}
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'id' ? 'Pesan' : 'Message'} <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    rows={5}
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {processing
                        ? locale === 'id'
                            ? 'Mengirim...'
                            : 'Sending...'
                        : locale === 'id'
                          ? 'Kirim Pesan'
                          : 'Send Message'}
                </button>
            </div>

            {/* reCAPTCHA Badge Notice */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
                {locale === 'id'
                    ? 'Situs ini dilindungi oleh reCAPTCHA dan Google '
                    : 'This site is protected by reCAPTCHA and the Google '}
                <a href="https://policies.google.com/privacy" className="underline">
                    {locale === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}
                </a>
                {' ' + (locale === 'id' ? 'dan' : 'and') + ' '}
                <a href="https://policies.google.com/terms" className="underline">
                    {locale === 'id' ? 'Syarat Layanan' : 'Terms of Service'}
                </a>
                {' ' + (locale === 'id' ? 'berlaku' : 'apply')}.
            </p>
        </form>
    );
}
