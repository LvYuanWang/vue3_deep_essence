import { ref, watchEffect } from "vue";

const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a = 2; // 注意这里的依赖仅仅只有 value 属性, 因为 a 属性是赋值操作
});
setTimeout(() => {
  state.value.a = 100; // 不会重新运行
  // state.value = {}; // 会重新运行
}, 500);
