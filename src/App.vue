<template>
  <div>{{ count }}</div>
  <button v-on:click="count++">count++</button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(1)
</script>

<style scoped></style>
