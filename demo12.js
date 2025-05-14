import { ref, watchEffect } from "vue";

let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a; // 依赖 value 和 a 属性
});
setTimeout(() => {
  state.value = { a: 1 }; // 会重新运行
}, 500);
setTimeout(() => {
  state.value.a = 2; // 会重新运行
}, 1000);
