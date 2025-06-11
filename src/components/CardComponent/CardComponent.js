import { defineComponent, h, ref } from 'vue'
import styles from './CardComponent.module.css'

export default defineComponent({
  name: 'CardComponent',
  setup(_, { slots }) {
    const title = ref('子组件标题1234')
    const defaultSlotsVNode = slots.default()
    const headerSlotsVNode = slots['card-header']?.({
      title: title.value,
    })
    return () =>
      h('div', { class: styles.card }, [
        h(
          'div',
          { class: styles['card-header'] },
          headerSlotsVNode?.length ? headerSlotsVNode : h('div', null, '默认标题'),
        ),
        h('div', { class: styles['card-body'] }, defaultSlotsVNode),
      ])
  },
})
