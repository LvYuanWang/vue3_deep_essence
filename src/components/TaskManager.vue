<template>
  <div class="task-manager">
    <h2 class="title">任务列表</h2>
    <div class="tasks-list">
      <div
        v-for="task in tasks"
        :key="task.id"
        :class="['task-item', { unCompleted: task.completed }]"
      >
        <div class="task-name">{{ task.task }}</div>
        <button
          class="btn task-btn"
          @click="task.completed ? unCompletedTask(task.id) : completedTask(task.id)"
        >
          {{ task.completed ? '取消完成' : '完成' }}
        </button>
      </div>
    </div>
    <div class="add-newTask">
      <input class="input-task" type="text" placeholder="添加新任务" v-model="newTaskTitle" />
      <button class="add-task-btn btn" @click="addTask">添加任务</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs } from 'vue'

export default defineComponent({
  name: 'TaskManager',
  props: {
    initialTasks: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  emits: ['task-completed', 'task-unCompleted'],
  setup(props, { emit }) {
    const { initialTasks } = toRefs(props)
    const tasks = ref([...initialTasks.value]) // 任务列表
    const newTaskTitle = ref('') // 新任务标题

    // 方法
    // 新增任务
    const addTask = () => {
      if (newTaskTitle.value.trim().length === 0) {
        alert('请输入你要添加的新任务!!!')
        return
      }
      // 添加任务
      tasks.value.push({
        id: Date.now(),
        task: newTaskTitle.value.trim(),
        completed: false,
      })
      newTaskTitle.value = '' // 清空输入框
    }
    // 标记为已完成
    const completedTask = (id) => {
      const task = tasks.value.find((task) => task.id === id)
      task && ((task.completed = true), emit('task-completed', task))
    }
    // 标记为未完成
    const unCompletedTask = (id) => {
      const task = tasks.value.find((task) => task.id === id)
      task && ((task.completed = false), emit('task-unCompleted', task))
    }

    return {
      tasks,
      newTaskTitle,
      addTask,
      completedTask,
      unCompletedTask,
    }
  },
})
</script>

<style scoped>
* {
  user-select: none;
}

.btn {
  color: #fff;
  border-radius: 5px;
}

.btn:hover {
  opacity: 0.6;
}

.task-manager {
  background-color: #f1f1f1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 50%;
  box-shadow: 0 2px 6px #ccc;
}

.title {
  text-align: center;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
}

.task-name {
  font-size: 20px;
}

.task-btn {
  background-color: rgb(29, 233, 29);
  padding: 5px 15px;
}

.unCompleted {
  text-decoration: line-through;
  color: #ccc;
  background-color: #95ff8d87;
}

.unCompleted .task-btn {
  background-color: #ccc;
}

.add-newTask {
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.input-task {
  flex: 1;
  height: 40px;
  border-radius: 5px;
  box-sizing: border-box;
}

.add-task-btn {
  background-color: rgb(46, 46, 242);
  height: 40px;
  padding: 0 15px;
}
</style>
