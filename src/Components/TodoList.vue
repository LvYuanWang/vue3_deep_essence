<template>
  <div class="todo-list">
    <ul>
      <li v-for="todo in store.todos" :key="todo.id" :class="{ completed: todo.completed }">
        <span>{{ todo.text }}</span>
        <button @click="store.toggleTodo(todo.id)">
          {{ todo.completed ? '已完成' : '未完成' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { store } from '@/store'
</script>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-list ul {
  list-style-type: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  width: 500px;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.todo-list li span {
  flex-grow: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
}

.todo-list li button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.todo-list li button:hover {
  background-color: #36a76a;
}

.completed {
  text-decoration: line-through;
  color: #666666;
}
</style>
