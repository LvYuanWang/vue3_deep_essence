function track(target, key) {}

function trigger(target, key) {}

const data = {
  a: 1,
  b: 2,
  c: 3,
};
const state = new Proxy(data, {
  get(target, key) {
    track(target, key);
    return target[key];
  },
  set(target, key, newValue) {
    target[key] = newValue;
    trigger(target, key);
    return true;
  },
});
