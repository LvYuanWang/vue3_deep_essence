// 测试文件

import { reactive } from "./reactive.js";

const obj = {
  a: 1,
  b: 2,
  c: {
    name: "张三",
    age: 18,
  },
};

const arr = [1, obj, 3];

const proxyArr = reactive(arr);

// 测试读取行为
// proxyArr[0];
// proxyArr.length;
// for (let key in proxyArr) {
//   proxyArr[key];
// }

// for (let i = 0; i < proxyArr.length; i++) {
//   proxyArr[i];
// }

// proxyArr.includes(1);
// proxyArr.includes(3);
// console.log(proxyArr.includes(3));

// proxyArr.indexOf(1);
// proxyArr.indexOf(3);
// console.log(proxyArr.indexOf(3));

// console.log(proxyArr.lastIndexOf(1));

// console.log(proxyArr.includes(obj));
// console.log(proxyArr.indexOf(obj));
// console.log(proxyArr.lastIndexOf(obj));

// 测试写入行为
// proxyArr[0] = 100;
// proxyArr[5] = 100;

// proxyArr.length = 10;

// 将数组的 length 设置为 1, 会删除后面的元素
// proxyArr.length = 1;

proxyArr.push(4);
