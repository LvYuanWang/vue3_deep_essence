// 迷你版的 ref 以及 reactive
function isObject(val) {
  return typeof val === "object" && val !== null;
}

class RefImpl {
  constructor(value) {
    // 简单判断是否是对象
    this._value = isObject(value) ? reactive(value) : value;
  }

  get value() {
    console.log("ref: 拦截到了 value 属性的 get 操作");
    return this._value;
  }

  set value(newVal) {
    console.log("ref: 拦截到了 value 属性的 set 操作");
    this._value = newVal;
  }
}

// Proxy深度代理
function deepProxy(obj) {
  return new Proxy(obj, {
    get(target, key) {
      console.log(`reactive: 拦截到了 ${key} 属性的 get 操作`);
      return isObject(target[key]) ? deepProxy(target[key]) : target[key];
    },
    set(target, key, newVal) {
      console.log(`reactive: 拦截到了 ${key} 属性的 set 操作`);
      target[key] = newVal;
      return true;
    },
    deleteProperty(target, key) {
      console.log(`reactive: 拦截到了 ${key} 属性的 delete 操作`);
      delete target[key];
      return true;
    },
  });
}

function reactive(val) {
  return deepProxy(val);
}

function ref(val) {
  return new RefImpl(val);
}

// demo1
let state = ref(1);
state; // 不会拦截
console.log(state); // 不会拦截
console.log(state.value); // 会拦截, 因为访问了 value 属性
console.log(state.a); // 不会拦截
state.a = 3; // 不会拦截
state.value = 3; // 会拦截, 因为设置了 value 属性
delete state.value; // 不会拦截
state = 3; // 不会拦截

// demo2
let data = ref({ a: 1 });
data; // 不会拦截
console.log(data); // 不会拦截
console.log(data.value); // 会拦截, 因为访问了 value 属性
console.log(data.a); // 不会拦截
console.log(data.value.a); // 会拦截, 拦截到了 value 和 a 属性的 get 操作
data.a = 3; // 不会拦截
data.value.a = 3; // 会拦截, 拦截到了 value 属性的 get 操作 以及 a 属性的 set 操作
delete data.value.a; // 会拦截, 拦截到了 value 属性的 get 操作 以及 a 属性的 delete 操作
data.value = 3; // 会拦截, value 的 set 操作
delete data.value; // 不会拦截
data = 3; // 不会拦截

// demo3
let obj = reactive({});
obj; // 不会拦截
console.log(obj); // 不会拦截
console.log(obj.a); // 会拦截, 拦截到了 a 属性的 get 操作
obj.a = 3; // 会拦截, 拦截到了 a 属性的 set 操作
obj.a = {
  b: {
    c: 3,
  },
}; // 会拦截, 拦截到了 a 属性的 set 操作
console.log(obj.a.b.c); // 会拦截, 拦截到了 a 和 b 和 c 属性的 get 操作
delete obj.a.b; // 会拦截, 拦截到了 a 属性的 get 操作 以及 b 属性的 delete 操作

// demo4
const information = ref({ a: 1 });
const k = information.value; // 会拦截, 拦截到了 value 属性的 get 操作
console.log(k); // 不会拦截, k 相当于是一个 proxy 对象, 没有针对成员进行操作
k.a = 3; // 会拦截，因为 k 是一个 proxy 对象，对 k 的成员进行操作会触发代理的 set 操作
const n = k.a; // 会拦截, 拦截到了 a 属性的 get 操作
console.log(n); // 不会拦截

// demo5
const arr = reactive([1, 2, 3]);
arr; // 不会拦截
arr.length; // 会拦截, 拦截到了 length 属性的 get 操作
arr[0]; // 会拦截, 拦截到了 0 属性的 get 操作
arr[0] = 3; // 会拦截, 拦截到了 0 属性的 set 操作
arr.push(4); // 会拦截, 拦截到了 push, length 属性的 get 操作, 3 以及 length 属性的 set 操作
