// vue1.x 以及 vue2.x 中响应式用到的是 Object.defineProperty
function Student() {
  let stuName = '小白'
  Object.defineProperty(this, 'name', {
    get() {
      return stuName
    },
    set(value) {
      if (isNaN(value)) {
        stuName = value
      }
    },
  })
}
const stu = new Student()
console.log(stu.name)
stu.name = '李四'
console.log(stu.name)
stu.name = 123
console.log(stu.name)
// ----------------------------------------------------------------------
// vue3.x 中响应式用到的是 Proxy
function Student() {
  const obj = {
    name: '小白',
  }
  return new Proxy(obj, {
    // obj: 代理的对象
    // prop: 代理的属性
    // value: 代理的属性的值
    get(obj, prop) {
      return obj[prop] + '是个好学生'
    },
    set(obj, prop, value) {
      if (isNaN(value)) {
        obj[prop] = value
      }
      return true
    },
  })
}
const stu = new Student()
console.log(stu.name)
stu.name = '李四'
console.log(stu.name)
stu.name = 123
console.log(stu.name)
// ----------------------------------------------------------------------
// Object.defineProperty() 的读取和写入拦截器
const obj = {}
let _data = '这是一些数据'
Object.defineProperty(obj, 'data', {
  get() {
    console.log('读取data的操作被拦截了')
    return _data
  },
  set(newValue) {
    console.log('写入data的操作被拦截了')
    _data = newValue
  },
})
console.log(obj.data)
obj.data = '这是新的数据'
console.log(obj.data)
// ----------------------------------------------------------------------
// Proxy 的读取和写入拦截器
const obj = {
  data: '这是一些数据',
  name: '小白',
}
const objProxy = new Proxy(obj, {
  get(obj, prop) {
    console.log(`读取${prop}的操作被拦截了`)
    return obj[prop]
  },
  set(obj, prop, newValue) {
    console.log(`写入${prop}的操作被拦截了`)
    if (!isNaN(newValue)) {
      console.log('写入的数据不正确')
    } else {
      obj[prop] = newValue
    }
    return true
  },
})
console.log(objProxy.data)
objProxy.data = '这是新的数据'
console.log(objProxy.data)
objProxy.name = 123
console.log(objProxy.name)
// ----------------------------------------------------------------------
// 深度拦截
const data = {
  level1: {
    level2: {
      level3: {
        value: 100,
      },
    },
  },
}
// ----------------------------------------------------------------------
// Object.defineProperty() 的深度拦截
// 深度拦截函数
function deepDefineProperty(obj) {
  for (let key of Object.keys(obj)) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
      deepDefineProperty(obj[key])
    }
    // 缓存一下属性值
    let _value = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        console.log(`读取${key}的操作被拦截了`)
        return _value
      },
      set(newValue) {
        console.log(`写入${key}的操作被拦截了`)
        _value = newValue
      },
      enumerable: true,
      configurable: true,
    })
  }
}
deepDefineProperty(data)
console.log(data.level1.level2.level3.value)
console.log('------------------------------')
data.level1.level2.level3.value = 200
console.log(data.level1.level2.level3.value)
console.log('------------------------------')
data.level1.name = '小白' // 并没有拦截
console.log(data.level1.name)
// ----------------------------------------------------------------------
// Proxy 的深度拦截
function deepProxy(obj) {
  // 如果传入的不是对象或为null，直接返回
  if (!obj || typeof obj !== 'object') {
    return obj
  }
  return new Proxy(obj, {
    get(target, prop) {
      console.log(`读取了${prop}属性`)
      // 获取属性值
      const value = target[prop]
      // 如果属性值是对象，则递归代理
      if (value && typeof value === 'object') {
        return deepProxy(value)
      }
      return value
    },
    set(target, prop, value) {
      console.log(`修改了${prop}属性`)
      // 如果新值是对象，需要进行代理
      if (value && typeof value === 'object') {
        target[prop] = deepProxy(value)
      } else {
        target[prop] = value
      }
      return true
    },
    deleteProperty(target, prop) {
      console.log(`删除了${prop}属性`)
      delete target[prop]
      return true
    },
    getPrototypeOf(target) {
      console.log('拦截获取原型')
      return Object.getPrototypeOf(target)
    },
    setPrototypeOf(target, newPrototype) {
      console.log('拦截设置原型')
      return Object.setPrototypeOf(target, newPrototype)
    },
  })
}
const proxyData = deepProxy(data)
// 测试读取
console.log(proxyData.level1.level2.level3.value)
console.log('------------------------------')
// 测试修改基本类型值
proxyData.level1.level2.level3.value = 200
console.log(proxyData.level1.level2.level3.value)
console.log('------------------------------')
// 测试添加新的嵌套对象
proxyData.level1.level2.level3.level4 = {
  value: 300,
}
console.log(proxyData.level1.level2.level3.level4.value)
// 删除属性
delete proxyData.level1.level2
console.log(proxyData)
// 获取原型
console.log(Object.getPrototypeOf(proxyData))
// 设置原型
Object.setPrototypeOf(proxyData, {
  name: '小白',
})
console.log(Object.getPrototypeOf(proxyData))
