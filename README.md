### 深入理解：变量对象(Variable Object)

#### 数据声明

如果变量与执行上下文相关，那变量自己应该知道它的数据存储在哪里，并且知道如何访问。这种机制就是变量对象

> 变量对象(VO)是一个与执行上下文相关的特殊对象，它存储着在上下文中声明的一下内容：
>> 变量（var，变量声明）
>> 函数声明（FD）
>> 函数的形参

*伪代码*

```js
// #可以用普通的ECMAScript对象来表示一个变量对象
VO = {}
// VO就是执行上下文的属性(property)
activeExecutionContext = {
  VO: {
    // 上下文数据(var,FD,function arguments)
  }
}
```

只有全局上下文的变量对象允许通过VO的属性来间接访问，其它上下文中是不能直接访问VO对象，因为只是一个内部机制的实现。

```js
var a = 10;
function test(x) {
  var b = 20;
};
test(30);
```

对应的变量对象是：

```js
// 全局上下文的变量对象
VO(globalContext) = {
  a: 10,
  test: <reference to function>
};
// test函数上下文的变量对象
VO(test functionContext) = {
  x: 30,
  b: 20
}
```

#### 不同执行上下文中的变量对象

```
抽象变量对象VO(变量初始化过程的一般行为)
  ||
  ||---> 全局上下文变量对象GlobalContext
  ||        (VO === this === global)
  ||
  ||___> 函数上下文变量对象FunctionContextAO
            (VO === AO,并且添加了<argument>和<formal parameters>)
```

##### 全局上下文中的变量对象

> 全局对象是在进入任何执行上下文之前就已经创建了的对象
>> 这个对象只存在一份，它的属性在程序中任何地方都可以访问，全局对象的声明周期终止于程序退出的那一刻

```
VO(globalContext) === global
```

##### 函数上下文中的变量对象

> 在函数执行上下文中，VO是不能直接访问的，此时由活动对象(activation object，AO)来代替VO。

活动对象是在进入函数上下文时候被创建的，它通过函数的arguments属性初始化，arguments属性的值是Arguments对象：

```
AO = {
  arguments: <ArgO>
}
```

Arguments对象是活动对象的一个属性，它包含如下属性：
1. callee----指向当前函数的引用
2. length----真正传递的参数个数
3. properties-indexes(字符串类型的整数)属性的值就是函数的参数值(按参数列表从左到右排列)

例如：

```js
function foo (x, y, z) {
  // 声明的函数参数数量
  alert(foo.length)

  // 真正传递进来的参数个数
  alert(arguments.length)

  // 参数的callee是函数自身
  alert(arguments.callee === foo)

  // 参数共享
  alert(x === arguments[0])
  alert(x)

  arguments[0] = 20
  alert(x)

  x = 30
  alert(arguments[0])

  // 没有传进来的参数z，和参数的第3个索引值是不共享的
  z = 40
  alert(arguments[2])

  arguments[2] = 50
  alert(z)
}
foo(10, 20)
```

#### 处理上下文的2个阶段

1. 进入执行上下文
2. 执行代码

*这两个阶段的处理是一般行为，和上下文的类型无关（在全局上下文和函数上下文中是一样的）*

##### 进入执行上下文

当进入执行上下文（代码执行前），VO里已经包含了下列属性：

> 函数的所有形参(如果是在函数执行上下文中)
>> 有名称和对应值组成的一个变量对象的属性被创建；没有传递对应参数的话，那么由名称和undefined组成的一种变量对象的属性也将被创建

> 所有函数声明(FunctionDeclaration,FD)
>> 由名称和对应值(函数对象(function-object))组成一个变量对象的属性被创建。如果变量对象已经存在相同名称的属性，则完全替换这个属性。

> 所有变量声明(var, VariableDeclaration)