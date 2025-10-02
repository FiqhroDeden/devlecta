<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePortfolioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'regex:/^[a-z0-9-]+$/', 'max:255', 'unique:portfolios,slug'],
            'description' => ['required', 'string', 'min:50'],
            'category_id' => ['required', 'exists:categories,id'],
            'type' => ['required', Rule::in(['custom_project', 'envato_product'])],
            'industry' => ['nullable', 'string', 'max:100'],
            'challenge' => ['nullable', 'string'],
            'solution' => ['nullable', 'string'],
            'results' => ['nullable', 'array'],
            'duration' => ['nullable', 'string', 'max:50'],
            'client_name' => ['nullable', 'string', 'max:255'],
            'featured' => ['boolean'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
            'technology_ids' => ['nullable', 'array'],
            'technology_ids.*' => ['exists:technologies,id'],
            'images' => ['nullable', 'array'],
            'images.*' => ['file', 'mimes:jpg,jpeg,png,webp', 'max:5120'], // 5MB
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The portfolio title is required.',
            'description.required' => 'The description is required.',
            'description.min' => 'The description must be at least 50 characters.',
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'The selected category does not exist.',
            'type.required' => 'Please select a portfolio type.',
            'type.in' => 'Invalid portfolio type selected.',
            'status.required' => 'Please select a status.',
            'technology_ids.*.exists' => 'One or more selected technologies do not exist.',
            'images.*.mimes' => 'Images must be JPG, PNG, or WebP format.',
            'images.*.max' => 'Each image must not exceed 5MB.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Auto-generate slug from title if not provided
        if (!$this->slug && $this->title) {
            $this->merge([
                'slug' => \Str::slug($this->title),
            ]);
        }

        // Convert featured checkbox to boolean
        $this->merge([
            'featured' => $this->boolean('featured'),
        ]);
    }
}
