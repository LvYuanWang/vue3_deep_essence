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
  k.a = 2; // 这里相当于是操作了 proxy 对象的成员 a
  // 要重新运行
  // 如果将上面的 state.value.a 注释掉就不会重新运行
}, 500);
