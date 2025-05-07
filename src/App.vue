<template>
  <div class="app-container">
    <h1>App</h1>
    <Child name="李四" email="123@qq.com" />
    <component :is="vNode" />
  </div>
</template>

<script setup>
import { h } from 'vue'
import Child from './components/Child.vue'

const vNode = h(Child, {
  name: '张三',
  email: '123@qq.com',
})
console.log('vNode: ', vNode) // 打印虚拟节点
</script>

<style scoped>
.app-container {
  width: 400px;
  border: 1px solid;
  padding: 10px;
  box-sizing: border-box;
}
</style>
