import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/Components/app-shell';

interface DashboardProps {
    stats: {
        total_portfolios: number;
        total_products: number;
        total_leads: number;
        new_leads: number;
    };
    recent_leads: Array<{
        id: number;
        name: string;
        email: string;
        service_interest: string;
        status: string;
        created_at: string;
    }>;
}

export default function Dashboard({ stats, recent_leads }: DashboardProps) {
    const statCards = [
        {
            title: 'Total Portfolio',
            value: stats.total_portfolios,
            icon: '📁',
            href: '/admin/portfolio',
            color: 'bg-blue-500',
        },
        {
            title: 'Total Products',
            value: stats.total_products,
            icon: '📦',
            href: '/admin/products',
            color: 'bg-green-500',
        },
        {
            title: 'Total Leads',
            value: stats.total_leads,
            icon: '👥',
            href: '/admin/leads',
            color: 'bg-purple-500',
        },
        {
            title: 'New Leads',
            value: stats.new_leads,
            icon: '🆕',
            href: '/admin/leads?status=new',
            color: 'bg-orange-500',
        },
    ];

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'new':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'contacted':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'qualified':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'converted':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'closed':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <AppShell variant="sidebar">
            <Head title="Dashboard" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Welcome back! Here's what's happening with your business.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((stat, index) => (
                        <Link
                            key={index}
                            href={stat.href}
                            className="group overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {stat.title}
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`rounded-full p-3 text-2xl ${stat.color} bg-opacity-10`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-blue-600 group-hover:text-blue-700 dark:text-blue-400">
                                View all →
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Link
                            href="/admin/portfolio/create"
                            className="flex items-center rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <div className="mr-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                                <svg
                                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Create Portfolio</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Add new project</p>
                            </div>
                        </Link>

                        <Link
                            href="/admin/products/create"
                            className="flex items-center rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <div className="mr-4 rounded-full bg-green-100 p-3 dark:bg-green-900">
                                <svg
                                    className="h-6 w-6 text-green-600 dark:text-green-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Create Product</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Add new product</p>
                            </div>
                        </Link>

                        <Link
                            href="/admin/leads"
                            className="flex items-center rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <div className="mr-4 rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                                <svg
                                    className="h-6 w-6 text-purple-600 dark:text-purple-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Manage Leads</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">View inquiries</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Leads */}
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Leads</h2>
                        <Link
                            href="/admin/leads"
                            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                            View all →
                        </Link>
                    </div>

                    {recent_leads.length > 0 ? (
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Service Interest
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {recent_leads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                {lead.name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {lead.email}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {lead.service_interest}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeColor(lead.status)}`}
                                                >
                                                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                <Link
                                                    href={`/admin/leads/${lead.id}`}
                                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No leads yet</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                New contact form submissions will appear here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}
