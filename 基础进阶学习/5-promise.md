promise是抽象异步处理对象以及对其进行各种操作的**组件**。

#### promise简介

promise类似于XMLHttpRequest，从构造函数`Promise`来创建一个新建新`promise`对象作为接口。

```js
var promise = new Promise(function(resolve, reject) {
  // 异步处理
  // 处理结束后，调用resolve或reject
})
```

对通过new生成的promise对象为了设置其值在resolve(成功)/reject(失败)时调用的回调函数，可以使用`promise.then()`方法。

```js
promise.then(onFulfilled, onRejected)
```

resolve(成功时) ---> `onFulfilled`会被调用
reject(失败时) ---> `onRejected`会被调用

####promise workflow

```js
function asyncFunction() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('Async Hello feng');
    }, 16);
  });
}
asyncFunction().then(function(value) {
  console.log(value);
}).catch(function(error) {
  console.log(error);
});
```

#### Promise的状态

用`new Promise`实例化的promise对象有以下三个状态：

- 'has-resolution' - Fulfilled
  resolve(成功)时，此时会调用`onFulfilled`
- 'has-rejection' - Rejected
  reject(失败)时，此时会调用`onRejected`
- 'unresolved' - Pending
  既不是resolve也不是reject的状态，也就是刚被创建后的初始化状态

![promise](http://liubin.org/promises-book/Ch1_WhatsPromises/img/promise-states.png)

promise对象的状态，从Pending转换为Fulfilled或Rejected之后，这个promise对象的状态就不会再发生改变。