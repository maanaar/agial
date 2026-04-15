import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // In production the app is served from the Odoo static path.
  // In dev the root base keeps the dev server working normally.
  base: command === 'build' ? '/agial_17/static/app/' : '/',

  build: {
    // Output directly into the Odoo addon's static folder.
    outDir: 'C:/Users/PC/addons17/agial_17/static/app',
    emptyOutDir: true,
  },

  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],

  server: {
    proxy: {
      '/agial/id_scanner': {
        target: 'http://209.38.41.253:8006',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/agial/, ''),
      },
    },
  },
}))
