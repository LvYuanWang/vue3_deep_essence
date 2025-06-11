<template>
  <div class="app-container">
    <div class="content-title">Slot</div>
    <CardComponent>
      <!-- 可以向子组件传递模板内容 -->
      <template v-slot:card-header="slotsProps"> {{ slotsProps.title }} </template>
      <div>
        <img src="./assets/机械武士.jpg" alt="机械" />
        <p>以绝望挥剑,着逝者为铠! —— 《铠》</p>
      </div>
    </CardComponent>
  </div>
</template>

<script setup>
// import CardComponent from './components/CardComponent.vue'
import CardComponent from './components/CardComponent/CardComponent.js'
</script>

<style scoped>
.app-container {
  width: 400px;
  border: 1px solid;
  padding: 10px;
  box-sizing: border-box;
}

.content-title {
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 10px;
}

img {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ececec;
}
</style>
