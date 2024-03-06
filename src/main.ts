import { createSSRApp } from 'vue'
import uView from 'uview-plus'
import App from './App.vue'
import { createPinia } from 'pinia'
export function createApp() {
  const app = createSSRApp(App)
  // 使用 uView UI
  app.use(uView)
  app.use(createPinia())
  return {
    app,
  }
}
