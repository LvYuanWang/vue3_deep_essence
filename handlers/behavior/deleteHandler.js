import trigger from "../../effect/trigger.js";
import { TriggerOpTypes } from "../../utils.js";

// 监听删除行为
export default function (target, key) {
  // 判断是否存在该属性
  const hasProperty = target.hasOwnProperty(key);

  // 进行删除行为
  const result = Reflect.deleteProperty(target, key);

  // 如果存在该属性, 则触发删除操作
  if (hasProperty && result) {
    // 调用触发器
    trigger(target, TriggerOpTypes.DELETE, key);
  }

  return result;
}
