import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  // 首先判断依赖关系
  console.log("运行");
  state; // 没有依赖关系产生
  state.value; // 会产生依赖关系, 依赖 value 属性
  state.value.a; // 会产生依赖关系, 依赖 value 和 a 属性
  n; // 没有依赖关系产生
});
setTimeout(() => {
  state.value = { a: 3 }; // 要重新运行
}, 500);
