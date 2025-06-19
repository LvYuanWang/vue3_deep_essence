<template>
  <div>
    <h2>文本输入框</h2>
    <input type="text" v-model="msg" />
    <p>
      输入的内容是：<b>{{ msg }}</b>
    </p>
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

const msg = ref('')

console.log('文本框组件 [创建完成]')
onBeforeMount(() => {
  console.log('文本框组件 [即将加载]')
})
onMounted(() => {
  console.log('文本框组件 [加载完成]')
})
onBeforeUnmount(() => {
  console.log('文本框组件 [即将卸载]')
})
onUnmounted(() => {
  console.log('文本框组件 [卸载完成]')
})
onActivated(() => {
  console.log('文本框组件 [激活]')
})
onDeactivated(() => {
  console.log('文本框组件 [失活]')
})
</script>

<script>
export default {
  name: 'TextInput',
}
</script>

<style scoped>
input {
  padding: 5px 10px;
  border: none;
  box-shadow: 0 0 4px #ddd;
  border-radius: 5px;
  margin: 0 10px;
  outline: none;
  width: 40%;
  font-size: 20px;
}
</style>
