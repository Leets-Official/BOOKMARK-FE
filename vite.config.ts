import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  server: {
    port: 3000, // 포트 번호 설정
  },
  resolve: {
    alias: {
      '@': '/src', // 절대경로로 설정 (Vite에선 '/'는 프로젝트 루트)
    },
  },
});
