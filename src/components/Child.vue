<template>
  <div class="child-container">
    <h2>Child-Components</h2>
    <h3>name: {{ name }}</h3>
    <h3>email: {{ email }}</h3>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  email: String,
})
</script>

<style scoped>
.child-container {
  width: 300px;
  border: 1px solid;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
