<template>
  <div id="app" :class="{ 'dark-theme': isDarkMode }">
    <div class="header">
      <h1>服务评分系统</h1>
      <div class="theme-toggle" @click="toggleTheme">
        <span v-if="isDarkMode">☀️</span>
        <span v-else>🌙</span>
      </div>
    </div>

    <div class="rating-section">
      <h2>请对本次服务评分:</h2>
      <Rating v-model="starNum" />
      <p v-show="starNum > 0" class="current-rating">
        您当前的评级为: <span>{{ starNum }}/5</span> - {{ ratingDescription }}
      </p>
    </div>

    <transition name="fade">
      <FeedbackForm
        v-if="starNum > 0"
        v-model="starNum"
        @submit="handleSubmitRating"
        @reset="handleResetRating"
      />
    </transition>

    <RatingHistory />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Rating from './components/Rating.vue'
import FeedbackForm from './components/FeedbackForm.vue'
import RatingHistory from './components/RatingHistory.vue'
import { store } from './store'

// 评分数据
const starNum = computed({
  get: () => store.currentRating,
  set: (value) => (store.currentRating = value),
})

// 评分描述
const ratingDescription = computed(() => {
  return store.getRatingDescription()
})

// 是否暗黑模式
const isDarkMode = computed(() => store.darkMode)

// 提交评分
const handleSubmitRating = (data) => {
  store.currentRating = data.rating
  store.feedback = data.feedback

  if (store.submitRating()) {
    // 提交成功，可以添加成功提示
    alert('感谢您的评分！')
  }
}

// 重置评分
const handleResetRating = () => {
  store.resetRating()
}

// 切换主题
const toggleTheme = () => {
  store.toggleTheme()
}
</script>

<style scoped>
#app {
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  transition: all 0.3s ease;
}

.dark-theme {
  color: #f0f0f0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.dark-theme .header {
  border-bottom-color: #444;
}

.theme-toggle {
  cursor: pointer;
  font-size: 24px;
  padding: 8px;
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dark-theme .theme-toggle {
  background-color: #444;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.theme-toggle:hover {
  transform: rotate(15deg);
}

.rating-section {
  margin-bottom: 20px;
}

h1 {
  margin: 0;
  color: #333;
}

.dark-theme h1 {
  color: #f0f0f0;
}

h2 {
  color: #555;
  margin-top: 0;
}

.dark-theme h2 {
  color: #ddd;
}

p {
  font-size: 18px;
  color: #666;
  margin-top: 15px;
}

.dark-theme p {
  color: #bbb;
}

.current-rating {
  animation: fadeIn 0.5s ease;
}

.current-rating span {
  font-weight: bold;
  color: #ff9800;
}

.dark-theme .current-rating span {
  color: #ffb74d;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
