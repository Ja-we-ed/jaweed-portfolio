import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

const pagesBase = '/jaweed-portfolio/'

/** GitHub Pages serves this file for unknown paths. A copy of the built shell is enough for this hash-routed page. */
function pages404Fallback(): Plugin {
  return {
    name: 'pages-404-fallback',
    apply: 'build',
    closeBundle() {
      copyFileSync(resolve('dist/index.html'), resolve('dist/404.html'))
    },
  }
}

export default defineConfig(({ command, mode }) => ({
  // Dev stays at /. Production and `vite preview` use the GitHub Pages project subpath.
  base: command === 'serve' && mode === 'development' ? '/' : pagesBase,
  plugins: [react(), tailwindcss(), pages404Fallback()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
}))
