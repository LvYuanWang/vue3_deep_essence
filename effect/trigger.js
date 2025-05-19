/**
 * 触发器: 用于触发依赖
 * @param {*} target 原始对象
 * @param {*} type 触发的操作类型
 * @param {*} key 触发的属性
 */
export default function (target, type, key) {
  // console.log("触发器: 原始对象为", target);
  console.log(`触发器: 代理对象${key}属性的${type}操作`);
}
