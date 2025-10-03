import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/Components/app-shell';
import { MediaUploader } from '@/Components/Admin/MediaUploader';
import { FormEventHandler, useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Technology {
    id: number;
    name: string;
}

interface CreatePortfolioProps {
    categories: Category[];
    technologies: Technology[];
}

export default function CreatePortfolio({ categories, technologies }: CreatePortfolioProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category_id: '',
        type: 'custom_project' as 'custom_project' | 'envato_product',
        industry: '',
        challenge: '',
        solution: '',
        results: '',
        duration: '',
        client_name: '',
        technology_ids: [] as number[],
        featured: false,
        status: 'draft' as 'draft' | 'published' | 'archived',
        images: [] as File[],
    });

    const [mediaFiles, setMediaFiles] = useState<any[]>([]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        // Convert media files to File array
        const imageFiles = mediaFiles.filter((f) => f.file).map((f) => f.file);

        post('/admin/portfolio', {
            data: {
                ...data,
                images: imageFiles,
            },
            forceFormData: true,
        });
    };

    const handleTechnologyToggle = (techId: number) => {
        const currentIds = data.technology_ids;
        if (currentIds.includes(techId)) {
            setData('technology_ids', currentIds.filter((id) => id !== techId));
        } else {
            setData('technology_ids', [...currentIds, techId]);
        }
    };

    return (
        <AppShell variant="sidebar">
            <Head title="Create Portfolio" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Portfolio</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Add a new project or product to your portfolio</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            <div>
                                <label htmlFor="category_id" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                            </div>

                            <div>
                                <label htmlFor="type" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value as any)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="custom_project">Custom Project</option>
                                    <option value="envato_product">Envato Product</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="industry" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Industry
                                </label>
                                <input
                                    id="industry"
                                    type="text"
                                    value={data.industry}
                                    onChange={(e) => setData('industry', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., E-commerce, Healthcare"
                                />
                            </div>

                            <div>
                                <label htmlFor="duration" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Duration
                                </label>
                                <input
                                    id="duration"
                                    type="text"
                                    value={data.duration}
                                    onChange={(e) => setData('duration', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., 3 months"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="client_name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Client Name
                                </label>
                                <input
                                    id="client_name"
                                    type="text"
                                    value={data.client_name}
                                    onChange={(e) => setData('client_name', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Project Details */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Project Details</h2>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="challenge" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Challenge
                                </label>
                                <textarea
                                    id="challenge"
                                    rows={3}
                                    value={data.challenge}
                                    onChange={(e) => setData('challenge', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="solution" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Solution
                                </label>
                                <textarea
                                    id="solution"
                                    rows={3}
                                    value={data.solution}
                                    onChange={(e) => setData('solution', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="results" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Results (JSON format)
                                </label>
                                <textarea
                                    id="results"
                                    rows={3}
                                    value={data.results}
                                    onChange={(e) => setData('results', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder='{"metric": "50% faster load time"}'
                                />
                                <p className="mt-1 text-xs text-gray-500">Enter as JSON object</p>
                            </div>
                        </div>
                    </div>

                    {/* Technologies */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Technologies</h2>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech) => (
                                <button
                                    key={tech.id}
                                    type="button"
                                    onClick={() => handleTechnologyToggle(tech.id)}
                                    className={`rounded-md px-3 py-1 text-sm font-medium transition ${
                                        data.technology_ids.includes(tech.id)
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {tech.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Media Upload */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Images</h2>
                        <MediaUploader files={mediaFiles} onChange={setMediaFiles} />
                    </div>

                    {/* Settings */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as any)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="featured"
                                    type="checkbox"
                                    checked={data.featured}
                                    onChange={(e) => setData('featured', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="featured" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    Featured on homepage
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-4">
                        <a
                            href="/admin/portfolio"
                            className="rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </a>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create Portfolio'}
                        </button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}
