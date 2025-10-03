<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Mail\ContactFormSubmitted;
use App\Mail\LeadNotification;
use App\Services\LeadService;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function __construct(
        protected LeadService $leadService
    ) {}

    /**
     * Show the contact form
     */
    public function create(): Response
    {
        return Inertia::render('Contact', [
            'recaptcha_site_key' => config('services.recaptcha.site_key'),
        ]);
    }

    /**
     * Store a new contact submission
     */
    public function store(ContactFormRequest $request)
    {
        $lead = $this->leadService->createLead($request->validated());

        // Queue emails
        Mail::to($lead->email)->queue(new ContactFormSubmitted($lead));
        Mail::to(config('mail.admin_email', 'admin@devlecta.com'))->queue(new LeadNotification($lead));

        // Return JSON for API requests
        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json([
                'message' => trans('app.contact.success_message'),
                'lead_id' => $lead->id,
            ], 201);
        }

        return redirect()
            ->route('contact.create')
            ->with('success', trans('app.contact.success_message'));
    }
}
