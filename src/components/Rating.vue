<template>
  <div class="stars-container" :class="{ 'dark-theme': isDarkMode }">
    <span
      v-for="star in 5"
      :key="star"
      @click="setRatingStar(star)"
      @mouseover="hoverRating = star"
      @mouseleave="hoverRating = 0"
      class="star"
      :class="{
        filled: star <= (hoverRating || currentRating),
        hover: star <= hoverRating && star > currentRating,
        selected: star <= currentRating,
      }"
    >
      <transition name="pulse">
        <span class="star-icon">{{ star <= (hoverRating || currentRating) ? '★' : '☆' }}</span>
      </transition>
    </span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store } from '../store'

// 使用props和emit替代defineModel
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue'])

// 计算属性替代直接使用modelValue
const currentRating = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const hoverRating = ref(0)
const isDarkMode = computed(() => store.darkMode)

function setRatingStar(star) {
  if (currentRating.value === star) {
    // 如果点击当前已选中的星星，则取消选择
    currentRating.value = 0
  } else {
    currentRating.value = star
  }
}
</script>

<style scoped>
.stars-container {
  font-size: 30px;
  color: #ddd;
  display: inline-flex;
  transition: all 0.3s ease;
}

.dark-theme {
  color: #555;
}

.star {
  cursor: pointer;
  margin: 0 3px;
  position: relative;
  transition:
    transform 0.2s ease,
    color 0.3s ease;
}

.star:hover {
  transform: scale(1.2);
}

.star.filled {
  color: #ff9800;
}

.dark-theme .star.filled {
  color: #ffb74d;
}

.star.hover {
  color: #ffb74d;
  opacity: 0.8;
}

.star.selected {
  color: #ff9800;
}

.dark-theme .star.selected {
  color: #ffb74d;
}

.star-icon {
  display: inline-block;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pulse-enter-active {
  animation: pulse 0.3s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
