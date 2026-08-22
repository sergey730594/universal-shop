import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 Добавь эту строку
const baseName = '/vite-react-7y74tlxv/' //

export default defineConfig({
  plugins: [react()],
  // 👇 Добавь эту строку
  base: baseName,
  server: { 
    port: 5173 
  }
})