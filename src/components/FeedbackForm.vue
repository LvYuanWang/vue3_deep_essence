<template>
  <div class="feedback-form" :class="{ 'dark-theme': isDarkMode }">
    <div class="rating-description" v-if="currentRating > 0">
      <span>{{ ratingDescription }}</span>
    </div>
    <div class="feedback-input">
      <textarea v-model="feedbackText" placeholder="请输入您的反馈意见（可选）" rows="4"></textarea>
    </div>
    <div class="action-buttons">
      <button class="reset-btn" @click="handleReset">重置</button>
      <button class="submit-btn" @click="handleSubmit" :disabled="currentRating === 0">
        提交评分
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../store'

// 属性定义
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})

// 事件定义
const emit = defineEmits(['update:modelValue', 'submit', 'reset'])

// 计算属性
const currentRating = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const ratingDescription = computed(() => {
  const descriptions = ['', '非常不满意', '不满意', '一般', '满意', '非常满意']
  return descriptions[currentRating.value] || ''
})

// 反馈文本
const feedbackText = computed({
  get: () => store.feedback,
  set: (value) => (store.feedback = value),
})

// 是否暗黑模式
const isDarkMode = computed(() => store.darkMode)

// 方法
const handleSubmit = () => {
  if (currentRating.value > 0) {
    emit('submit', {
      rating: currentRating.value,
      feedback: feedbackText.value,
    })
  }
}

const handleReset = () => {
  currentRating.value = 0
  store.feedback = ''
  emit('reset')
}
</script>

<style scoped>
.feedback-form {
  margin: 20px 0;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.dark-theme {
  background-color: #333;
  color: #f0f0f0;
}

.rating-description {
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #ff9800;
}

.dark-theme .rating-description {
  color: #ffb74d;
}

.feedback-input textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: inherit;
  font-size: 16px;
  resize: vertical;
  transition: border 0.3s ease;
}

.dark-theme .feedback-input textarea {
  background-color: #444;
  color: #f0f0f0;
  border-color: #555;
}

.feedback-input textarea:focus {
  outline: none;
  border-color: #ff9800;
  box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.2);
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reset-btn {
  background-color: #f0f0f0;
  color: #666;
}

.submit-btn {
  background-color: #ff9800;
  color: white;
}

.reset-btn:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.submit-btn:hover:not(:disabled) {
  background-color: #f57c00;
}

.dark-theme .reset-btn {
  background-color: #555;
  color: #ddd;
}

.dark-theme .submit-btn {
  background-color: #ff9800;
}

.dark-theme .reset-btn:hover:not(:disabled) {
  background-color: #666;
}
</style>
