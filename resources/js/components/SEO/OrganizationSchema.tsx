import { Head } from '@inertiajs/react';

interface Props {
    name?: string;
    url?: string;
    logo?: string;
    description?: string;
    contactEmail?: string;
    contactPhone?: string;
}

export default function OrganizationSchema({
    name = 'Devlecta',
    url = 'https://devlecta.com',
    logo = 'https://devlecta.com/logo.png',
    description = 'Professional web development agency specializing in custom web applications and digital products',
    contactEmail = 'hello@devlecta.com',
    contactPhone = '+62-xxx-xxxx-xxxx',
}: Props) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        logo,
        description,
        contactPoint: {
            '@type': 'ContactPoint',
            email: contactEmail,
            telephone: contactPhone,
            contactType: 'customer service',
        },
        sameAs: [
            'https://twitter.com/devlecta',
            'https://github.com/devlecta',
            'https://linkedin.com/company/devlecta',
        ],
    };

    return (
        <Head>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Head>
    );
}
