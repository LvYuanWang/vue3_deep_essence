<template>
  <div>
    <h2>复选框列表</h2>
    <ul>
      <li v-for="item in checkboxData" :key="item.id">
        <label :for="item.id">
          <input :id="item.id" type="checkbox" v-model="item.checked" />
          <b>{{ item.name }}</b>
        </label>
      </li>
    </ul>
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

const checkboxData = ref([
  { id: 1, name: '吃饭', checked: false },
  { id: 2, name: '睡觉', checked: false },
  { id: 3, name: '打豆豆', checked: false },
  { id: 4, name: '看电视', checked: false },
  { id: 5, name: '玩游戏', checked: false },
  { id: 6, name: '学习', checked: false },
  { id: 7, name: '写代码', checked: false },
  { id: 8, name: '看书', checked: false },
  { id: 9, name: '逛街', checked: false },
  { id: 10, name: '旅游', checked: false },
  { id: 11, name: '看电影', checked: false },
  { id: 12, name: '听音乐', checked: false },
  { id: 13, name: '跳舞', checked: false },
  { id: 14, name: '唱歌', checked: false },
  { id: 15, name: '画画', checked: false },
  { id: 16, name: '写字', checked: false },
  { id: 17, name: '健身', checked: false },
  { id: 18, name: '跑步', checked: false },
  { id: 19, name: '骑车', checked: false },
  { id: 20, name: '游泳', checked: false },
  { id: 21, name: '爬山', checked: false },
  { id: 22, name: '滑雪', checked: false },
  { id: 23, name: '滑板', checked: false },
  { id: 24, name: '滑冰', checked: false },
  { id: 25, name: '钓鱼', checked: false },
  { id: 26, name: '植物', checked: false },
  { id: 27, name: '养宠物', checked: false },
  { id: 28, name: '养花', checked: false },
])

console.log('复选框组件 [创建完成]')
onBeforeMount(() => {
  console.log('复选框组件 [即将加载]')
})
onMounted(() => {
  console.log('复选框组件 [加载完成]')
})
onBeforeUnmount(() => {
  console.log('复选框组件 [即将卸载]')
})
onUnmounted(() => {
  console.log('复选框组件 [卸载完成]')
})
onActivated(() => {
  console.log('复选框组件 [激活]')
})
onDeactivated(() => {
  console.log('复选框组件 [失活]')
})
</script>

<script>
export default {
  name: 'CheckboxList',
}
</script>

<style scoped>
ul {
  user-select: none;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
}

li {
  font-size: 18px;
  border-radius: 10px;
  box-shadow: 0 0 4px #ddd;
  margin-bottom: 10px;
}

li > label {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

input[type='checkbox'] {
  width: 25px;
  height: 25px;
  appearance: none;
}

input[type='checkbox']::before {
  content: '';
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 1px solid #ddd;
  border-radius: 50%;
  margin-right: 10px;
}

input[type='checkbox']:checked::before {
  background-color: #42b983;
}
</style>
