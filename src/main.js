import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'

const app = createApp(App)

app.config.globalProperties.Test = {
  msg: 'Hello from Test',
}

app.mount('#app')
