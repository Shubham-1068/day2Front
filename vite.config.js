import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ No need to write tailwindcss here

export default defineConfig({
  plugins: [react()],
})
