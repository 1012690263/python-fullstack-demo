// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     host: '0.0.0.0',
//     port: 5173,
//     allowedHosts: 'all'
//   }
// })
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     host: '0.0.0.0',
//     port: 5173,
//     allowedHosts: [
//   "f4edf974a170478f9a11b2b2d852e7c8--5173.ap-shanghai2.cloudstudio.club"
// ]
//   }
// })
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      "f4edf974a170478f9a11b2b2d852e7c8--5173.ap-shanghai2.cloudstudio.club"
    ],
    proxy: {
      // 前端所有 /api 请求转发到后端服务
      '/api': {
        target: 'http://demo-backend:5000',
        changeOrigin: true
      }
    }
  }
})