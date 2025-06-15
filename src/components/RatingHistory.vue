<template>
  <div class="rating-history" :class="{ 'dark-theme': isDarkMode }">
    <div class="history-header">
      <h2>评分历史</h2>
    </div>

    <div class="statistics" v-if="ratingHistory.length > 0">
      <div class="average-rating">
        <h3>平均评分</h3>
        <div class="average-score">{{ averageRating }}</div>
        <div class="stars">
          <span v-for="i in 5" :key="i" class="star">
            {{ i <= Math.round(averageRating) ? '★' : '☆' }}
          </span>
        </div>
      </div>

      <div class="rating-distribution">
        <h3>评分分布</h3>
        <div class="distribution-chart">
          <div v-for="(count, index) in distribution" :key="index" class="bar-container">
            <div class="bar-label">{{ index + 1 }}星</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: getPercentage(count) + '%' }"></div>
            </div>
            <div class="bar-count">{{ count }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="history-list" v-if="ratingHistory.length > 0">
      <h3>详细记录</h3>
      <transition-group name="list" tag="div">
        <div
          v-for="item in ratingHistory"
          :key="item.id"
          class="history-item"
          :class="{ 'with-feedback': item.feedback }"
        >
          <div class="history-rating">
            <span v-for="i in 5" :key="i" class="star">
              {{ i <= item.rating ? '★' : '☆' }}
            </span>
            <span class="rating-time">{{ item.timestamp }}</span>
          </div>
          <div class="history-feedback" v-if="item.feedback">
            <p>{{ item.feedback }}</p>
          </div>
        </div>
      </transition-group>
    </div>

    <div class="no-history" v-else>
      <p>暂无评分记录</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../store'

// 从store获取数据
const ratingHistory = computed(() => store.ratingHistory)
const isDarkMode = computed(() => store.darkMode)

// 计算平均评分
const averageRating = computed(() => {
  return store.getAverageRating()
})

// 计算评分分布
const distribution = computed(() => {
  return store.getRatingDistribution()
})

// 计算百分比
const getPercentage = (count) => {
  const total = ratingHistory.value.length
  if (total === 0) return 0
  return (count / total) * 100
}
</script>

<style scoped>
.rating-history {
  margin-top: 30px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.dark-theme {
  background-color: #333;
  color: #f0f0f0;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.history-header h2 {
  margin: 0;
  color: #333;
}

.dark-theme .history-header h2 {
  color: #f0f0f0;
}

.theme-toggle {
  cursor: pointer;
  font-size: 24px;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.dark-theme .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.statistics {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.average-rating,
.rating-distribution {
  flex: 1;
  min-width: 250px;
  padding: 15px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark-theme .average-rating,
.dark-theme .rating-distribution {
  background-color: #444;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

h3 {
  margin-top: 0;
  color: #555;
}

.dark-theme h3 {
  color: #ccc;
}

.average-score {
  font-size: 36px;
  font-weight: bold;
  color: #ff9800;
  margin: 10px 0;
}

.dark-theme .average-score {
  color: #ffb74d;
}

.stars {
  color: #ff9800;
  font-size: 24px;
}

.dark-theme .stars {
  color: #ffb74d;
}

.distribution-chart {
  margin-top: 15px;
}

.bar-container {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.bar-label {
  width: 40px;
  text-align: right;
  margin-right: 10px;
  font-size: 14px;
  color: #666;
}

.dark-theme .bar-label {
  color: #bbb;
}

.bar {
  flex-grow: 1;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.dark-theme .bar {
  background-color: #555;
}

.bar-fill {
  height: 100%;
  background-color: #ff9800;
  transition: width 0.5s ease;
}

.bar-count {
  width: 30px;
  text-align: right;
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}

.dark-theme .bar-count {
  color: #bbb;
}

.history-list {
  margin-top: 20px;
}

.history-item {
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.dark-theme .history-item {
  background-color: #444;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.history-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dark-theme .history-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.history-rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history-rating .star {
  color: #ff9800;
  font-size: 18px;
}

.dark-theme .history-rating .star {
  color: #ffb74d;
}

.rating-time {
  font-size: 14px;
  color: #999;
}

.dark-theme .rating-time {
  color: #777;
}

.history-feedback {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.dark-theme .history-feedback {
  border-top-color: #555;
}

.history-feedback p {
  margin: 0;
  font-style: italic;
  color: #666;
}

.dark-theme .history-feedback p {
  color: #bbb;
}

.no-history {
  text-align: center;
  padding: 30px;
  color: #999;
  font-style: italic;
}

.dark-theme .no-history {
  color: #777;
}

/* 动画效果 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
