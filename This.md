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

> 这里的 Reference 是一个 Specification Type，也就是 “只存在于规范里的抽象类型”。它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的 js 代码中。----尤雨溪

Reference类型就是用来解释诸如delete、typeof以及赋值等操作行为的。

使用伪代码将引用类型的值表示为拥有三个属性的对象---base value(即拥有属性的那个对象)和base中的referenced name以及 strict reference.

base value就是属性所在的对象或者就是EnvironmentRecord，它的值只可能是undefined, an Object, a Boolean, a String, a Number, or an environment record其中的一种。

referenced name就是属性的名称

例子：

```js
var foo = 1
// 对应的reference是：
var fooReference = {
  base: EnvironmentRecord,
  name: 'foo',
  strict: false
}

var foo = {
  bar: function () {
    return this
  }
}
foo.bar()  // foo
// bar对应的reference是：
var BarReference = {
  base: foo,
  propertyName: 'bar',
  strict: false
}
```

规范中提供了获取reference组成的方法，比如GetBase和IsPropertyReference.
  1. GetBase
  > 返回reference的base value
  2. IsPropertyReference
  > 如果base value是一个对象，就返回true

规范中还有一个用于从Reference类型获取对应值的方法：GetValue

```js
// 简单模拟GetValue的使用
var foo = 1;
var fooReference = {
  base: EnvironmentRecord,
  name: 'foo',
  strict: false
}
GetValue(fooReference)  // 1
```

**GetValue返回对象属性真正的值，是具体的值，不再是一个Reference**

规范中的：

```
1.Let ref be the result of evaluating MemberExpression.
6.If Type(ref) is Reference, then
  a.If IsPropertyReference(ref) is true, then
    i.Let thisValue be GetBase(ref).
  b.Else, the base of ref is an Environment Record
    i.Let thisValue be the result of calling the ImplicitThisValue concrete method of GetBase(ref).
7.Else, Type(ref) is not Reference.
  a. Let thisValue be undefined.
  [冴羽](https://juejin.im/post/58eee3eda0bb9f006a7eea12)
```

描述：
1.计算MemberExpression的结果赋值给ref
2.判断ref是不是一个Reference类型

> 2.1 如果ref是Reference，并且IsPropertyReference(ref)是true，那么this的值为GetBase(ref)
> 2.2 如果ref是Reference,并且base value值为Environment Record，那么this的值为ImplicitThisValue(ref)
> 2.3 如果ref不是Reference，那么this的值为undefined

##### 具体分析

MemberExpression的类型：
- PrimaryExpression // 原始表达式
- FunctionExpression // 函数定义表达式
- MemberExpression[Expression] // 属性访问表达式
- MemeberExpression.IdentifierName // 属性访问表达式
- new MemeberExpression Arguments // 对象创建表达式

例子： 

```js
function foo () {
  console.log(this)
}
foo() // MemeberExpression: foo

function foo () {
  return function () {
    console.log(this)
  }
}
foo()() // MemeberExpression: foo()

var foo = {
  bar: function() {
    return this
  }
}
foo.bar() // MemeberExpression: foo.bar
```

====> MemeberExpression其实就是()左边的部分

判断ref是不是一个Reference类型

```js
var value = 1
var foo = {
  value: 2,
  bar: function () {
    return this.value
  }
}
console.log(foo.bar())                // 2
console.log((foo.bar)())              // 2
console.log((foo.bar = foo.bar)())    // 1
console.log((false || foo.bar)())     // 1
console.log((foo.bar, foo.bar)())     // 1
```

###### foo.bar()

规范定义：

> Return a value of type Reference whose base value is baseValue and whose referenced name is propertyNameString, and whose strict mode flag is strict

该表达式返回了一个Reference类型

```js
var Reference = {
  base: foo,
  name: 'bar',
  strict: false
}
```

如前所述，ref是一个Reference，对于IsPropertyReference方法，如果base value是一个对象，就返回true
base value为foo，是一个对象，所以IsPropertyReference(ref)结果为true
确定this的值:

```
this = GetBase(ref)
```

GetBase获得base value的值，就是foo

##### (foo.bar)()

foo.bar被()包住，规范中定义：

> Return the result of evaluating Expression. This may be of type Reference.
> NOTE This algorithm does not apply GetValue to the result of evaluating Expression.

()并没有对MemeberExpression进行计算，也是引用类型，其实与foo.bar()的结果是一样的

##### (foo.bar = foo.bar)()

有赋值操作，规范：

> Let rval be GetValue(rref)

由于使用了GetValue,所以返回的值不是Reference类型，这样this的值为undefined, 在非严格模式下，this为undefined的时候，会被隐式转换为全局对象。

##### (false || foo.bar)() && (foo.bar, foo.bar)()

规范中定义：

> Let lval be GetValue(lref)
> Call GetValue(lref)

因为使用了 GetValue，所以返回的不是 Reference 类型，this 为 undefined.


----------------------
----------------------

引用类型的值只有两种情况：
  1. 当处理一个标识符时
  2. 或一个属性访问器

只需要知道，在该算法的返回值中，总是一个引用类型的值

标识符是变量名、函数名、函数参数名和全局对象中未识别的属性名

```js
var foo = 10
function bar () {}
```

在操作的中间结果中，引用类型对应的值如下：

```js
var fooReference = {
  base: global,
  propertyName: 'foo'
}
var barReference = {
  base: global,
  propertyName: 'bar'
}
```

为了从引用类型中得到一个对象真正的值，伪代码中的GetValue方法可以做如下描述：

```js
function GetValue(value) {
  if (Type(value) !== Reference) {
    return value
  }
  var base = GetBase(value)
  if (base === null) {
    throw new ReferenceError
  }
  return base.[[Get]](GetPropertyName(value))
}
```

内部的\[[Get]]方法返回对象属性真正的值，包括对原型链中继承的属性分析。

```js
GetValue(fooReference)   // 10
GetValue(barReference)   // function object "bar"
```

属性访问器：(.)语法和([])语法

```js
foo.bar()
foo['bar']()
```

在中间计算的返回值中，有引用类型的值

```js
var fooBarReference = {
  base: foo,
  propertyName: 'bar'
}
GetValue(fooBarReference)   // function object "bar"
```

一个函数上下文中确定的this值的通用规则如下：

在一个函数上下文中，this由调用者提供，由调用函数的方式来决定。如果调用括号()的左边是引用类型的值，this将设为引用类型值的base对象(base object)，在其他情况下(与引用类型不同的任何其他属性)，这个值为null，不过实际不存在this的值为null的情况，赋值为undefined。

```js
function foo () {
  return this
}
foo()  // global/window
```

在调用括号的左边是一个引用类型值(因为foo是一个标识符)

```js
var fooReference = {
  base: global,
  propertyName: 'foo'
}
<!-- 相应的，this设置为引用类型的base对象，即全局对象 -->
```

使用属性访问器：

```js
var foo = {
  bar: function () {
    return this
  }
}
foo.bar()    // foo

var fooBarReference = {
  base: foo,
  propertyName: 'bar'
}

// 但是，用另外一种形式激活相同的函数，得到其它的this值
var test = foo.bar
test()      // global
// test 作为标识符，生成了引用类型的其他值
var testReference = {
  base: global,
  propertyName: 'test'
}
```

#### 函数调用和非引用类型

```js
(function() {
  console.log(this)   //[object Window]
})()

var foo = {
  bar: function () {
    console.log(this)
  }
}
foo.bar()       // Reference, => foo
(foo.bar)()     // Reference, => foo
(foo.bar = foo.bar)() // window
(false || foo.bar)()  // window
(foo.bar, foo.bar)()  // window
```

分析：
1. 第一个是明显的引用类型
2. 第二个例子，组运算符并不适用，从引用类型中获得一个对象真正的值的方法GetValue，在组运算的返回中，得到的仍是一个引用类型
3. 三四五的例子中，调用了GetValue方法，不是一个Reference类型了。

#### 作为构造器调用函数的this

```js
function A() {
  console.log(this)   // A {}
  this.x = 10
}
var a = new A()
console.log(a.x)    // 10
```

this绑定到新创建的对象上

