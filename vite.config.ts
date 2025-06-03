import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'
import { compression } from 'vite-plugin-compression2'
import { resolve } from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    // Custom plugin to copy service worker to dist folder
    {
      name: 'copy-service-worker',
      closeBundle: async () => {
        // Read the original service worker file
        const swContent = fs.readFileSync(resolve(__dirname, 'src/sw.ts'), 'utf-8');
        
        // Simple transformation for TypeScript to JavaScript
        const jsContent = swContent
          .replace(/\/\/\/ <reference lib="webworker" \/>/g, '')
          .replace(/declare const self: ServiceWorkerGlobalScope;/g, '');
        
        // Write the service worker to the dist folder
        fs.writeFileSync(resolve(__dirname, 'dist/sw.js'), jsContent);
        console.log('✓ Service worker copied to dist folder');
      }
    }
  ],
  build: {
    // Generate separate chunks for improved caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and related libraries into a separate chunk
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Split animation libraries into a separate chunk
          'vendor-anim': ['framer-motion'],
          // Split UI components into a separate chunk
          'vendor-ui': ['lucide-react', 'recharts'],
        },
      },
    },
    // Preload key assets for faster loading
    modulePreload: {
      polyfill: true,
    },
    // Target modern browsers for smaller code size
    target: 'es2020',
    // Enable terser for better minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    // Create smaller, better-optimized assets
    assetsInlineLimit: 4096, // Inline small assets
    chunkSizeWarningLimit: 1000, // Increase warning limit
  },
})
