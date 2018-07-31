#### Iterator

使用ES5创建一个Iterator

```js
function createIterator(items) {
  var i = 0;
  return {
    next: function() {
      var done = (i => items.length);
      var value = !done ? item[i++] : undefined;
      return {
        done: done,
        value: value
      }
    }
  }
}
var iterator = createIterator([1, 2, 3]);
console.log(iterator.next());     // { done: false, value: 1 }
console.log(iterator.next());     // { done: false, value: 1 }
console.log(iterator.next());     // { done: false, value: 1 }
console.log(iterator.next());     // { done: true, value: undefined }
```

#### Generator

生成器是一种返回迭代器的函数

```js
function *createIterator() {
  yield 1;
  yield 2;
  yield 3;
}
// 生成器的调用方式与普通函数相同，只不过返回的是一个迭代器
let iterator = createIterator();
console.log(iterator.next().value);   // 1 
console.log(iterator.next().value);   // 2
console.log(iterator.next().value);   // 3
console.log(iterator.next().value);   // undefined
```

使用`yield`关键字可以返回任何值或表达式，所以可以通过生成器函数批量的给迭代器添加元素

比如：可以在循环中使用`yield`关键字：

```js
function *createIterator(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i];
  }
}
let iterator = createIterator([1, 2, 3]);
console.log(iterator.next().value);
console.log(iterator.next().value); 
console.log(iterator.next().value);
console.log(iterator.next().value); 
```

不能用箭头函数来创建生成器

> 生成器函数表达式：

```js
let createIterator = function *(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i];
  }
}
let iterator = createIterator([1, 2, 3]);
console.log(iterator.next().value);
console.log(iterator.next().value); 
console.log(iterator.next().value);
console.log(iterator.next().value); 
```

> 生成器对象的方法

由于生成器本身就是函数，所以可以将它们添加到对象中：

```js
let o = {
  createIterator: function *(items) {
    for (let i = 0; i < items.length; i++) {
      yield items[i];
    }
  }
}
let iterator = o.createIterator([1, 2, 3]);
```

使用ES6简写形式：

```js
let o = {
  *createIterator(items) {
    for (let i = 0; i < items.length; i++) {
      yield items[i];
    }
  }
}
let iterator = o.createIterator([1, 2, 3]);
```

#### 可迭代对象和for-of循环

可迭代对象具有`Symbol.iterator`属性。
`Symbol.iterator`通过制定的函数可以返回一个作用于附属对象的迭代器。
在ES6中，所有的集合对象(数组、Set集合、Map集合)和字符串都是可迭代对象，它们都有默认的迭代器。

**由于生成器默认会为`Symbol.iterator`属性赋值，因此所有通过生成器创建的迭代器都是可迭代对象。**

> for-of循环每次执行一次都会调用可迭代对象的`next()`方法，并将迭代器返回结果的`value`属性存储在一个变量中，循环将持续执行这个过程直到返回对象的`done`属性为`true`。

```js
let values = [1, 2, 3];
for (let num of values) {
  console.log(num);
}
```

可以通过`Symbol.iterator`来访问对象默认的迭代器。

```js
let values = [1, 2, 33];
let iterator = values[Symbol.iterator]();
console.log(iterator.next());   // { value: 1, done: false }
console.log(iterator.next());   // { value: 2, done: false }
console.log(iterator.next());   // { value: 3, done: false }
console.log(iterator.next());   // { value: undefined, done: true }
```

由于具有`Symbol.iterator`属性的对象都有默认的迭代器，因此可以用它来检测对象是否为可迭代对象：

```js
function isIterator(object) {
  return typeof object[Symbol.iterator] === "function";
}
console.log(isIterator([1, 2, 3]));
console.log(isIterator("FENG"));
console.log(isIterator(new Set()));
console.log(isIterator(new Map()));
console.log(isIterator(new WeakSet()));   // false
console.log(isIterator(new WeakMap()));   // false
```

> 创建可迭代对象

默认情况下，定义的对象都是不可迭代对象，但如果给`Symbol.iterator`属性添加一个生成器，就可以将其变为可迭代对象。

```js
let collection = {
  items: [],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
}
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);
for (let x of collection) {
  console.log(x);
}
```


#### 内建迭代器---集合对象迭代器

集合对象：数组、Map集合与Set集合

这三种对象都内建了三种迭代器：

1. `entries()`返回一个迭代器，其值为多个键值对
2. `values()`返回一个迭代器，其值为集合的值
3. `keys()`返回一个迭代器，其值为集合的所有键名

> `entries()`迭代器,返回的是一个数组,特别的是Set集合，数组中的第一个元素和第二个元素都是值(Set集合中的值被同时作为键和值使用)

```js
let colors = [ 'red', 'green', 'blue' ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set('title', 'feng');
data.set('format', 'ebook');
for (let entry of colors.entries()) {
  console.log(entry);
}
for (let entry of tracking.entries()) {
  console.log(entry);
}
for (let entry of data.entries()) {
  console.log(entry);
}
// [ 0, 'red' ]
// [ 1, 'green' ]
// [ 2, 'blue' ]
// [ 1234, 1234 ]
// [ 5678, 5678 ]
// [ 9012, 9012 ]
// [ 'title', 'feng' ]
// [ 'format', 'ebook' ]
```

> `values()`

```js
let colors = [ 'red', 'green', 'blue' ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set('title', 'feng');
data.set('format', 'ebook');
for (let value of colors.values()) {
  console.log(value);
}
for (let value of tracking.values()) {
  console.log(value);
}
for (let value of data.values()) {
  console.log(value);
}
```

> `keys()`

```js
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");
for (let key of colors.keys()) {
    console.log(key);
}
for (let key of tracking.keys()) {
    console.log(key);
}
for (let key of data.keys()) {
    console.log(key);
}
// 0
// 1
// 2
// 1234
// 5678
// 9012
// title
// format
```

> 不同集合类型的默认迭代器：每个集合类型都有一个默认的迭代器，在`for..of`循环中，如果没有显示指定则使用默认的迭代器。数组和Set集合的默认迭代器是`values()`方法，Map集合的默认迭代器是`entries()`方法。

```js
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");
for (let value of colors) {
  console.log(value);
}
for (let num of tracking) {
  console.log(num);
}
for (let entry of data) {
  console.log(entry);
}
// red
// green
// blue
// 1234
// 5678
// 9012
// [ 'title', 'Understanding ECMAScript 6' ]
// [ 'format', 'ebook' ]
```

#### 内建迭代器---字符串迭代器

ES5中字符串可以通过方括号访问字符串中的字符，`test[0]`，但是由于方括号操作的是编码单元而非字符，因此无法正确访问双字节字符。

```js
var message = "A 𠮷 B";
for (let i = 0; i < message.length; i++) {
  console.log(message[i])
}
// A
// (空)
// (空)
// (空)
// (空)
// B
```

> ES6

```js
var message = "A 𠮷 B";
for (let c of message) {
  console.log(c);
}
// A
// (空)
// 𠮷
// (空)
// B
```


#### 给迭代器传递参数

如果给迭代器的`next()`传递参数，则这个参数的值就会代替生成器内部上一条`yield`语句的返回值。

```js
function *createIterator () {
  let first = yield 1;
  let second = yield first + 2;
  yield second + 3;
}
let iterator = createIterator();
console.log(iterator.next());   // { value: 1, done: false }
console.log(iterator.next(4));  // { value: 6, done: false }
console.log(iterator.next(5));  // { value: 8, done: false }
console.log(iterator.next());   // { value: undefined, done: true }
```

#### 在迭代器抛出错误

```js
function *createIterator () {
  let first = yield 1;
  let second;
  try {
    second = yield first + 2;
  } catch (ex) {
    second = 6;
  }
  yield second + 3;
}
let iterator = createIterator();
console.log(iterator.next());
console.log(iterator.next(4));
console.log(iterator.throw(new Error("Boom")));
console.log(iterator.next());
```

```js
function run (taskDef) {
  let task = taskDef();
  let result = task.next();
  function step() {
    if (!result.done) {
      result = task.next();
      step();
    }
  }
  step();
}
run(function *() {
  console.log(1);
  yield;
  console.log(2);
  yield;
  console.log(3);
})
```