<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rule;

class UpdatePortfolioRequest extends StorePortfolioRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $rules = parent::rules();

        // Update slug validation to ignore current portfolio
        $portfolioId = $this->route('portfolio');
        $rules['slug'] = ['nullable', 'string', 'regex:/^[a-z0-9-]+$/', 'max:255', Rule::unique('portfolios', 'slug')->ignore($portfolioId)];

        return $rules;
    }
}
