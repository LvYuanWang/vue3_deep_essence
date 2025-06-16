<template>
  <div id="app">
    <h1>任务管理应用</h1>
    <TaskManager
      :initial-tasks="tasks"
      @task-completed="handleTaskCompleted"
      @task-unCompleted="handleTaskUnCompleted"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import TaskManager from './components/TaskManager.vue'

export default defineComponent({
  name: 'App',
  components: {
    TaskManager,
  },
  setup() {
    const tasks = ref([
      { id: 1, task: '学习 Vue.js', completed: false },
      { id: 2, task: '学习 React.js', completed: false },
      { id: 3, task: '学习 Laravel', completed: false },
    ])

    const handleTaskCompleted = (task) => {
      console.log('任务完成', task)
    }

    const handleTaskUnCompleted = (task) => {
      console.log('取消完成', task)
    }

    return {
      tasks,
      handleTaskCompleted,
      handleTaskUnCompleted,
    }
  },
})
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
</style>
