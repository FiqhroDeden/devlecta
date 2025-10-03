import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AppShell from '@/layouts/admin/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Product {
    id: number;
    name: string;
    description: string;
    category_id: number;
    price: string;
    envato_url: string;
    rating: string;
    reviews_count: number;
    demo_link?: string;
    docs_link?: string;
    features?: string[];
    status: 'draft' | 'published' | 'archived';
}

interface Category {
    id: number;
    name: string;
}

interface Props {
    product: Product;
    categories: Category[];
}

export default function Edit({ product, categories }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        category_id: product.category_id || '',
        price: product.price || '',
        envato_url: product.envato_url || '',
        rating: product.rating || '',
        reviews_count: product.reviews_count || 0,
        demo_link: product.demo_link || '',
        docs_link: product.docs_link || '',
        features: product.features ? product.features.join('\n') : '',
        status: product.status || 'draft',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.products.update', product.id));
    };

    return (
        <AppShell>
            <Head title="Edit Product" />

            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={5}
                            required
                        />
                        {errors.description && (
                            <p className="text-sm text-red-600 mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="category_id">Category</Label>
                            <Select
                                value={data.category_id.toString()}
                                onValueChange={(value) => setData('category_id', parseInt(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && (
                                <p className="text-sm text-red-600 mt-1">{errors.category_id}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="price">Price (USD)</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-600 mt-1">{errors.price}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="envato_url">Envato Marketplace URL</Label>
                        <Input
                            id="envato_url"
                            type="url"
                            value={data.envato_url}
                            onChange={(e) => setData('envato_url', e.target.value)}
                            placeholder="https://themeforest.net/item/..."
                            required
                        />
                        {errors.envato_url && (
                            <p className="text-sm text-red-600 mt-1">{errors.envato_url}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="rating">Rating (0-5)</Label>
                            <Input
                                id="rating"
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={data.rating}
                                onChange={(e) => setData('rating', e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="reviews_count">Reviews Count</Label>
                            <Input
                                id="reviews_count"
                                type="number"
                                value={data.reviews_count}
                                onChange={(e) => setData('reviews_count', parseInt(e.target.value))}
                            />
                        </div>

                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="demo_link">Demo Link</Label>
                            <Input
                                id="demo_link"
                                type="url"
                                value={data.demo_link}
                                onChange={(e) => setData('demo_link', e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="docs_link">Documentation Link</Label>
                            <Input
                                id="docs_link"
                                type="url"
                                value={data.docs_link}
                                onChange={(e) => setData('docs_link', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="features">Features (one per line)</Label>
                        <Textarea
                            id="features"
                            value={data.features}
                            onChange={(e) => setData('features', e.target.value)}
                            rows={5}
                            placeholder="Responsive Design&#10;SEO Optimized&#10;24/7 Support"
                        />
                        <p className="text-sm text-gray-500 mt-1">Enter each feature on a new line</p>
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Product'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}
