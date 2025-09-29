import { defineConfig } from 'vite'
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve('src/partials'),
      reloadOnPartialChange: true,
    }),
    {
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".html")) {
          server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      },
    },
  ],
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
    ]
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about-page.html'),
        blogInner: resolve(__dirname, 'blog-inner.html'),
        blogPage: resolve(__dirname, 'blog-page.html'),
        categoriesInner: resolve(__dirname, 'categories-inner.html'),
        categoriesPage: resolve(__dirname, 'categories-page.html'),
        contacts: resolve(__dirname, 'contacts.html'),
        legalSection: resolve(__dirname, 'legal-section.html'),
        productPage: resolve(__dirname, 'product-page.html'),
        production: resolve(__dirname, 'production.html'),
      }
    }
  },
  optimizeDeps: {
    force: true,
  },
  server: {
    watch: {
      usePolling: true,
      interval: 1000, // можно увеличить интервал (меньше нагрузка на CPU)
    },
  },
})





