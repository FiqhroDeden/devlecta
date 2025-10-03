<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class LocaleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $this->determineLocale($request);

        App::setLocale($locale);

        // Store locale in session for persistence
        session(['locale' => $locale]);

        return $next($request);
    }

    /**
     * Determine the locale from URL, cookie, or browser preference
     */
    protected function determineLocale(Request $request): string
    {
        $supportedLocales = ['en', 'id'];

        // 1. Check URL prefix (e.g., /en/ or /id/)
        $segments = $request->segments();
        if (! empty($segments) && in_array($segments[0], $supportedLocales)) {
            return $segments[0];
        }

        // 2. Check session
        if ($request->session()->has('locale')) {
            $sessionLocale = $request->session()->get('locale');
            if (in_array($sessionLocale, $supportedLocales)) {
                return $sessionLocale;
            }
        }

        // 3. Check cookie
        if ($request->hasCookie('laravel_locale')) {
            $cookieLocale = $request->cookie('laravel_locale');
            if (in_array($cookieLocale, $supportedLocales)) {
                return $cookieLocale;
            }
        }

        // 4. Check browser Accept-Language header
        $browserLocale = $request->getPreferredLanguage(['en', 'id']);
        if ($browserLocale) {
            return $browserLocale;
        }

        // 5. Default to English
        return 'en';
    }
}
