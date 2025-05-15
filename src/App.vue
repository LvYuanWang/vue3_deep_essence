<template>
  <div id="app">
    <h1>Todo List</h1>
    <TodoList />
    <AddTodo />
  </div>
</template>

<script setup>
import TodoList from './Components/todoList.vue'
import AddTodo from './Components/AddTodo.vue'
</script>

<style scoped>
h1 {
  text-align: center;
  color: #42b983;
}
</style>
