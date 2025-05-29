/**
 * 记录当前活动的 effect
 */
export let activeEffect = null;
/**
 * 保存依赖关系
 */
export const targetMap = new Map();
const effectStack = []; // 保存函数栈

/**
 * 该函数的作用, 是执行传入的函数, 并且在执行的过程中, 收集依赖
 * @param {*} fn 回调函数
 */
export function effect(fn, options = {}) {
  const { lazy = false } = options; // 是否懒执行
  const environment = () => {
    try {
      // 尝试执行的代码, 这里可能会抛出错误
      activeEffect = environment; // 记录当前的函数
      // 将环境函数推入栈(其实就是在模拟真实的函数栈)
      effectStack.push(environment);
      // 清除依赖
      cleanup(environment);
      return fn();
    } finally {
      // 无论是否抛出错误, 都要执行的代码, 确保资源总是被释放
      effectStack.pop(); // 执行完毕, 弹出栈
      activeEffect = effectStack[effectStack.length - 1]; // 取出栈顶的函数
    }
  };
  environment.deps = []; // 用来记录该环境函数在哪些集合里面
  environment.options = options; // 保存选项
  if (!lazy) {
    // 如果不是懒执行, 则立即执行
    environment(); // 执行环境函数
  }
  return environment;
}

export function cleanup(environment) {
  let deps = environment.deps; // 拿到当前环境函数的依赖数组
  if (deps.length) {
    deps.forEach((dep) => {
      dep.delete(environment); // 删除依赖
    });
    deps.length = 0;
  }
}
