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


#### 内建迭代器

