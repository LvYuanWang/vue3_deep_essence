import { reactive } from 'vue'

export const store = reactive({
  todos: [
    { id: 1, text: '学习 Vue3', completed: false },
    { id: 2, text: '学习 Vite', completed: false },
    { id: 3, text: '学习 Pinia', completed: false },
  ],
  addTodo(todo) {
    this.todos.push(todo)
  },
  toggleTodo(id) {
    const todo = this.todos.find((todo) => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  },
})
