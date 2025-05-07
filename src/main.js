import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.config.globalProperties.Test = {
  msg: 'Hello from Test',
}

app.mount('#app')
