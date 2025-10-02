<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'regex:/^[+]?[0-9\s\-\(\)]+$/', 'max:50'],
            'company' => ['nullable', 'string', 'max:255'],
            'service_interest' => ['required', 'string', 'max:100'],
            'budget_range' => ['nullable', 'string', 'max:50'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
            'preferred_lang' => ['required', 'in:en,id'],
            'recaptcha_token' => ['required', 'string'],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'message.required' => 'The message field is required.',
            'message.min' => 'The message must be at least 10 characters.',
            'service_interest.required' => 'Please specify your service interest.',
            'preferred_lang.required' => 'Please select your preferred language.',
            'recaptcha_token.required' => 'reCAPTCHA verification is required.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'ip_address' => $this->ip(),
            'status' => 'new',
        ]);
    }
}
