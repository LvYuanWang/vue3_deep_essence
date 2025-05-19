import { TrackOpTypes } from "../../utils.js";
import track from "../../effect/track.js";

export default function (target) {
  // 返回遍历的结果值
  const result = Reflect.ownKeys(target);

  // 触发收集器操作
  track(target, TrackOpTypes.ITERATE);

  return result;
}
