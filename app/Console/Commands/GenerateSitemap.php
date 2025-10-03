<?php

namespace App\Console\Commands;

use App\Models\Portfolio;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';

    protected $description = 'Generate XML sitemap with language variants';

    public function handle(): int
    {
        $this->info('Generating sitemap...');

        $urls = $this->getUrls();
        $xml = $this->generateXml($urls);

        File::put(public_path('sitemap.xml'), $xml);

        $this->info('Sitemap generated successfully at public/sitemap.xml');
        $this->info('Total URLs: '.count($urls));

        return Command::SUCCESS;
    }

    protected function getUrls(): array
    {
        $urls = [];
        $languages = ['en', 'id'];
        $baseUrl = config('app.url');

        // Homepage
        foreach ($languages as $lang) {
            $urls[] = [
                'loc' => "{$baseUrl}/{$lang}",
                'changefreq' => 'weekly',
                'priority' => '1.0',
                'hreflang' => $languages,
            ];
        }

        // Static pages
        $staticPages = ['services', 'about', 'contact', 'portfolio', 'products'];
        foreach ($staticPages as $page) {
            foreach ($languages as $lang) {
                $urls[] = [
                    'loc' => "{$baseUrl}/{$lang}/{$page}",
                    'changefreq' => 'monthly',
                    'priority' => '0.8',
                    'hreflang' => $languages,
                ];
            }
        }

        // Portfolio items
        $portfolios = Portfolio::where('status', 'published')->get();
        foreach ($portfolios as $portfolio) {
            foreach ($languages as $lang) {
                $urls[] = [
                    'loc' => "{$baseUrl}/{$lang}/portfolio/{$portfolio->slug}",
                    'lastmod' => $portfolio->updated_at->format('Y-m-d'),
                    'changefreq' => 'weekly',
                    'priority' => '0.7',
                    'hreflang' => $languages,
                ];
            }
        }

        // Products
        $products = Product::where('status', 'published')->get();
        foreach ($products as $product) {
            foreach ($languages as $lang) {
                $urls[] = [
                    'loc' => "{$baseUrl}/{$lang}/products/{$product->slug}",
                    'lastmod' => $product->updated_at->format('Y-m-d'),
                    'changefreq' => 'weekly',
                    'priority' => '0.7',
                    'hreflang' => $languages,
                ];
            }
        }

        return $urls;
    }

    protected function generateXml(array $urls): string
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'.PHP_EOL;

        foreach ($urls as $url) {
            $xml .= '  <url>'.PHP_EOL;
            $xml .= '    <loc>'.htmlspecialchars($url['loc']).'</loc>'.PHP_EOL;

            if (isset($url['lastmod'])) {
                $xml .= '    <lastmod>'.$url['lastmod'].'</lastmod>'.PHP_EOL;
            }

            if (isset($url['changefreq'])) {
                $xml .= '    <changefreq>'.$url['changefreq'].'</changefreq>'.PHP_EOL;
            }

            if (isset($url['priority'])) {
                $xml .= '    <priority>'.$url['priority'].'</priority>'.PHP_EOL;
            }

            // Add hreflang alternates
            if (isset($url['hreflang'])) {
                foreach ($url['hreflang'] as $lang) {
                    $alternateLoc = preg_replace('/\/(en|id)\//', "/{$lang}/", $url['loc']);
                    $xml .= '    <xhtml:link rel="alternate" hreflang="'.$lang.'" href="'.$alternateLoc.'" />'.PHP_EOL;
                }
            }

            $xml .= '  </url>'.PHP_EOL;
        }

        $xml .= '</urlset>';

        return $xml;
    }
}
