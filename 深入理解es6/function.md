### 处理无命名参数

#### ECMAScript5中的无命名参数

```js
function pick(object) {
  let result = Object.create(null);
  // 从第二个参数开始
  for(let i = 1, len = arguments.length; i < len; i++) {
    result[arguments[i]] = object[arguments[i]];
  }
  return result;
}
let book = {
  title: 'ECMAScript 6',
  author: 'feng',
  year: 2018
}
let bookData = pick(book, "author", "year");
console.log(bookData.author);
console.log(bookData.year);
```

ES6引入不定参数(rest parameters)的特性

#### 不定参数

```js
function pick(object, ...keys) {
  let result = Object.create(null);
  for(let i = 0, len = keys.length; i < len; i++) {
    result[keys[i]] = object[keys[i]];
  }
  return result;
}
```

**注意**
- 每个函数只能声明一个不定参数，且只能放在所有参数的末尾
- 不定参数不能用在对象字面量setter之中


#### Function

通常用来动态创建新的函数。这种构造函数接受字符串形式的参数，分别为函数的参数以及函数体。

```js
var add = new Function("first", "second", "return first + second");
console.log(add(1, 2));
```

**ES6增强的功能**
支持在创建函数时定义默认参数和不定参数

```js
var add = new Function("first", "second = first", "return first + second");
console.log(add(1, 3));
console.log(add(2));

var pickFirst = new Function("...args", "return args[0]");
console.log(pickFirst(1, 2));
```

### 展开运算符

展开运算符指定一个数组，将它们打散后作为各自独立的参数传入函数

```js
let value1 = 25,
    value2 = 50;
console.log(Math.max(value1, value2));
```

内置的Math.max()可以接收任意数量的参数并返回最大的值，但是不允许传入数组。
解决方法：

```js
let values = [25, 50, 75, 100];
console.log(Math.max.apply(Math, values));
```

ES6的解决方法：

```js
let values = [25, 50, 75, 100];
console.log(Math.max(...values));
```


### name属性---协助调试的额外信息

#### 如何选择合适的名称

```js
function doSomething () {
  // ...
}
var doAnotherThing = function() {
  // ...
}
console.log(doSomething.name);
console.log(doAnotherThing.name);
```

#### name属性的特殊情况

```js
var doSomething = function doSomethingElse() {
  // ...
};
var person = {
  get firstName() {
    return "feng"
  },
  sayName: function () {
    console.log(this.name);
  }
}
console.log(doSomething.name);
console.log(person.sayName.name);
var descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor.get.name);
```

> Both getter and setter functions must be retrieved using Object.getOwnPropertyDescriptor().

```js
var doSomething = function() {
  // ...
}
console.log(doSomething.bind().name);
// "bound doSomething"
console.log((new Function()).name);
// "anonymous"
```


### 明确函数的多重用途

es5及以前版本中的函数，可以结合new使用，函数体内的this将指向一个新对象，函数最终会返回这个新对象。

```js
function Person(name) {
  this.name = name;
}
var person = new Person("feng");
var notPerson = Person("feng");
console.log(person);    // Person { name: 'feng' }
console.log(notPerson); //undefined
```


#### 在ES5中判断函数被调用的方法-----instanceof

```js
function Person (name) {
  if (this instanceof Person) {
    this.name = name;
  } else {
    throw new Error('必须通过new关键字调用');
  }
}
var person = new Person("feng");
var notPerson = Person("feng");
console.log(person);
console.log(notPerson); // 抛出错误
```

通常来讲这样做正确的，由于[[Construct]]方法会创建一个Person的实例，并将this绑定到新实例上，但不是完全可靠
> 因为有一种不依赖new关键字的方法也可以将this绑定到Person的实例上

```js
function Person (name) {
  if (this instanceof Person) {
    this.name = name;
  } else {
    throw new Error('必须通过new关键字调用');
  }
}
var person = new Person("feng");
var notPerson = Person.call(person, "feng");
console.log(person);    // Person { name: 'wang' }
console.log(notPerson); // undefined
```

#### 元属性new.target

> 为了解决判断函数是否是通过new关键字调用的问题，ES6引入了`new.target`这个元属性。

元属性是指非对象的属性，其可以提供非对象目标的补充信息(如new)。

当调用函数的`[[Construct]]`方法时，`new.target`被赋值为`new`操作符的目标，通常是新创建的对象实例，也就是函数体内this的构造函数
如果调用了`[[Call]]`方法时，则`new.target`的值为`undefined`

```js
function Person (name) {
  if (typeof new.target !== 'undefined') {
    this.name = name;
  } else {
    throw new Error('必须通过new关键字调用');
  }
}
var person = new Person("feng");
var notPerson = Person.call(person, "feng");
console.log(person);    
console.log(notPerson); // 抛出错误
```

### 箭头函数

基本形式

```js
let reflect = value => value;
// 实际上相当于
let reflect = function(value) {
  return value;
}

let sum = (num1, num2) => num1 + num2;
// 实际上相当于
let sum = function(num1, num2) {
  return num1 + num2;
}

let getName = () => "feng";
// 实际上相当于
let getName = function () {
  return "feng";
}

let sum = (num1, num2) => {
  return num1 + num2;
}
// 实际上相当于
let sum = function (num1, num2) {
  return num1 + num2;
}

let doNothing = () => {}
// 实际上相当于
let doNothing = function () {}

let getTemplate = id => ({ id: id, name: "feng" });
// 实际上相当于
let getTemplate = function (id) {
  return {
    id: id,
    name: "feng"
  }
}
```

#### 创建立即执行函数表达式

当想创建一个与其他程序隔离的作用域时，使用IIFE很方便。

```js
let person = function (name) {
  return {
    getName: function() {
      return name;
    }
  }
}("feng");
console.log(person.getName());  // feng
```

使用箭头函数

```js
let person = ((name) => {
  return {
    getName: function() {
      return name;
    }
  }
})("wangzi");
console.log(person.getName());
```

#### 箭头函数中没有this绑定

```js
let PageHandler = {
  id: "123456",
  init: function () {
    document.addEventListener("click", function(event) {
      this.doSomething(event.type); // 抛出错误
    }, false)
  },
  doSomething: function(type) {
    console.log("Handling " + type + " for " + this.id)
  }
}
```

解决问题：

```js
let PageHandler = {
  id: "123456",
  init: function () {
    document.addEventListener("click", (function(event) {
      this.doSomething(event.type); // 没有产生错误
    }).bind(this), false)
  },
  doSomething: function(type) {
    console.log("Handling " + type + " for " + this.id)
  }
}
```

使用箭头函数：

```js
let PageHandler = {
  id: "123456",
  init: function () {
    document.addEventListener("click", 
    event => this.doSomething(event.type), false)
  },
  doSomething: function(type) {
    console.log("Handling " + type + " for " + this.id)
  }
}
```

> 箭头函数中没有this绑定，必须查找作用域来决定其值，如果箭头函数被非箭头函数包含，则this绑定的是最近一层非箭头函数的this；否则this的值会被设置为全局对象。

> 箭头函数缺少正常函数所拥有的`prototype`属性，它的设计之初就是“即用即废”，故不能用来创建新的类型。


#### 箭头函数没有arguments绑定

> 箭头函数没有自己的`arguments`对象，且未来无论在哪个函数上执行，箭头函数始终可以访问外围函数的`arguments`对象。

```js
function createArrowFunction () {
  return () => arguments[0];
}
var arrowFunction = createArrowFunction(5);
console.log(arrowFunction());   // 5
```

#### 箭头函数的辨别方法

```js
var comparator = (a, b) => a - b;
console.log(typeof comparator); // function
console.log(comparator instanceof Function);   // true
```