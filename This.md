**在不同的执行上下文中this的确定是不同的**

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
foo()
console.log(foo === foo.prototype.constructor)

foo.prototype.constructor()
```