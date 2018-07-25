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

Generator函数从暂停状态到恢复状态，它的上下文(context)是不变的。通过`next`方法的参数，就有办法在Generator函数开始运行之后，继续向函数体内部注入值。也就是说，可以在Generator函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

例子：

```js
function *foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}
var a = foo(5);
a.next()        // {value: 6, done: false}
a.next()        // {value: NaN, done: false}
a.next()        // {value: NaN, done: false}
var b = foo(5);
b.next()        // {value: 6, done: false}
b.next(12)      // {value: 8, done: false}
b.next(13)      // {value: 42, done: false}
```

> 代码解读：
> 首先要明确：`yield`表达式**本身没有返回值**，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当做上一个`yield`表达式的返回值。
> 第一次调用`b`的`next`方法时，返回的是`x+1`的值为6
> 第二次调用`next`方法，将上一次`yield`语句的值设为12，因此`y`等于24，返回`y / 3`的值为8
> 第三次调用`next`方法，将上一次`yield`语句的值设为13，因此`z`等于13
> 这时，`x`等于5，`y`等于24，`z`等于13，所以`return`语句的值为42

**注意**

由于`next`方法的参数表示上一个`yield`表达式的返回值，所以在第一次使用`next`方法时，传递参数是无效的。V8引擎直接忽略第一次使用`next`方法时的参数，只有从第二次使用`next`方法开始，参数才是有效的。

```js
function *dataConsumer() {
  console.log('Started');
  console.log(`1.${yield}`);
  console.log(`2.${yield}`);
  return 'result';
}
let genObj = dataConsumer();
genObj.next();
// Started
genObj.next('feng');
// 1.feng
genObj.next('bai');
// 2.bai
```

如果想要第一次调用`next`方法时，就能够输入值，可以在Generator函数外面再包一层。

```js
function wrapper(generatorFunction) {
  return function(...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  }
}
const wrapped = wrapper(function *() {
  console.log(`First input: ${yield}`);
  return 'DONE';
});
wrapped().next('hello!')
// First input: hello!
```


#### for...of循环

`for..of`循环可以自动遍历Generator函数时生成的`Iterator`对象，且此时不再需要调用`next`方法

利用`for...of`循环，可以写出遍历任意对象(object)的方法。原生JavaScript对象没有遍历接口，无法使用`for...of`循环，通过Generator函数为它加上这个接口就可以了。

```js
function *objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);
  for(let propKey of propKeys){
    yield [propKey, obj[propKey]];
  }
}
let feng = { first: 'feng', last: 'zhizi' };
for(let [key, value] of objectEntries(feng)) {
  console.log(`${key}: ${value}`);
}
// first: feng
// last: zhizi
```

加上遍历器接口的另一种写法就是，将Generator函数加到对象的`Symbol.iterator`属性上面。

```js
function *objectEntries() {
  let propKeys = Object.keys(this);
  for(let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}
let feng = { first: 'bai', last: 'feng' };
feng[Symbol.iterator] = objectEntries;
for (let [key, value] of feng) {
  console.log(`${key}: ${value}`);
}
// first: bai
// last: feng
```

> 除了`for...of`循环以外，扩展运算符、解构赋值和`Array.form`方法内部调用的，都是遍历器接口。
> 这也就是说，都可以将Generator函数返回的Iterator对象，作为参数

```js
function *numbers () {
  yield 1;
  yield 2;
  return 3;
  yield 4;
}
// 扩展运算符
[...numbers()]    // [ 1, 2 ]
// Array.from
Array.from(numbers())   // [ 1, 2 ]
// 解构赋值
let [x, y] = numbers();
x // 1
y // 2
// for...of
for(let n of numbers()) {
  console.log(n)
}
```

#### Generator.prototype.throw()

Generator函数返回的遍历器对象，都有一个`throw`方法，可以在函数体外抛出错误，然后在Generator函数体内捕获。

```js
var g = function *() {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};
var i = g();
i.next();
try {
  i.throw('a');
  i.throw('b');
} catch(e) {
  console.log("外部捕获", e)
}
// 内部捕获 a
// 外部捕获 b
```

上面代码中，遍历器对象`i`连续抛出两个错误。第一个错误被Generator函数体内的`catch`语句捕获。
`i`第二次抛出错误，由于Generator函数内部的`catch`语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了Generator函数体，被函数体外的`catch`语句捕获。

`throw`方法可以接收一个参数，该参数会被`catch`语句接收，建议抛出`Error`对象的实例

```js
var g = function *() {
  try {
    yield;
  } catch (e) {
    console.log(e);
  }
};
var i = g();
i.next();
i.throw(new Error('出错了！'));
// Error: 出错了 ...
```

**注意哦**
不要混淆遍历器对象的`throw`方法和全局的`throw`命令。
上面的错误，是用遍历器对象的`throw`方法抛出的，而不是用`thorw`命令抛出的
后者只能被函数体外的`catch`语句捕获。

```js
var g = function *() {
  while (true) {
    try {
      yield;
    } catch (e) {
      if (e != 'a') throw e;
      console.log('内部捕获', e);
    }
  }
}
var i = g();
i.next();
try {
  throw new Error('a');
  throw new Error('b');
} catch (e) {
  console.log('外部捕获', e);
}
//  外部捕获 Error: a  (...)
```

上面代码之所以只捕获了`a`，是因为函数体外的`catch`语句块，捕获了抛出的`a`错误以后，就不会再继续`try`代码块里面剩余的语句了。

`throw`方法抛出的错误要被内部捕获，前提是必须至少执行过一个`next`方法

```js
function *gen() {
  try {
    yield 1;
  } catch (e) {
    console.log('内部捕获');
  }
}
var g = gen();
g.throw(1);
// Uncaught 1
```

上面的代码中，`g.throw(1)`执行时，`next`方法一次都没有执行过。这时，抛出的错误不会被内部捕获，而是直接在外部抛出，导致程序出错。
这种行为的理解：因为第一次执行`next`方法，等同于启动执行Generator函数的内部代码，否则Generator函数还没有开始执行，这时的`throw`方法抛出只可能在函数外部。

`throw`方法被捕获之后，会附带执行下一条`yield`表达式，也就是说，会附带执行一次`next`方法。

```js
var gen = function *gen() {
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}
var g = gen();
g.next()    // a
g.throw()   // b
g.next()    // c
```

上面代码中，`g.throw`方法被捕获以后，自动执行了一次`next`方法，所以会打印`b`。
另外，也可以看到，只要Generator函数内部部署了`try...catch`代码块，那么遍历器的`throw`方法抛出的错误，不影响下一次遍历。

Generator函数体外抛出的错误，可以在函数体内捕获，反过来，Generator函数体内的错误，也可以被函数体外的`catch`捕获。

```js
function *foo() {
  var x = yield 3;
  var y = x.toUpperCase();
  yield y;
}
var it = foo();
it.next();
try {
  it.next(42);
} catch (err) {
  console.log(err);
}
// TypeError: x.toUpperCase is not a function
```
上面代码中，第二个`next`方法向函数体内传入一个参数42，数值是没有`toUpperCase`方法的，所以会抛出一个`TypeError`错误，被函数体外的catch捕获