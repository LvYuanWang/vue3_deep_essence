// import { defineComponent, h } from 'vue'
// import styles from './UserCard.module.css'
// export default defineComponent({
//   name: 'UserCard',
//   props: {
//     name: String,
//     email: String,
//     avatar: String,
//   },
//   setup(props) {
//     // 下面我们使用了渲染函数的形式来描述了原本在模板中所描述的试图结构
//     return () =>
//       h('div', { class: styles.userCardContainer }, [
//         h('div', { class: styles.imgBox }, [
//           h('img', {
//             class: styles.avatar,
//             src: props.avatar,
//             alt: 'User Avatar',
//           }),
//         ]),
//         h('div', { class: styles.userCardContent }, [
//           h('h2', { class: styles.userCardName }, props.name),
//           h('span', props.email),
//         ]),
//       ])
//   },
// })

// vue2的写法
import { h } from 'vue'
import styles from './UserCard.module.css'
export default {
  name: 'UserCard',
  props: {
    name: String,
    email: String,
    avatar: String,
  },
  render() {
    return h('div', { class: styles.userCardContainer }, [
      h('div', { class: styles.imgBox }, [
        h('img', {
          class: styles.avatar,
          src: this.avatar,
          alt: 'User Avatar',
        }),
      ]),
      h('div', { class: styles.userCardContent }, [
        h('h2', { class: styles.userCardName }, this.name),
        h('span', this.email),
      ]),
    ])
  },
}
