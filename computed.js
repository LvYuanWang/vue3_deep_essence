import { effect } from "./effect/effect.js";
import track from "./effect/track.js";
import trigger from "./effect/trigger.js";
import { TrackOpTypes, TriggerOpTypes } from "./utils.js";

/**
 * 进行参数归一化
 * @param {function | object} getterOrOptions 进行归一化的参数
 * @returns {object} 返回一个包含 getter 和 setter 的对象
 */
function normalizeParam(getterOrOptions) {
  let getter, setter;
  if (typeof getterOrOptions === "function") {
    // 说明传递的是一个 getter 函数
    getter = getterOrOptions;
    setter = (newValue) => {
      console.warn("it has no setter function", newValue);
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return { getter, setter };
}

/**
 *
 * @param {*} getterOrOptions 可能是一个 getter 函数, 也可能是一个包含 getter 和 setter 的对象
 */
export function computed(getterOrOptions) {
  // 1. 参数归一化
  const { getter, setter } = normalizeParam(getterOrOptions);

  let value; // 用来存储计算属性的值
  let dirty = true; // 表示计算属性是否脏, 如果为 true, 说明需要重新计算

  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true; // 当依赖发生变化时, 将 dirty 设置为 true
      trigger(obj, TriggerOpTypes.SET, "value");
    },
  });

  // 2. 返回一个对象
  const obj = {
    get value() {
      track(obj, TrackOpTypes.GET, "value");
      if (dirty) {
        value = effectFn();
        dirty = false; // 计算完毕后, 将 dirty 设置为 false
      }
      return value;
    },
    set value(newValue) {
      setter(newValue);
    },
  };

  return obj;
}
