class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }
  [Symbol.iterator]() { return this; }
  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {
        done: false,
        value: value
      }
    }
    return {
      done: true,
      value: undefined
    }
  }
}
function range(start, stop) {
  return new RangeIterator(start, stop);
}
for (var value of range(0, 3)) {
  console.log(value);
}

// 遍历器实现指针结构的例子
function Obj (value) {
  this.value = value;
  this.next = null;
}
Obj.prototype[Symbol.iterator] = function () {
  var iterator = { next: next };
  var current = this;
  function next() {
    if (current) {
      var value = current.value;
      current = current.next;
      return { done: false, value: value };
    } else {
      return { done: true };
    }
  }
  return iterator
}
var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);
one.next = two;
two.next = three;
for (var i of one) {
  console.log("one:" + i)
}
for (var i of two) {
  console.log("two:" + i)
}
for (var i of three) {
  console.log("three:" + i)
}

// 一个类数组的对象调用数组的Symbol.iterator方法
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for (let item of iterable) {
  console.log(item);
}

// 扩展运算符会调用默认的Iterator接口
var str = "feng";
console.log([...str]);
let arr = ['b', 'c'];
console.log(['a', ...arr, 'd']);

// yield*
let generator = function *() {
  yield 1;
  yield *[2, 3, 4];
  yield 5;
}
var iterator = generator();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// 字符串的Iterator接口
var someString = "hi";
typeof someString[Symbol.iterator];  // function
var iterator = someString[Symbol.iterator]();
iterator.next();  // { value: "h", done: false }
iterator.next();  // { value: "i", done: false }
iterator.next();  // { value: undefined, done: true }

// Iterator接口与Generator函数
let myIterable = {
  [Symbol.iterator]: function *() {
    yield 1;
    yield 2;
    yield 3;
  }
}
console.log([...myIterable])
let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
}
for (let x of obj) {
  console.log(x);
}

// 一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，就可以用for...of循环遍历它的成员，也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法
// 数组
const arr = ['red', 'green', 'blue'];
// for(let v of arr) {
//   console.log(v);
// }
const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
for(let v of obj) {
  console.log(v); // red green blue
}


var Fib = {
  [Symbol.iterator]() {
    var n1 = 1, n2 = 1;
    return {
      [Symbol.iterator]() { return this; },
      next () {
        var current = n2;
        n2 = n1;
        n1 = n1 + current;
        return { value: current, done: false }
      },
      return (v) {
        console.log("Fibonacci squence abandoned")
        return { value: v, done: true }
      }
    }
  }
}
for (var v of Fib) {
  console.log(v);
  if (v > 50) break;
}


var a = [1, 2, 3, 4, 5];
var it = a[Symbol.iterator]();
var [m, n2] = it;
var [z, ...w] = it;
it.next();