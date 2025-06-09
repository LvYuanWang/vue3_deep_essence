// 测试文件
import { computed } from "./computed.js";
import { effect } from "./effect/effect.js";
import { reactive } from "./reactive.js";

const state = reactive({
  a: 1,
  b: 2,
});
const sum = computed(() => {
  console.log("计算属性进行计算了");
  return state.a + state.b;
});
// console.log(sum.value);
// // state.a = 2;
// console.log(sum.value);
// console.log(sum.value);
// console.log(sum.value);
// console.log(sum.value);
// state.a = 20;
// console.log(sum.value);

// 假设渲染函数依赖计算属性的值, 那么当计算属性的值发生变化时, 渲染函数会重新执行
effect(() => {
  // 假设这个是渲染函数, 依赖了 sum 这个计算属性
  console.log("render", sum.value);
});

state.a = 100;
