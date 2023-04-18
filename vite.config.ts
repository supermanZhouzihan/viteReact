import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path" 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'./src')
    }
  },
  server: {
    proxy: {
      // 将 /api 替换为实际的 API 地址
      '/api': {
        target: 'http://47.108.149.12:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

