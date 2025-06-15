import { reactive } from 'vue'

export const store = reactive({
  // 当前评分
  currentRating: 0,

  // 评分反馈
  feedback: '',

  // 历史评分记录
  ratingHistory: [],

  // 根据星级返回描述
  getRatingDescription() {
    const descriptions = ['', '非常不满意', '不满意', '一般', '满意', '非常满意']
    return descriptions[this.currentRating] || ''
  },

  // 提交评分
  submitRating() {
    if (this.currentRating > 0) {
      const newRating = {
        id: Date.now(),
        rating: this.currentRating,
        feedback: this.feedback,
        timestamp: new Date().toLocaleString(),
      }

      this.ratingHistory.push(newRating)

      // 重置当前评分和反馈
      this.resetRating()

      return true
    }
    return false
  },

  // 重置评分
  resetRating() {
    this.currentRating = 0
    this.feedback = ''
  },

  // 获取平均分
  getAverageRating() {
    if (this.ratingHistory.length === 0) return 0

    const sum = this.ratingHistory.reduce((total, item) => total + item.rating, 0)
    return (sum / this.ratingHistory.length).toFixed(1)
  },

  // 获取评分分布
  getRatingDistribution() {
    const distribution = [0, 0, 0, 0, 0]

    this.ratingHistory.forEach((item) => {
      if (item.rating > 0 && item.rating <= 5) {
        distribution[item.rating - 1]++
      }
    })

    return distribution
  },

  // 主题设置
  darkMode: false,

  // 切换主题
  toggleTheme() {
    this.darkMode = !this.darkMode
    document.body.classList.toggle('dark-theme', this.darkMode)
  },
})
