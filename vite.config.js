import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

// GitHub Pages project site: https://<user>.github.io/<repo>/
const repoBase = '/6Sigma/'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? repoBase : '/',
  plugins: [
    react(),
    tailwindcss(),
    mode === 'production' && {
      name: 'gh-pages-spa-fallback',
      closeBundle() {
        const index = join('dist', 'index.html')
        copyFileSync(index, join('dist', '404.html'))
      },
    },
  ].filter(Boolean),
}))
