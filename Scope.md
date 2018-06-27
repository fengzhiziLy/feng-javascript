#### 作用域链(Scope Chain)

作用域链与一个执行上下文相关，变量对象的链用于在标识符解析中查找变量

函数上下文的作用域链在函数调用时创建的，包含活动对象和这个函数的内部的[[scope]]属性

```js
activeExecutionContext = {
  VO: {...},    // or AO
  this: thisValue,
  Scope: [      // Scope chain
    // 所有变量对象的列表
    // for identifiers lookup
  ] 
}

Scope = AO + [[Scope]]
```

这种联合和标识符解析过程，与函数的生命周期有关。

#### 函数的生命周期

函数的生命周期分为创建和激活阶段(调用时)

##### 函数创建

在进入上下文时函数声明放到变量/活动对象中

```js
var x = 10
function foo () {
  var y = 20
  console.log(x + y)
}
foo()
```

在调用函数时，得到正确的结果。

foo的上下文活动对象中：

```js
fooContext.AO = {
  y: undefined      // undefined - 进入上下文的时候是20 - at activation
}
```

foo是如何访问到变量x？

[[scope]]是所有父变量对象的层级链，处于当前函数上下文之上，在函数创建时存于其中

[[scope]]在函数创建时被存储，静态的(不变的)，直至函数销毁
即：函数可以永不调用，但[[scope]]属性已经写入，并存储在函数对象中
[[scope]]是函数的一个属性而不是上下文

```js
foo.[[Scope]] = [
  globalContext.VO // === Global
]
```

##### 函数激活

进入上下文创建AO/VO后，上下文的Scope属性(变量查找的一个作用域链)定义如下：

> Scope = AO|VO + [[Scope]]

即，活动对象是作用域数组的第一个对象，即添加到作用域的前端

> Scope = [AO].concat([[Scope]])

这个特点对于标识符解析的处理来说很重要的

标识符解析是一个处理过程，用来确定一个变量（或函数声明）属于哪个变量对象

这个算法的返回值中，总有一个引用类型，它的base组件是相应的变量对象(若未找到则为undefined)，属性名组件是向上查找的标识符的名称。

标识符解析过程包含与变量名对应属性的查找，即作用域中变量对象的连续查找，从最深的上下文开始，知道作用域链最上层。

这样一来，在向上查找中，一个上下文中的局部变量较之于父作用域的变量拥有较高的优先级。

```js
var x = 10
function foo () {
  var y = 20
  function bar () {
    var z = 30
    console.log(x + y + z)
  }
  bar()
}
foo()
```

以例子为看：

全局上下文的变量对象是：

```js
globalContext.VO === global = {
  x: 10,
  foo: <reference to function>
}
```

在foo创建时，foo的[[scope]]属性是：

```js
foo.[[Scope]] = [
  globalContext.VO
]
```

在foo调用时(进入上下文)，foo的上下文的活动对象是：

```js
fooContext.AO = {
  y: 20,
  bar: <reference to function>
}
```

foo上下文的作用域链为：

```js
fooContext.Scope = fooContext.AO + foo.[[Scope]]

fooContext.Scope = [
  fooContext.AO,
  globalContext.VO
]
```

内部函数bar创建时，其[[scope]]为：

```js
bar.[[Scope]] = [
  fooContext.AO,
  globalContext.VO
]
```

在bar激活时，bar上下文的活动对象为：

```js
barContext.AO = {
  z: 30
}
```

bar的上下文的作用域链为：

```js
barContext.Scope = barContext.AO + bar.[[Scope]]

barContext.Scope = [
  barContext.AO,
  fooContext.AO,
  globalContext.VO
]
```

对x,y,z的标识符解析如下：

```js
- "x"
--  barContext.AO   // not found
--  fooContext.AO   // not found
--  globalContext.VO    // found - 10

- "y"
--  barContext.AO   // not found
--  fooContext.AO   // found - 20

- "z"
--  barContext.AO   // found - 30
```

