// 提供工具方法的文件

/**
 * 判断目标值是否是一个对象
 * @param {*} target 判断的目标值
 * @returns Boolean
 */
export function isObject(target) {
  return typeof target === "object" && target !== null;
}

/**
 * 判断旧值和新值是否相等
 * @param {*} oldValue
 * @param {*} newValue
 * @returns
 */
export function hasChanged(oldValue, newValue) {
  return !Object.is(oldValue, newValue);
}

/**
 * 收集依赖操作类型
 */
export const TrackOpTypes = {
  GET: "get",
  HAS: "has",
  ITERATE: "iterate",
};

/**
 * 触发依赖操作类型
 */
export const TriggerOpTypes = {
  SET: "set",
  ADD: "add",
  DELETE: "delete",
};

/**
 * 这是一个特殊的标识
 */
export const RAW = Symbol("raw");

export const ITERATE_KEY = Symbol("iterate");
