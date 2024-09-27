import { fileURLToPath, URL } from 'node:url'
import legacy from '@vitejs/plugin-legacy';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import pxtovw from 'postcss-px-to-viewport'
const loder_pxtovw = pxtovw({
//这里是设计稿宽度 自己修改
  viewportWidth: 1920,
  viewportUnit: 'vw'
})











// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
  ],

  css: {
    postcss: {
      plugins: [loder_pxtovw]
    }
  },

      // vite 相关配置
      server: {
        port: 8888,
        host: true,
        open: true,
        proxy: {
          "/dtshare/prod-api": {
            target: "http://110.42.239.134:17600/" ,
            changeOrigin: true,
            // rewrite: (p) => p.replace(/^\/dev-api/, '')
          },
          // "/system": {
          //   target: "http://110.42.239.134:17600/" ,
          //   changeOrigin: true,
          //   // rewrite: (p) => p.replace(/^\/dev-api/, '')
          // },
  

        },
      },
  // base:'./',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
