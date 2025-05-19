import trigger from "../../effect/trigger.js";
import { hasChanged, TriggerOpTypes } from "../../utils.js";

export default function (target, key, newValue) {
  // 判断是新增还是修改操作
  const type = target.hasOwnProperty(key)
    ? TriggerOpTypes.SET
    : TriggerOpTypes.ADD;

  // 在设置之前需要缓存一下旧值
  const oldValue = target[key];

  // 先缓存一下旧的数组长度
  const oldLen = Array.isArray(target) ? target.length : undefined;

  // 先进行设置操作
  const result = Reflect.set(target, key, newValue);

  // 判断新值和旧值是否相等, 如果不相同则触发更新
  if (hasChanged(oldValue, newValue)) {
    // 触发更新
    trigger(target, type, key);

    // 需要判断 length 是否有变化, 如果有变化, 需要对 length 进行派发更新
    if (Array.isArray(target) && oldLen !== target.length) {
      // 之所以这里要判断一下, 是因为 length 显示的改变是会触发派发更新的
      if (key !== "length") {
        // 进入这个 if, 说明 length 发生了隐式的变化
        trigger(target, TriggerOpTypes.SET, "length");
      } else {
        // 进入此 else, 说明 length 发生了显示的变化
        // 我们需要处理新的长度小于旧的长度的情况, 应为这里涉及到了删除操作
        for (let i = target.length; i < oldLen; i++) {
          trigger(target, TriggerOpTypes.DELETE, i.toString());
        }
      }
    }
  }

  return result;
}
