import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [
    react(),
    // Ensure tailwindcss is installed and configured correctly
    {
      name: 'vite-plugin-tailwindcss',
      config() {
        return {
          css: {
            postcss: {
              plugins: [tailwindcss],
            },
          },
        }
      }
    }
  ],
})
