import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@context': path.resolve(__dirname, './src/context'),
      '@types': path.resolve(__dirname, './src/types'),
      '@sass': path.resolve(__dirname, './src/sass'),
      '@Components': path.resolve(__dirname, './src/views/Components'),
      '@Layouts': path.resolve(__dirname, './src/views/Layouts'),
      '@Pages': path.resolve(__dirname, './src/views/Pages'),
      '@Icons': path.resolve(__dirname, './src/views/Components/Icons'),
    },
  },
  define: {
    'process.env': {},
  },
  plugins: [react()],
  server: {
    port: 8000
  }
})
