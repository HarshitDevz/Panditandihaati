import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
          'lucide': ['lucide-react'],
        }
      }
    },
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    minify: 'esbuild',
  }
})
