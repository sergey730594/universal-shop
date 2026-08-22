import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 Добавь эту строку
const baseName = '/shop-tamplate/' // или '/shop-template/' если переименуешь

export default defineConfig({
  plugins: [react()],
  // 👇 Добавь эту строку
  base: baseName,
  server: { 
    port: 5173 
  }
})