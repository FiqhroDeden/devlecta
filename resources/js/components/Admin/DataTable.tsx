import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

interface Column<T> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    pagination?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    onSort?: (column: string) => void;
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    emptyMessage?: string;
}

export function DataTable<T extends { id: number | string }>({
    columns,
    data,
    pagination,
    onSort,
    sortColumn,
    sortDirection,
    emptyMessage = 'No data available',
}: DataTableProps<T>) {
    const handleSort = (column: string) => {
        if (onSort) {
            onSort(column);
        }
    };

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                                >
                                    {column.sortable ? (
                                        <button
                                            onClick={() => handleSort(column.key)}
                                            className="group inline-flex items-center hover:text-gray-700 dark:hover:text-gray-200"
                                        >
                                            {column.label}
                                            {sortColumn === column.key && (
                                                <svg
                                                    className={`ml-2 h-4 w-4 transition-transform ${
                                                        sortDirection === 'desc' ? 'rotate-180' : ''
                                                    }`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 15l7-7 7 7"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    ) : (
                                        column.label
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white"
                                        >
                                            {column.render
                                                ? column.render(item)
                                                : (item as any)[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                                >
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
                                    <p className="mt-2">{emptyMessage}</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700 dark:text-gray-400">
                            Showing {(pagination.current_page - 1) * pagination.per_page + 1} to{' '}
                            {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of{' '}
                            {pagination.total} results
                        </div>
                        <div className="flex space-x-2">
                            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={`?page=${page}`}
                                    preserveState
                                    className={`rounded-md px-4 py-2 text-sm font-medium ${
                                        page === pagination.current_page
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {page}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
