import track from "../../effect/track.js";
import { TrackOpTypes } from "../../utils.js";

export default function (target, key) {
  // 检查是否有某个属性
  const result = Reflect.has(target, key);

  // 触发收集器操作
  track(target, TrackOpTypes.HAS, key);

  return result;
}
