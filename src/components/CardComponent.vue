<template>
  <div class="card">
    <div class="card-header">
      <slot name="card-header" :title>default title</slot>
    </div>
    <div class="card-body">
      <slot>This is ShowBox card-body container info</slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('子组件传递的标题')
</script>

<style scoped>
* {
  user-select: none;
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-header {
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
  padding: 5px 0;
}

.card-body {
  background-color: #f9f9f9;
  flex: 1;
  padding: 10px;
}
</style>
