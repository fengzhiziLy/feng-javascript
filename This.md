**在不同的执行上下文中this的确定是不同的**

#### why this

```js
function identify() {
  return this.name.toUpperCase()
}
function speak () {
  var greeting = "Hello,I'm " + identify.call(this)
  console.log(greeting)
}
var me = {
  name: 'feng'
}
var you = {
  name: 'zhao'
}
identify.call(me)   // FENG
identify.call(you)  // ZHAO 
speak.call(me)      // Hello,I'm FENG
speak.call(you)     // Hello,I'm ZHAO
```

如果不使用this，那就需要给identify()和speak()显式传入一个上下文对象

```js
function identify(context) {
  return context.name.toUpperCase()
}
function speak (context) {
  var greeting = "Hello,I'm " + identify(context)
  console.log(greeting)
}
```

误解：

1. 指向自身

> 下面的例子展示了this不是像所想的那样指向函数本身

```js
function foo (num) {
  console.log("foo: " + num)
  // 记录foo被调用的次数
  this.count++;
}
foo.count = 0
var i
for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i)
  }
}
// foo被调用的次数？
console.log(foo.count)  //  0
```

> console.log产生了4条输出，证明了foo()确实被调用了4次.
> 在执行foo.count = 0时，向函数对象foo添加了一个属性count，但是函数内部的this.count中的this并不是指向那个函数本身。
> 这段代码在无意中创建了一个全局变量count，值为NaN

> 使用词法作用域解决上面的问题

```js
function foo (num) {
  console.log("foo: " + num)
  // 记录foo被调用的次数
  data.count++;
}
var data = {
  count: 0
}
var i
for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i)
  }
}
console.log(data.count)  // 4
```

2. 误解2：this指向函数的作用域

**this在任何情况下都不指向函数的词法作用域**

**this实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用**

------

#### 理解调用位置

```js
function baz () {
  // 当前的调用栈是baz
  // 因此，当前的调用位置是全局作用域
  console.log("baz")
  bar()   // <---- bar的调用位置
}
function bar () {
  // 当前的调用栈是： baz --> bar
  // 因此，当前的调用位置在baz中
  console.log("bar")
  foo()  // <--- foo的调用位置
}
function foo () {
  // 当前的调用栈是： baz ---> bar ---> foo
  // 因此，当前的调用位置在bar中
  console.log("foo")
}
baz()  // <--- baz的调用位置
```

-----------------------

#### this是执行上下文中的一个属性

```
activeExecutionContext = {
  VO: {...},
  this: thisValue
}
```

this与上下文中可执行代码的类型有直接关系，this值在进入上下文时确定，并且在上下文执行期间永久不变。

#### 全局代码中的this

在全局代码中，this始终指向全局对象本身，这样就有可能间接的引用到它了。

```js
// 显示定义全局对象的属性
this.a = 10;  // global.a = 10
console.log(a);
// 通过赋值给一个无标识符隐式
b = 20;
console.log(this.b); // 20
// 也是通过变量声明隐式声明的
// 因为全局上下文的变量对象是全局对象自身
var c = 30;
console.log(this.c); // 30
```

#### 函数代码中的this

这种类型的代码中，this值的首要特点(也许是最重要的)是它不是静态的绑定到一个函数上。
this是在进入上下文时确定的，在一个函数中，这个值在每一个完全不同。
在代码运行时的this值是不变的，也就是说，因为它不是一个变量，就不可能为其分配一个新值。

```js
var foo = { x: 10 }
var bar = {
  x: 20,
  test: function () {
    console.log(this === bar) // true
    console.log(this.x) // 20
    this = foo // 错误，任何时候都不能改变this的值
    console.log(this.x) // 如果上面错误注释的话，在执行bar.test()的时候是20
  }
}
// 在进入上下文的时候，this被当做bar的对象
bar.test()
// 这里，this依然不会是foo
foo.test = bar.test
foo.test() // 在上面this = foo注释的情况下 false 10 10
```

那么，影响了函数代码中this值的变化有几个因素：
首先，在通常的函数调用中，this是由激活上下文代码的调用者来提供的，即调用函数的父上下文(parent context)。this取决于调用函数的方式。
正式调用函数的方式影响了调用的上下文中的this值，即使是正常的全局函数也会被调用方式的不同形式激活，这些不同的调用方式导致了不同的this值。

```js
function foo () {
  console.log(this)
}
foo()   // global
console.log(foo === foo.prototype.constructor)  // true

foo.prototype.constructor() // {constructor: ƒ}--->foo.prototype
```

有可能作为一些对象定义的方法来调用函数，但是this将不会设置为这个函数、

```js
var foo = {
  bar: function () {
    console.log(this)
    console.log(this === foo)
  }
}
foo.bar()  // {bar: ƒ} true
var exampleFunc = foo.bar
console.log(exampleFunc === foo.bar)    // true
exampleFunc()   // window false
```

那么，调用函数的方式如何影响this？需要分析内部类型之一------引用类型(Reference Type)


#### 引用类型(Reference Type)