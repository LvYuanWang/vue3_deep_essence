import { cleanup, effect } from "./effect/effect.js";

/**
 * 用于声明在数据更改时调用的侦听回调
 * @param {object|function|Array} source 响应式数据或者 getter 函数 (数组的情况暂不考虑)
 * @param {function} callback 要执行的回调函数
 * @param {object} options 选项对象
 * @returns {function} 返回一个取消监听的函数
 */
export function watch(source, callback, options = {}) {
  // 1. 参数归一化, 再次重申, 这里没有考虑数组的情况
  let getter;
  if (typeof source === "function") {
    getter = source;
  } else {
    getter = () => traverse(source);
  }

  let oldValue, newValue; // 用于存储 getter 上一次的值和当前值

  let isRun = false; // 用于标记是否已经执行过一次

  const job = () => {
    if (options.once && isRun) {
      return; // 如果已经执行过一次, 则不再执行
    }
    isRun = true; // 标记为已执行
    newValue = effectFn(); // 获取新的值
    callback(newValue, oldValue); // 执行回调函数
    oldValue = newValue; // 更新旧值
  };

  const effectFn = effect(getter, {
    lazy: true,
    scheduler: () => {
      if (options.flush === "post") {
        // 如果是 postFlush, 则 job 将在下一个微任务中执行(如 Promise.then)
        Promise.resolve().then(job);
      } else {
        // 否则, 直接执行 job
        job();
      }
    },
  });

  if (options.immediate) {
    job(); // 如果 immediate 为 true, 则立即执行一次
  } else {
    effectFn();
  }

  return () => {
    cleanup(effectFn); // 清理依赖
  };
}

/**
 * 该工具方法用于遍历对象的所有属性, 包括嵌套对象的属性
 * 之所以要遍历, 是为了触发这些属性的依赖收集
 * @param {*} value
 * @param {*} seen
 */
function traverse(value, seen = new Set()) {
  if (value === null || typeof value !== "object" || seen.has(value)) {
    return value;
  }

  seen.add(value);

  for (const key in value) {
    traverse(value[key], seen);
  }

  return value;
}
