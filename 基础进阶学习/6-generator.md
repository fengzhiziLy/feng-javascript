#### Generator与Iterator接口的关系

任意一个对象的`Symbol.iterator`方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给该对象的`Symbol.iterator`属性，从而使得该对象具有Iterator接口。

```js
var myIterable = {}
myIterable[Symbol.iterator] = function *() {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable]     // [1, 2, 3]
```

Generator函数执行后，返回一个遍历器对象，该对象本身也具有`Symbol.iterator`属性，执行后返回自身。

```js
function *gen() {
  // some code
}
var g = gen();
g[Symbol.iterator]() === g      // true
```

#### next方法的参数

`yield`表达式**本身没有返回值**，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当做上一个`yield`表达式的返回值。

```js
function *f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1 }
  }
}
var g = f();
g.next()      // { value: 0, done: false}
g.next()      // { value: 1, done: false}
g.next(true)  // { value: 0, done: false}
```

上面代码先定义了一个可以无限运行的Generator函数`f`，如果`next`没有参数，每次运行到`yield`表达式，变量`reset`的值总是`undefined`。当`next`方法带一参数`true`时，变量`reset`就被重置为这个参数(即`true`)，因此`i`就会等于`-1`，下一次循环机就从`-1`开始。

Generator函数从暂停状态到恢复状态，它的上下文(context)是不变的。