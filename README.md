# 实现响应式系统

> 笔记记录重要内容。

**核心要素**

要实现一个响应式系统，最为核心的有两个部分：

1. 监听数据的读写
2. 关联数据和函数

只要把这两个部分完成了，那么整个响应式系统也就基本成型了。

**监听数据读写**

- 数据：在 JS 中，能够拦截读写的方式，要么 Object.defineProperty，要么就是 Proxy，这两个方法针对的目标是对象，因此我们这里考虑对对象类型进行监听
- 读写：虽然说是监听读写，但是细分下来要监听的行为如下：
  - 获取属性：读取
  - 设置属性：写入
  - 新增属性：写入
  - 删除属性：写入
  - 是否存在某个属性：读取
  - 遍历属性：读取

**拦截后对应的处理**

不同的行为，拦截下来后要做的事情是不一样的。整体来讲分为两大类：

- 收集器：针对读取的行为，会触发收集器去收集依赖，所谓收集依赖，其实就是建立数据和函数之间的依赖关系
- 触发器：针对写入行为，触发器会工作，触发器所做的事情就是触发数据所关联的所有函数，让这些函数重新执行

下面是不同行为对应的事情：

- 获取属性：收集器
- 设置属性：触发器
- 新增属性：触发器
- 删除属性：触发器
- 是否存在某个属性：收集器
- 遍历属性：收集器

总结起来也很简单，**只要涉及到属性的访问，那就是收集器，只要涉及到属性的设置（新增、删除都算设置），那就是触发器**。

**数组中查找对象**

因为在进行代理的时候，是进行了递归代理的，也就是说对象里面成员包含对象的话，也会被代理，这就会导致数组中成员有对象的话，是找不到的。原因很简答，比较的是原始对象和代理对象，自然就找不到。

解决方案：先正常找，找不到就在原始对象中重新找一遍

**数组改动长度**

关于数组长度的改变，也会有一些问题，如果是隐式的改变长度，不会触发 length 的拦截。

另外即便是显式的设置 length，这里会涉及到新增和删除，新增情况下的拦截是正常的，但是在删除的情况下，不会触发 DELETE 拦截，因此也需要手动处理。

**自定义是否要收集依赖**

当调用 push、pop、shift 等方法的时候，因为涉及到了 length 属性的变化，会触发依赖收集，这是我们不期望的。

最好的方式，就是由我们来控制是否要依赖收集。

# 关联数据和函数

**依赖收集**

![image-20240529131604509](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-29-051604.png)

**实现Effect**

这里直接给出 Effect 实现：

```js
/**
 * 用于记录当前活动的 effect
 */
export let activeEffect = undefined;
export const targetMap = new WeakMap(); // 用来存储对象和其属性的依赖关系
const effectStack = [];

/**
 * 该函数的作用，是执行传入的函数，并且在执行的过程中，收集依赖
 * @param {*} fn 要执行的函数
 */
export function effect(fn) {
  const environment = () => {
    try {
      activeEffect = environment;
      effectStack.push(environment);
      cleanup(environment);
      return fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  };
  environment.deps = [];
  environment();
}

export function cleanup(environment) {
  let deps = environment.deps; // 拿到当前环境函数的依赖（是个数组）
  if (deps.length) {
    deps.forEach((dep) => {
      dep.delete(environment);
    });
    deps.length = 0;
  }
}
```

**改造track**

之前 track 仅仅只是简单的打印，那么现在就不能是简单打印了，而是进行具体的依赖收集。

注意依赖收集的时候，需要按照上面的设计一层一层进行查找。

**改造trigger**

trigger 要做的事情也很简单，就是从我们所设计的数据结构里面，一层一层去找，找到对应的依赖函数集合，然后全部执行一次。

首先我们需要**建立一个设置行为和读取行为之间的映射关系**：

```js
// 定义修改数据和触发数据的映射关系
const triggerTypeMap = {
  [TriggerOpTypes.SET]: [TrackOpTypes.GET],
  [TriggerOpTypes.ADD]: [
    TrackOpTypes.GET,
    TrackOpTypes.ITERATE,
    TrackOpTypes.HAS,
  ],
  [TriggerOpTypes.DELETE]: [
    TrackOpTypes.GET,
    TrackOpTypes.ITERATE,
    TrackOpTypes.HAS,
  ],
};
```

我们前面在建立映射关系的时候，是根据具体的获取信息的行为来建立的映射关系，那么我们获取信息的行为有：

- GET
- HAS
- ITERATE

这些都是在获取成员信息，而依赖函数就是和这些获取信息的行为进行映射的。

因此在进行设置操作的时候，需要思考一下当前的设置，会涉及到哪些获取成员的行为，然后才能找出该行为所对应的依赖函数。

**懒执行**

有些时候我们想要实现懒执行，也就是不想要传入 effect 的回调函数自动就执行一次，通过配置项来实现

**添加回调**

有些时候需要由用户来指定是否派发更新，支持用户传入一个回调函数，然后将要依赖的函数作为参数传递回给用户给的回调函数，由用户来决定如何处理。

---

-EOF-
