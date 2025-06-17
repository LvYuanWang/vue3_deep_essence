<template>
  <div class="lifecycle_demo">
    <h2>演示Vue3生命周期钩子函数</h2>
    <div class="count_num">计数: {{ countNum }}</div>
    <button @click="countNum++">增加计数</button>
  </div>
</template>

<script setup>
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from 'vue'

const countNum = ref(0)

onBeforeMount(() => {
  console.log('onBeforeMount')
})
onMounted(() => {
  console.log('onMounted')
})
onBeforeUpdate(() => {
  console.log('onBeforeUpdate')
})
onUpdated(() => {
  console.log('onUpdated')
})
onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
})
onUnmounted(() => {
  console.log('onUnmounted')
})
</script>

<style scoped>
.lifecycle_demo {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 3px 6px #ccc;
  width: 60%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
}

h2 {
  color: #48da48;
}
</style>
