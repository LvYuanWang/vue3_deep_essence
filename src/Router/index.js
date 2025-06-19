import CheckboxList from '@/Views/CheckboxList.vue'
import Counter from '@/Views/Counter.vue'
import TextInput from '@/Views/TextInput.vue'
import Timer from '@/Views/Timer.vue'
import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  { path: '/', name: 'CheckboxList', component: CheckboxList },
  { path: '/counter', name: 'Counter', component: Counter },
  { path: '/timer', name: 'Timer', component: Timer },
  { path: '/textInput', name: 'TextInput', component: TextInput },
]

const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 history 模式
  routes,
})

export default router
