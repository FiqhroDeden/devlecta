import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/Components/app-shell';
import { DataTable } from '@/Components/Admin/DataTable';
import { useState } from 'react';

interface Portfolio {
    id: number;
    title: string;
    slug: string;
    category: {
        name: string;
    };
    type: 'custom_project' | 'envato_product';
    status: 'draft' | 'published' | 'archived';
    featured: boolean;
    created_at: string;
}

interface PortfolioIndexProps {
    portfolios: {
        data: Portfolio[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        status?: string;
        type?: string;
        search?: string;
    };
}

export default function PortfolioIndex({ portfolios, filters }: PortfolioIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || '');

    const handleFilter = () => {
        router.get(
            '/admin/portfolio',
            {
                search: search || undefined,
                status: statusFilter || undefined,
                type: typeFilter || undefined,
            },
            {
                preserveState: true,
            },
        );
    };

    const handleClearFilters = () => {
        setSearch('');
        setStatusFilter('');
        setTypeFilter('');
        router.get('/admin/portfolio');
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this portfolio item?')) {
            router.delete(`/admin/portfolio/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const getStatusBadge = (status: string) => {
        const colors = {
            draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
            published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            archived: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        };
        return colors[status as keyof typeof colors] || colors.draft;
    };

    const columns = [
        {
            key: 'title',
            label: 'Title',
            sortable: true,
            render: (item: Portfolio) => (
                <div>
                    <div className="font-medium text-gray-900 dark:text-white">{item.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.slug}</div>
                </div>
            ),
        },
        {
            key: 'category',
            label: 'Category',
            render: (item: Portfolio) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.category.name}</span>
            ),
        },
        {
            key: 'type',
            label: 'Type',
            render: (item: Portfolio) => (
                <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {item.type === 'custom_project' ? 'Custom' : 'Envato'}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (item: Portfolio) => (
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadge(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
            ),
        },
        {
            key: 'featured',
            label: 'Featured',
            render: (item: Portfolio) =>
                item.featured ? (
                    <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ) : null,
        },
        {
            key: 'created_at',
            label: 'Created',
            sortable: true,
            render: (item: Portfolio) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(item.created_at).toLocaleDateString()}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (item: Portfolio) => (
                <div className="flex space-x-2">
                    <Link
                        href={`/admin/portfolio/${item.id}/edit`}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AppShell variant="sidebar">
            <Head title="Portfolio Management" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Manage your portfolio projects and products
                        </p>
                    </div>
                    <Link
                        href="/admin/portfolio/create"
                        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Portfolio
                    </Link>
                </div>

                {/* Filters */}
                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div>
                            <label htmlFor="search" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Search
                            </label>
                            <input
                                id="search"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title..."
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Status
                            </label>
                            <select
                                id="status"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All Statuses</option>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="type" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Type
                            </label>
                            <select
                                id="type"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All Types</option>
                                <option value="custom_project">Custom Project</option>
                                <option value="envato_product">Envato Product</option>
                            </select>
                        </div>
                        <div className="flex items-end space-x-2">
                            <button
                                onClick={handleFilter}
                                className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Apply
                            </button>
                            <button
                                onClick={handleClearFilters}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <DataTable
                    columns={columns}
                    data={portfolios.data}
                    pagination={portfolios}
                    emptyMessage="No portfolio items found"
                />
            </div>
        </AppShell>
    );
}
