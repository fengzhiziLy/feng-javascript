#### typeof

```js   
console.log(typeof('feng'));    // string
console.log(typeof 'feng');  // string
```

> typeof 是一元操作符，放在其单个操作数的前面，操作数可以是任意类型。返回值为表示操作数类型的一个字符串

在ES6之前，六中数据类型：
Undefined Null Boolean Number String Object
对其使用`typeof`进行操作，返回的结果：
undefined object boolean number string object

> Null和Object类型都是object

`typeof`能检测出函数类型：

```js
function a() {}
console.log(typeof a);  // function
```

> 除此之外 Object 下还有很多细分的类型,如 Array、Function、Date、RegExp、Error等

```js
var date = new Date();
var error = new Error();
console.log(typeof date);     // object
console.log(typeof error);    // object
```

#### Object.prototype.toString

Object.prototype.toString: 当`toString`方法被调用的时候，一下是规范中的讲解：

1. 如果`this`值是`undefined`，就返回`[object Undefined]`
2. 如果`this`值是`null`，就返回`[object Null]`
3. 让O成为`ToObject(this)`的结果
4. 让`class`成为O的内部属性[[Class]]的值
5. 最后返回由"[object"和class和"]"三个部分组成的字符串

通过规范，至少知道了调用`Object.prototype.toString`会返回一个由 "[object " 和 class 和 "]" 组成的字符串，而`class`是要判断的对象的内部属性

```js
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call(null));      // [object Null]
var date = new Date();
console.log(Object.prototype.toString.call(date));      // [object Date]
```

```js
var number = 1;               // [object Number]
var string = '123';           // [object String]
var boolean = true;           // [object Boolean]
var und = undefined;          // [object Undefined]
var nul = null;               // [object Null]
var obj = {a: 1};             // [object Object]
var array = [1, 2, 3];        // [object Array]
var date = new Date();        // [object Date]
var error = new Error();      // [object Error]
var reg = /a/g;               // [object RegExp]
var func = function a() {};   // [object Function]
function checkType () {
  for (var i = 0; i < arguments.length; i++) {
    console.log(Object.prototype.toString.call(arguments[i]));
  }
}
checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)

console.log(Object.prototype.toString.call(Math));    //[object Math]
console.log(Object.prototype.toString.call(JSON));    // [object JSON]

function a() {
  console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}
a();
```

#### type API

写一个`type`函数能检测各种类型的值，如果是基本类型，就使用`typeof`，引用类型就使用 `toString`。此外鉴于`typeof`的结果是小写，我也希望所有的结果都是小写。

考虑到实际情况下并不会检测`Math`和`JSON`，所以去掉这两个类型的检测。

```js
var classType = {};
"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(function(item, index) {
  classType["[object " + item + "]"] = item.toLowerCase();
})
function type(obj) {
  return typeof obj === "object" || typeof obj === "function" ?
    classType[Object.prototype.toString.call(obj)] || "object" :
    typeof obj;
}
```

> **注意**：IE6中，`null`和`undefined`会被`Object.prototype.toString`识别成`[object Object]`

```js
var classType = {};
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
  classType["[object " + item + "]"] = item.toLowerCase();
})
function type(obj) {
  if (obj == null) {
    return obj + "";
  }
  return typeof obj === "object" || typeof obj === "function" ?
    classType[Object.prototype.toString.call(obj)] || "object" :
    typeof obj;
}
```

#### 数组

jQuery判断数组类型，旧版本是通过判断`Array.isArray`方法是否存在，如果存在就使用该方法，不存在就使用`type`函数

```js
var isArray = Array.isArray || function(obj) {
  return type(obj) === "array"
}
```

#### plainObject

`plainObject`来自于jQuery，理解为纯粹的对象，就是该对象是通过 "{}" 或 "new Object" 创建的，该对象含有零个或者多个键值对

之所以要判断是不是`plainObject`，是为了跟其他的`JavaScript`对象如`null`，数组，宿主对象（documents）等作区分，因为这些用`typeof`都会返回`object`

jquery的使用效果：

```js
function Person(name) {
  this.name = name;
}
console.log($.isPlainObject({}))                              // true
console.log($.isPlainObject(new Object));                     // true
console.log($.isPlainObject(Object.create(null)));            // true
console.log($.isPlainObject(Object.assign({a: 1}, {b: 2})));  // true
console.log($.isPlainObject(new Person('feng')));             // false
console.log($.isPlainObject(Object.create({})));              // false
```

由此我们可以看到，除了`{}`和`new Object`创建的之外，jQuery认为一个没有原型的对象也是一个纯粹的对象

3.0版本以下的`isPlainObject`的源码：

```js
var classType = {};
// 相当于Object.prototype.toString
var toString = classType.toString;
// 相当于Object.prototype.hasOwnProperty
var hasOwn = classType.hasOwnProperty;
function isPlainObject(obj) {
  var proto, Ctor;
  // 排除掉明显不是obj的以及一些宿主对象如window
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  /**
   * getPrototypeOf es5 方法，获取 obj 的原型
   * 以 new Object 创建的对象为例的话
   * obj.__proto__ === Object.prototype
   */
  proto = Object.getPrototypeOf(obj);
  // 没有原型的对象是纯粹的， Object.create(null)在这里就返回true
  if (!proto) {
    return true;
  }
  /**
   * 以下判断通过 new Object 方式创建的对象
   * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
   * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
   */
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
  return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}
```

#### EmptyObject

jQuery提供了`isEmptyObject`方法来判断是否是空对象

```js
function isEmptyObject(obj) {
  var name;
  for (name in obj) {
    return false;
  }
  return true;
}
console.log(isEmptyObject({})); // true
console.log(isEmptyObject([])); // true
console.log(isEmptyObject(null)); // true
console.log(isEmptyObject(undefined)); // true
console.log(isEmptyObject(1)); // true
console.log(isEmptyObject('')); // true
console.log(isEmptyObject(true)); // true
```

#### isArrayLike

jQuery 实现的`isArrayLike`，数组和类数组都会返回`true`

```js
function isArrayLike(obj) {
  // obj必须有length属性
  var length = !!obj && "length" in obj && obj.length;
  var typeRes = type(obj);
  // 排除掉函数和window对象
  if (typeRes === "function" || isWindow(obj)) {
    return false;
  }
  return typeRes === "array" || length === 0 ||
    typeof length === "number" && length > 0 && (length -1) in obj;
}
```

在`return`这一行，如果isArrayLike返回true，至少满足三个条件之一：

1. 是数组
2. 长度为0
3. length属性是大于0的数字类型，并且`obj[length-1]`必须存在

对于第二种：

```js
var obj = {a: 1, b: 2, length: 0};
```

```js
function a() {
  console.log(isArrayLike(arguments))
}
a();
```

如果去掉`length === 0`这个判断，就会打印出`false`，`arguments`是一个类数组对象，这里是应该返回`true`的.

对于第三个条件： length是数字，并且length>0且最后一个元素存在

```js
var arr = [, , 3];
console.log(arr.length);      // 3
var arrLike = {
  2: 3,
  length: 3
}
console.log(arrLike.length);  // 3
```

在数组中用逗号直接跳过的时候，认为该元素是不存在的，类数组对象中也就不用写这个元素，但是最后一个元素是一定要写的，要不然`length`的长度就不会是最后一个元素的`key`值加1

```js
var arr = [1,,];
console.log(arr.length);
var arrLike = {
  0: 1,
  length: 1
}
console.log(arrLike.length);
```