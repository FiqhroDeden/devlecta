import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/Components/app-shell';
import { DataTable } from '@/Components/Admin/DataTable';
import { useState } from 'react';

interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    service_interest: string;
    budget_range: string | null;
    message: string;
    preferred_lang: string;
    status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
    admin_notes: string | null;
    created_at: string;
}

interface LeadsIndexProps {
    leads: {
        data: Lead[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        status?: string;
        date_from?: string;
        date_to?: string;
        search?: string;
    };
    stats: {
        new: number;
        contacted: number;
        qualified: number;
        converted: number;
    };
}

export default function LeadsIndex({ leads, filters, stats }: LeadsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleFilter = () => {
        router.get(
            '/admin/leads',
            {
                search: search || undefined,
                status: statusFilter || undefined,
                date_from: dateFrom || undefined,
                date_to: dateTo || undefined,
            },
            {
                preserveState: true,
            },
        );
    };

    const handleClearFilters = () => {
        setSearch('');
        setStatusFilter('');
        setDateFrom('');
        setDateTo('');
        router.get('/admin/leads');
    };

    const handleExportCSV = () => {
        const params = new URLSearchParams();
        if (statusFilter) params.append('status', statusFilter);
        if (dateFrom) params.append('date_from', dateFrom);
        if (dateTo) params.append('date_to', dateTo);

        window.location.href = `/admin/leads/export?${params.toString()}`;
    };

    const handleViewLead = (lead: Lead) => {
        setSelectedLead(lead);
        setShowModal(true);
    };

    const handleUpdateStatus = (leadId: number, status: string, notes: string) => {
        router.patch(
            `/admin/leads/${leadId}`,
            {
                status,
                admin_notes: notes,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                    setSelectedLead(null);
                },
            },
        );
    };

    const getStatusBadgeColor = (status: string) => {
        const colors = {
            new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            qualified: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            converted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
        };
        return colors[status as keyof typeof colors] || colors.new;
    };

    const columns = [
        {
            key: 'name',
            label: 'Contact',
            render: (item: Lead) => (
                <div>
                    <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.email}</div>
                    {item.phone && <div className="text-xs text-gray-500 dark:text-gray-400">{item.phone}</div>}
                </div>
            ),
        },
        {
            key: 'company',
            label: 'Company',
            render: (item: Lead) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.company || '-'}</span>
            ),
        },
        {
            key: 'service_interest',
            label: 'Service Interest',
            render: (item: Lead) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.service_interest}</span>
            ),
        },
        {
            key: 'budget_range',
            label: 'Budget',
            render: (item: Lead) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.budget_range || '-'}</span>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (item: Lead) => (
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
            ),
        },
        {
            key: 'created_at',
            label: 'Submitted',
            sortable: true,
            render: (item: Lead) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(item.created_at).toLocaleDateString()}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (item: Lead) => (
                <button
                    onClick={() => handleViewLead(item)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                    View
                </button>
            ),
        },
    ];

    return (
        <AppShell variant="sidebar">
            <Head title="Lead Management" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leads</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage contact form submissions and track lead status
                    </p>
                </div>

                {/* Stats */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New Leads</p>
                        <p className="mt-2 text-3xl font-bold text-blue-600">{stats.new}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Contacted</p>
                        <p className="mt-2 text-3xl font-bold text-yellow-600">{stats.contacted}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Qualified</p>
                        <p className="mt-2 text-3xl font-bold text-purple-600">{stats.qualified}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Converted</p>
                        <p className="mt-2 text-3xl font-bold text-green-600">{stats.converted}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                        <div>
                            <label htmlFor="search" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Search
                            </label>
                            <input
                                id="search"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Name or email..."
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
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="qualified">Qualified</option>
                                <option value="converted">Converted</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date_from" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Date From
                            </label>
                            <input
                                id="date_from"
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="date_to" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Date To
                            </label>
                            <input
                                id="date_to"
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
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
                    <div className="mt-4">
                        <button
                            onClick={handleExportCSV}
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Export to CSV
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <DataTable columns={columns} data={leads.data} pagination={leads} emptyMessage="No leads found" />

                {/* Lead Detail Modal */}
                {showModal && selectedLead && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-800">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lead Details</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{selectedLead.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{selectedLead.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{selectedLead.phone || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{selectedLead.company || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Service Interest</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{selectedLead.service_interest}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget Range</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{selectedLead.budget_range || '-'}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Message</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">{selectedLead.message}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                                    <select
                                        value={selectedLead.status}
                                        onChange={(e) => {
                                            const newStatus = e.target.value;
                                            handleUpdateStatus(selectedLead.id, newStatus, selectedLead.admin_notes || '');
                                        }}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="new">New</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="qualified">Qualified</option>
                                        <option value="converted">Converted</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Admin Notes</p>
                                    <textarea
                                        value={selectedLead.admin_notes || ''}
                                        onChange={(e) => {
                                            setSelectedLead({ ...selectedLead, admin_notes: e.target.value });
                                        }}
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Add notes about this lead..."
                                    />
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleUpdateStatus(selectedLead.id, selectedLead.status, selectedLead.admin_notes || '')
                                        }
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
