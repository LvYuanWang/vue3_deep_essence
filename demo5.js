import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value; // 依赖 value 属性
  state.value.a; // 依赖 value 和 a 属性
  n;
});
setTimeout(() => {
  state.value.a = 100; // 会重新运行
}, 500);
