import { ref, watchEffect } from "vue";

let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a; // 依赖 value 和 a 属性
  k.a; // 返回的 proxy 对象的 a 成员
});
setTimeout(() => {
  state.value = { a: 1 }; // 会重新运行
}, 500);
setTimeout(() => {
  k.a = 3; // 会重新运行, 因为前面依赖了 k 对象中的 a 属性
}, 1000);
setTimeout(() => {
  state.value.a = 4; // 会重新运行
}, 1500);
