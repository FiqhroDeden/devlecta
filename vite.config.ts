import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Vendor chunk for common dependencies
                    vendor: ['react', 'react-dom'],
                    // Admin chunk for admin pages
                    admin: [
                        '/resources/js/Pages/Admin/Dashboard.tsx',
                        '/resources/js/Pages/Admin/Portfolio/Index.tsx',
                        '/resources/js/Pages/Admin/Portfolio/Create.tsx',
                        '/resources/js/Pages/Admin/Portfolio/Edit.tsx',
                        '/resources/js/Pages/Admin/Products/Index.tsx',
                        '/resources/js/Pages/Admin/Products/Create.tsx',
                        '/resources/js/Pages/Admin/Products/Edit.tsx',
                        '/resources/js/Pages/Admin/Leads/Index.tsx',
                    ],
                },
            },
        },
    },
});
