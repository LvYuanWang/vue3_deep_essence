<template>
  <div id="app">
    <h1>KeepAlive 内置组件测试</h1>
    <nav>
      <span v-for="(tagName, index) in tagArr" :key="index">
        {{ tagName }}
        <span class="close" @click="removeKeepAliveTag(tagName)">×</span>
      </span>
    </nav>
    <div class="view-container">
      <div class="navBar">
        <div v-for="(route, index) in routes" :key="index">
          <RouterLink :to="route.path">{{ route.name }}</RouterLink>
          <span @click="addKeepAliveTag(route.name)">＋</span>
        </div>
      </div>
      <div class="content-box">
        <RouterView v-slot="{ Component }">
          <keep-alive :include="tagArr">
            <component :is="Component" />
          </keep-alive>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { routes } from './Router'

const tagArr = ref([])
const addKeepAliveTag = (tagName) => {
  if (!tagArr.value.includes(tagName)) {
    tagArr.value.push(tagName)
  }
}

const removeKeepAliveTag = (tagName) => {
  const newTagArr = tagArr.value.filter((itemName) => itemName !== tagName)
  tagArr.value = newTagArr
}
</script>

<style scoped>
#app {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  user-select: none;
}

nav > span {
  padding: 5px 10px;
  color: blueviolet;
  text-decoration: none;
  border: 1px solid blueviolet;
  margin: 0 10px;
  border-radius: 5px;
  position: relative;
}

.close {
  position: absolute;
  right: -8px;
  top: -8px;
  background: blueviolet;
  color: #fff;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
}

.content-box {
  padding: 10px;
  border: 1px solid #ccc;
  flex: 1;
  padding: 0 20px;
}

.view-container {
  display: flex;
  margin-top: 20px;
  height: 78vh;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navBar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ccc;
  padding: 20px 10px;
}

.navBar div {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.navBar a {
  padding: 5px 10px;
  color: #fff;
  text-decoration: none;
  background-color: blueviolet;
  border-radius: 5px;
  flex: 1;
}

.navBar span {
  background-color: blueviolet;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
}

.close,
.navBar span {
  transition: all 0.5s;
}

.close:hover,
.navBar span:hover {
  opacity: 0.5;
}
</style>
