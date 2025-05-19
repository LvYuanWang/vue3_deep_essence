import handlers from "./handlers/index.js";
import { isObject } from "./utils.js";

// 该 WeakMap 用于存储已经代理过的对象, 避免重复代理
// 该 WeakMap 的 key 是对象, value 是该对象的代理对象
const proxyMap = new WeakMap();

// 这是入口文件, 会提供一个 reactive API, 该方法接收一个对象, 返回一个 Proxy 对象
/**
 * 将对象转换为 Proxy 对象
 * @param {object} target 原始对象
 * @returns {Proxy} Proxy 对象
 */
export function reactive(target) {
  // 如果原始值不是一个对象, 则直接返回
  if (!isObject(target)) {
    return target;
  }

  const proxy = new Proxy(target, handlers);

  // 如果传入的对象已经代理过了, 则直接返回该值的代理对象
  if (proxyMap.has(target)) {
    return proxyMap.get(target);
  }

  proxyMap.set(target, proxy);

  return proxy;
}
