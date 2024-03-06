import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  // 使用 uView UI
  app.use(uviewPlus)

  return {
    app,
  }
}
