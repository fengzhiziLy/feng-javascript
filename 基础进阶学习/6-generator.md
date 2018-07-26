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

一旦Generator执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。
如果此后还调用'next'方法，将返回一个`value`属性等于`undefined`、`done`属性等于`true`的对象，
即JavaScript引擎认为这个Generator已经结束了。

```js
function *g() {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke');
  yield 2;
  yield 3;
}
function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('第一次运行next方法', v);
  } catch (err) {
    console.log('捕获错误', v);
  }
  try {
    v = generator.next();
    console.log('第二次运行next方法', v);
  } catch (err) {
    console.log('捕获错误', v);
  }
  try {
    v = generator.next();
    console.log('第三次运行next方法', v);
  } catch (err) {
    console.log('捕获错误', v);
  }
  console.log('caller done');
}
log(g());
// starting generator
// 第一次运行next方法 { value: 1, done: false }
// throwing an exception
// 捕获错误 { value: 1, done: false }
// 第三次运行next方法 { value: undefined, done: true }
// caller done
```

#### Generator.prototype.return()

Generator函数返回的遍历器对象，有一个`return`方法，可以返回给定的值，并且终结遍历Generator函数

```js
function *gen() {
  yield 1;
  yield 2;
  yield 3;
}
var g = gen();
g.next();           // {value: 1, done: false}
g.return('foo');    // {value: "foo", done: true}
g.next();           // {value: undefined, done: true}
```

如果`return`方法调用时，不提供参数，则返回值的`value`属性为`undefined`

如果Generator函数内部有`try...finally`方法，那么`return`方法会推迟到`finally`执行完之后再执行。

```js
function *numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
```

上面代码中，调用`return`方法后，就开始执行`finally`代码块，然后等到`finally`代码块执行完，再执行`return`方法。

#### next() throw() return()的共同点

`next()`、`throw()`、`return()`本质上是同一件事，作用都是让Generator函数恢复执行，并且使用不同的语句替换`yield`表达式。

`next()`是将`yield`表达式替换成一个值。
`throw()`是将`yield`表达式替换成一个`throw`语句。
`return()`是将`yield`表达式替换成一个`return`语句。

```js
const g = function *(x, y) {
  let result = yield x + y;
  return result;
}
const gen = g(1, 2);
gen.next();     // { value: 3, done: false }
gen.next(1);    // { value: 1, done: true }
// 相当于将 let result = yield x + y
// 替换成 let result = 1;
gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));
gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;
```


#### yield* 表达式

如果在Generator函数内部，调用另一个Generator函数，默认情况下是没有效果的

```js
function *foo() {
  yield 'a';
  yield 'b';
}
function *bar() {
  yield 'x';
  foo();
  yield 'y';
}
for (let v of bar()) {
  console.log(v)
}
// x
// y
```

需要使用`yield*`表达式，用来在一个Generator函数里面执行另一个Generator函数

```js
function *foo() {
  yield 'a';
  yield 'b';
}
function *bar() {
  yield 'x';
  yield *foo();
  yield 'y';
}
// 等同于
// function *bar() {
//   yield 'x';
//   yield 'a';
//   yield 'b';
//   yield 'y';
// }
// 等同于
// function* bar() {
//   yield 'x';
//   for (let v of foo()) {
//     yield v;
//   }
//   yield 'y';
// }
for (let v of bar()) {
  console.log(v)
}
// x
// a
// b
// y
```

```js
function *inner() {
  yield 'hello!';
}
function *outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}
var gen = outer1()
gen.next().value      // open
gen.next().value      // inner {<suspended>}
gen.next().value      // close

function *outer2() {
  yield 'open';
  yield *inner();
  yield 'close';
}
var gen = outer2()
gen.next().value      //  open
gen.next().value      // hello!
gen.next().value      // close
```

在这个例子中，`outer2`使用了`yield*`，`outer1`没使用。
结果就是，`outer1`返回了一个遍历器对象，`outer2`返回了该遍历器对象的内部值

```js
let delegatedIterator = (function *() {
  yield 'Hello';
  yield 'Bey!';
}())
let delegatingIterator = (function *() {
  yield 'Greeting';
  yield *delegatedIterator;
  yield 'Ok, bye.';
}())
for (let value of delegatingIterator) {
  console.log(value)
}
// Greeting
// Hello
// Bey!
// Ok, bye.
```

`yield*`后面的Generator函数(**没有return语句时**)，等同于在Generator函数内部，部署了一个`for...of`循环

```js
function *concat(iter1, iter2) {
  yield *iter1;
  yield *iter2;
}
// 等同于
function *concat(iter1, iter2) {
  for (var value of iter1) {
    yield value;
  }
  for (var value of iter2) {
    yield value;
  }
}
```

如果`yeild*`后面跟一个数组，由于数组原生支持遍历器，因此会遍历数组成员

```js
function *gen() {
  yield *["a", "b", "c"];
}
gen().next()
// { value: 'a', done: false }
```

实际上，任何数据结构只要有Iterator接口，就可以被`yield*`遍历。

