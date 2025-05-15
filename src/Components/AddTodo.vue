<template>
  <div class="add-todo">
    <input type="text" v-model="newTodo" placeholder="请输入待办事项" />
    <button @click="addTodo">添加</button>
  </div>
</template>

<script setup>
import { store } from '@/store'
import { ref } from 'vue'

const newTodo = ref('')

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    store.addTodo({
      id: Date.now(),
      text: newTodo.value,
      completed: false,
    })
    newTodo.value = ''
  }
}
</script>

<style scoped>
.add-todo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.add-todo input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.add-todo button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
