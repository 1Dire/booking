import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  resolve: {
    alias: {
      '@': '/src',  // '@'를 src 폴더로 설정
    }
  },
  server: {
    host: '0.0.0.0', // 모든 네트워크 인터페이스에 바인딩
    port: 5173, // 포트는 기본값으로 두었지만, 원하는 포트로 변경 가능
    open: true, // 서버 시작 시 자동으로 브라우저 열기 (선택사항)
  }
})
