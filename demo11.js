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
  k.a = 3; // 这里不会重新运行, 因为前面修改了 state.value, 不再是同一个代理对象了
}, 1000);
