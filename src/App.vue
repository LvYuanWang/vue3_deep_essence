<template>
  <div>
    <UserCard name="小白" email="Anna@outlook.com" avatar="src/assets/蜘蛛侠.jpg" />

    <!-- <h2>商品列表</h2>
    <ul>
      <li v-for="(product, index) in products" :key="index">
        {{ product.name }} - {{ product.price }}
      </li>
    </ul> -->
  </div>
</template>

<script setup>
// import UserCard from './components/UserCard.vue'
import UserCard from '@/components/UserCard/UserCard.js'

// import { ref } from 'vue'
// const products = ref([
//   { name: '键盘', price: 99.99 },
//   { name: '鼠标', price: 49.99 },
//   { name: '显示器', price: 199.99 },
//   { name: '主机', price: 2999.99 },
//   { name: '耳机', price: 199.99 },
//   { name: '音响', price: 499.99 },
//   { name: '路由器', price: 299.99 },
//   { name: '打印机', price: 799.99 },
//   { name: '扫描仪', price: 599.99 },
//   { name: '投影仪', price: 1999.99 },
//   { name: '摄像头', price: 299.99 },
//   { name: '麦克风', price: 199.99 },
//   { name: '游戏手柄', price: 399.99 },
//   { name: 'VR眼镜', price: 999.99 },
//   { name: '平板电脑', price: 1999.99 },
//   { name: '智能手机', price: 6999.99 },
//   { name: '智能手表', price: 1999.99 },
//   { name: '智能音箱', price: 499.99 },
//   { name: '智能家居', price: 999.99 },
//   { name: '无人机', price: 2999.99 },
//   { name: '3D打印机', price: 9999.99 },
//   { name: '游戏机', price: 2999.99 },
//   { name: '电子书', price: 999.99 },
//   { name: '数码相机', price: 4999.99 },
//   { name: '单反相机', price: 9999.99 },
//   { name: '微单相机', price: 6999.99 },
//   { name: '运动相机', price: 2999.99 },
//   { name: '行车记录仪', price: 999.99 },
//   { name: '智能手环', price: 199.99 },
// ])
</script>

<style scoped></style>
