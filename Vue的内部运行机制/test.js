
function observer(value) {
  if (!value || (typeof value !== 'object')) {
    return;
  }
  Object.keys(value).forEach((key) => {
    defineReactive(value, key, value[key])
  })
}
class Dep {
  constructor() {
    // 用来存放Watcher对象的数组
    this.subs = []
  }
  // 在subs中添加一个Watcher对象
  addSub(sub) {
    this.subs.push(sub)
  }
  // 通知所有Watcher对象更新视图
  notify () {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
class Watcher {
  constructor () {
    // 在new一个Watcher对象时将该对象赋值给Dep.target,在get中用到
    Dep.target = this;
  }
  // 更新视图的方法
  update () {
    console.log('视图更新...')
  }
}
Dep.target = null;
function defineReactive(obj, key, val) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      //将Dep.target（即当前的Watcher对象存入dep的subs中）
      dep.addSub(Dep.target);
      return val;
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val) return;
      //
      dep.notify()
    }
  })
}
class Vue {
  constructor(options) {
    this._data = options.data;
    observer(this._data);
    //
    new Watcher();
    console.log('render~', this._data.test)
  }
}
let o = new Vue({
  data: {
    test: 'I am feng'
  }
})
o._data.test = "fengzhizi";