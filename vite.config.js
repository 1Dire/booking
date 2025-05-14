import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // '@'를 src 폴더로 설정
    },
  },
  server: {
    host: true, // 모든 네트워크 인터페이스에 바인딩
    port: 5173,
    strictPort: true,
    open: true,
  },
});
