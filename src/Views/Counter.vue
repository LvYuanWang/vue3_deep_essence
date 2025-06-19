<template>
  <div>
    <h2>计数器</h2>
    <p>当前计数：{{ count }}</p>
    <button @click="count++">增加</button>
  </div>
</template>

<script setup>
import {
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

const count = ref(0)

console.log('计数器组件 [创建完成]')
onBeforeMount(() => {
  console.log('计数器组件 [即将加载]')
})
onMounted(() => {
  console.log('计数器组件 [加载完成]')
})
onBeforeUnmount(() => {
  console.log('计数器组件 [即将卸载]')
})
onUnmounted(() => {
  console.log('计数器组件 [卸载完成]')
})
onActivated(() => {
  console.log('计数器组件 [激活]')
})
onDeactivated(() => {
  console.log('计数器组件 [失活]')
})
</script>

<script>
export default {
  name: 'Counter',
}
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
}
button:hover {
  background-color: #36a373;
}
</style>
