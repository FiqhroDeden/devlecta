import { Head, Link, router } from '@inertiajs/react';
import AppShell from '@/layouts/admin/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    slug: string;
    category: { name: string };
    status: 'draft' | 'published' | 'archived';
    price: string;
    rating: string;
    created_at: string;
}

interface Props {
    products: {
        data: Product[];
        links: any;
        meta: any;
    };
}

export default function Index({ products }: Props) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const handleSearch = () => {
        router.get(
            route('admin.products.index'),
            { search, status: statusFilter },
            { preserveState: true },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    return (
        <AppShell>
            <Head title="Products" />

            <div className="py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <Link href={route('admin.products.create')}>
                        <Button>Create Product</Button>
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex gap-4 mb-4">
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="flex-1"
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border rounded"
                        >
                            <option value="">All Status</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                        <Button onClick={handleSearch}>Filter</Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.data.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.category.name}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.rating}/5</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                product.status === 'published'
                                                    ? 'default'
                                                    : product.status === 'draft'
                                                      ? 'secondary'
                                                      : 'outline'
                                            }
                                        >
                                            {product.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(product.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Link href={route('admin.products.edit', product.id)}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {products.data.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No products found. Create your first product!
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}
