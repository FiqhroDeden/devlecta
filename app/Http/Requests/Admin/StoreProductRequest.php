<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'regex:/^[a-z0-9-]+$/', 'max:255', 'unique:products,slug'],
            'description' => ['required', 'string', 'min:50'],
            'category_id' => ['required', 'exists:categories,id'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'envato_url' => ['required', 'url', 'regex:/envato\.market|themeforest\.net|codecanyon\.net/'],
            'rating' => ['nullable', 'numeric', 'between:0,5'],
            'reviews_count' => ['nullable', 'integer', 'min:0'],
            'demo_link' => ['nullable', 'url'],
            'docs_link' => ['nullable', 'url'],
            'features' => ['nullable', 'array'],
            'features.*' => ['string', 'max:255'],
            'changelog' => ['nullable', 'array'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
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
            'name.required' => 'The product name is required.',
            'description.required' => 'The description is required.',
            'description.min' => 'The description must be at least 50 characters.',
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'The selected category does not exist.',
            'envato_url.required' => 'The Envato marketplace URL is required.',
            'envato_url.url' => 'The Envato URL must be a valid URL.',
            'envato_url.regex' => 'The URL must be from Envato marketplace (envato.market, themeforest.net, or codecanyon.net).',
            'price.numeric' => 'The price must be a number.',
            'rating.between' => 'The rating must be between 0 and 5.',
            'status.required' => 'Please select a status.',
            'images.*.mimes' => 'Images must be JPG, PNG, or WebP format.',
            'images.*.max' => 'Each image must not exceed 5MB.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Auto-generate slug from name if not provided
        if (!$this->slug && $this->name) {
            $this->merge([
                'slug' => \Str::slug($this->name),
            ]);
        }
    }
}
