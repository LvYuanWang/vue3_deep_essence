import { ref, watchEffect } from "vue";

const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value.a; // 依赖 value 和 a 属性
  n;
});
setTimeout(() => {
  state.value.a = 2; // 要重新运行
}, 500);
setTimeout(() => {
  k.a = 3; // 要重新运行
  // k.a = 2; // 不重新运行, 因为值没有改变
}, 1000);
