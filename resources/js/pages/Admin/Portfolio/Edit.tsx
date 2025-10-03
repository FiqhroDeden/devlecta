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

interface Portfolio {
    id: number;
    title: string;
    slug: string;
    description: string;
    category_id: number;
    type: 'custom_project' | 'envato_product';
    industry?: string;
    challenge?: string;
    solution?: string;
    results?: Record<string, string>;
    duration?: string;
    client_name?: string;
    featured: boolean;
    status: 'draft' | 'published' | 'archived';
    technology_ids: number[];
}

interface Category {
    id: number;
    name: string;
}

interface Technology {
    id: number;
    name: string;
}

interface Props {
    portfolio: Portfolio;
    categories: Category[];
    technologies: Technology[];
}

export default function Edit({ portfolio, categories, technologies }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: portfolio.title || '',
        description: portfolio.description || '',
        category_id: portfolio.category_id || '',
        type: portfolio.type || 'custom_project',
        industry: portfolio.industry || '',
        challenge: portfolio.challenge || '',
        solution: portfolio.solution || '',
        duration: portfolio.duration || '',
        client_name: portfolio.client_name || '',
        technology_ids: portfolio.technology_ids || [],
        featured: portfolio.featured || false,
        status: portfolio.status || 'draft',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.portfolio.update', portfolio.id));
    };

    return (
        <AppShell>
            <Head title="Edit Portfolio" />

            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Edit Portfolio</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                        {errors.title && (
                            <p className="text-sm text-red-600 mt-1">{errors.title}</p>
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
                            <Label htmlFor="type">Type</Label>
                            <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="custom_project">Custom Project</SelectItem>
                                    <SelectItem value="envato_product">Envato Product</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="industry">Industry</Label>
                        <Input
                            id="industry"
                            value={data.industry}
                            onChange={(e) => setData('industry', e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="challenge">Challenge</Label>
                        <Textarea
                            id="challenge"
                            value={data.challenge}
                            onChange={(e) => setData('challenge', e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div>
                        <Label htmlFor="solution">Solution</Label>
                        <Textarea
                            id="solution"
                            value={data.solution}
                            onChange={(e) => setData('solution', e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                id="duration"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                placeholder="e.g., 3 months"
                            />
                        </div>

                        <div>
                            <Label htmlFor="client_name">Client Name</Label>
                            <Input
                                id="client_name"
                                value={data.client_name}
                                onChange={(e) => setData('client_name', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Technologies</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {technologies.map((tech) => (
                                <label key={tech.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={data.technology_ids.includes(tech.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setData('technology_ids', [...data.technology_ids, tech.id]);
                                            } else {
                                                setData(
                                                    'technology_ids',
                                                    data.technology_ids.filter((id) => id !== tech.id),
                                                );
                                            }
                                        }}
                                    />
                                    <span className="text-sm">{tech.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={data.featured}
                                    onChange={(e) => setData('featured', e.target.checked)}
                                />
                                <span>Featured</span>
                            </label>
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

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Update Portfolio'}
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
