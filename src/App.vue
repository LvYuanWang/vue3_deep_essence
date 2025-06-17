<template>
  <div id="app">
    <button @click="isShow = !isShow">{{ isShow ? '隐藏' : '显示' }}</button>
    <Counter v-if="isShow" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Counter from './components/Counter.vue'

const isShow = ref(true)
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 30px;
  user-select: none;
}
</style>
