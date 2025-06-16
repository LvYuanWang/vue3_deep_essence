<template>
  <div id="app">
    <h1>任务管理应用</h1>
    <TaskManager
      :initial-tasks="task"
      @task-completed="handleTaskCompleted"
      @task-unCompleted="handleTaskUnCompleted"
    />
  </div>
</template>

<script>
import TaskManager from './components/TaskManager.vue'

export default {
  name: 'App',
  components: {
    TaskManager,
  },
  data() {
    return {
      task: [
        { id: 1, task: '学习 Vue.js', completed: true },
        { id: 2, task: '学习 React.js', completed: true },
        { id: 3, task: '学习 Laravel', completed: true },
      ],
    }
  },
  methods: {
    // 完成任务
    handleTaskCompleted(task) {
      console.log('任务完成', task)
    },
    // 任务未完成
    handleTaskUnCompleted(task) {
      console.log('取消完成', task)
    },
  },
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
</style>
