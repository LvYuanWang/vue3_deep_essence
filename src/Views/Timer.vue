<template>
  <div class="component">
    <h1>计时器</h1>
    <p>时间: {{ formattedTime }}</p>
    <button @click="startTimer" :disabled="timerRunning">开始</button>
    <button @click="stopTimer" :disabled="!timerRunning">停止</button>
  </div>
</template>

<script setup>
import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
  computed,
  onActivated,
  onDeactivated,
} from 'vue'

const seconds = ref(0)
const milliSeconds = ref(0)
const timerRunning = ref(false)

let timer

function startTimer() {
  if (!timerRunning.value) {
    timerRunning.value = true
    timer = setInterval(() => {
      milliSeconds.value++
      if (milliSeconds.value >= 100) {
        milliSeconds.value = 0
        seconds.value++
      }
    }, 10)
  }
}

function stopTimer() {
  if (timerRunning.value) {
    timerRunning.value = false
    clearInterval(timer)
  }
}

const formattedTime = computed(() => {
  const s = seconds.value.toString().padStart(2, '0')
  const ms = milliSeconds.value.toString().padStart(2, '0')
  return `${s}:${ms}`
})

console.log('计时器组件 [创建完成]')
onBeforeMount(() => {
  console.log('计时器组件 [即将加载]')
})
onMounted(() => {
  console.log('计时器组件 [加载完成]')
})
onBeforeUnmount(() => {
  console.log('计时器组件 [即将卸载]')
})
onUnmounted(() => {
  console.log('计时器组件 [卸载完成]')
  clearInterval(timer)
})
onActivated(() => {
  console.log('计时器组件 [激活]')
})
onDeactivated(() => {
  console.log('计时器组件 [失活]')
})
</script>

<script>
export default {
  name: 'Timer',
}
</script>

<style scoped>
.component {
  padding: 20px;
  background-color: #fff;
}
h1 {
  color: #333;
}
p {
  font-size: 1.5em;
}
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
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
