import { Head } from '@inertiajs/react';

interface Props {
    name: string;
    description: string;
    image?: string;
    price?: string;
    rating?: string;
    reviewCount?: number;
    url: string;
}

export default function ProductSchema({
    name,
    description,
    image,
    price,
    rating,
    reviewCount,
    url,
}: Props) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        image: image || 'https://devlecta.com/default-product.jpg',
        url,
        offers: price
            ? {
                  '@type': 'Offer',
                  price: price,
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
              }
            : undefined,
        aggregateRating:
            rating && reviewCount
                ? {
                      '@type': 'AggregateRating',
                      ratingValue: rating,
                      reviewCount: reviewCount,
                  }
                : undefined,
    };

    return (
        <Head>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Head>
    );
}
