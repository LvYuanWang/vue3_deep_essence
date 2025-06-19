import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'

const app = createApp(App)

app.config.globalProperties.Test = {
  msg: 'Hello from Test',
}

app.use(router).mount('#app')
