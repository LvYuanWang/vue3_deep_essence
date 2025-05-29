// 测试文件

import { effect } from "./effect/effect.js";
import { reactive } from "./reactive.js";

const obj = {
  a: 1,
  b: 2,
};
const state = reactive(obj);

// 测试 1
// function fn() {
//   console.log("fn");
//   state.a = state.a + 1;
// }
// effect(fn);
// state.a = 100;

// 测试 2
// effect(() => {
//   if (state.a === 1) {
//     state.b;
//   } else {
//     state.c;
//   }
//   console.log("执行了函数1");
// });
// effect(() => {
//   console.log(state.c);
//   console.log("执行了函数2");
// });
// state.a = 2;
// state.c = 2;
// state.b = 2;

// 懒执行
// function fn() {
//   console.log("fn");
//   state.a = state.a + 1;
// }
// const effectFn = effect(fn, { lazy: true });
// state.a = 100;
// effectFn(); // 只有在执行了这个函数之后, 才会建立依赖关系

// 用户指定依赖函数如何进行处理
function fn() {
  console.log("fn");
  state.a = state.a + 1;
}
let isRun = false;
const effectFn = effect(fn, {
  lazy: true,
  scheduler: (eff) => {
    // 由用户来决定如何处理依赖的函数
    Promise.resolve().then(() => {
      if (!isRun) {
        isRun = true;
        eff(); // 执行依赖函数
      }
    });
  },
});
effectFn();
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
