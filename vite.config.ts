import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // pnpm может подтянуть вторую копию React (через @xyflow/react) →
  // "Invalid hook call". dedupe гарантирует единственный инстанс.
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
