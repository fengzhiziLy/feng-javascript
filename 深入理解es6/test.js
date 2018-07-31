// function createIterator(items) {
//   var i = 0;
//   return {
//     next: function() {
//       var done = (i >= items.length);
//       var value = !done ? items[i++] : undefined;
//       return {
//         done: done,
//         value: value
//       }
//     }
//   }
// }
// var iterator = createIterator([1, 2, 3]);
// console.log(iterator.next());     // { done: false, value: 1 }
// console.log(iterator.next());     // { done: false, value: 1 }
// console.log(iterator.next());     // { done: false, value: 1 }
// console.log(iterator.next());     // { done: true, value: undefined }

// function *createIterator() {
//   yield 1;
//   yield 2;
//   yield 3;
// }
// // 生成器的调用方式与普通函数相同，只不过返回的是一个迭代器
// let iterator = createIterator();
// console.log(iterator.next().value);
// console.log(iterator.next().value);
// console.log(iterator.next().value);
// console.log(iterator.next().value);


// function *createIterator(items) {
//   for (let i = 0; i < items.length; i++) {
//     yield items[i];
//   }
// }
// let iterator = createIterator([1, 2, 3]);
// console.log(iterator.next().value);
// console.log(iterator.next().value); 
// console.log(iterator.next().value);
// console.log(iterator.next().value);

// let o = {
//   *createIterator(items) {
//     for (let i = 0; i < items.length; i++) {
//       yield items[i];
//     }
//   }
// }
// let iterator = o.createIterator([1, 2, 3]);
// console.log(iterator.next().value);
// console.log(iterator.next().value); 
// console.log(iterator.next().value);
// console.log(iterator.next().value);

// let values = [1, 2, 3];
// for (let num of values) {
//   console.log(num);
// }

// let values = [1, 2, 33];
// let iterator = values[Symbol.iterator]();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());


// function isIterator(object) {
//   return typeof object[Symbol.iterator] === "function";
// }
// console.log(isIterator([1, 2, 3]));
// console.log(isIterator("FENG"));
// console.log(isIterator(new Set()));
// console.log(isIterator(new Map()));
// console.log(isIterator(new WeakSet()));
// console.log(isIterator(new WeakMap()));


// let collection = {
//   items: [],
//   *[Symbol.iterator]() {
//     for (let item of this.items) {
//       yield item;
//     }
//   }
// }
// collection.items.push(1);
// collection.items.push(2);
// collection.items.push(3);
// for (let x of collection) {
//   console.log(x);
// }


// let colors = [ 'red', 'green', 'blue' ];
// let tracking = new Set([1234, 5678, 9012]);
// let data = new Map();
// data.set('title', 'feng');
// data.set('format', 'ebook');
// for (let entry of colors.entries()) {
//   console.log(entry);
// }
// for (let entry of tracking.entries()) {
//   console.log(entry);
// }
// for (let entry of data.entries()) {
//   console.log(entry);
// }

// let colors = [ "red", "green", "blue" ];
// let tracking = new Set([1234, 5678, 9012]);
// let data = new Map();
// data.set("title", "Understanding ECMAScript 6");
// data.set("format", "ebook");
// for (let value of colors.values()) {
//     console.log(value);
// }
// for (let value of tracking.values()) {
//     console.log(value);
// }
// for (let value of data.values()) {
//     console.log(value);
// }

// let colors = [ "red", "green", "blue" ];
// let tracking = new Set([1234, 5678, 9012]);
// let data = new Map();
// data.set("title", "Understanding ECMAScript 6");
// data.set("format", "ebook");
// for (let key of colors.keys()) {
//     console.log(key);
// }
// for (let key of tracking.keys()) {
//     console.log(key);
// }
// for (let key of data.keys()) {
//     console.log(key);
// }

// let colors = [ "red", "green", "blue" ];
// let tracking = new Set([1234, 5678, 9012]);
// let data = new Map();
// data.set("title", "Understanding ECMAScript 6");
// data.set("format", "ebook");
// for (let value of colors) {
//   console.log(value);
// }
// for (let num of tracking) {
//   console.log(num);
// }
// for (let entry of data) {
//   console.log(entry);
// }


// var message = "A 𠮷 B";
// for (let i = 0; i < message.length; i++) {
//   console.log(message[i])
// }


// function *createIterator () {
//   let first = yield 1;
//   let second = yield first + 2;
//   yield second + 3;
// }
// let iterator = createIterator();
// console.log(iterator.next());
// console.log(iterator.next(4));
// console.log(iterator.next(5));
// console.log(iterator.next());

// function *createIterator () {
//   let first = yield 1;
//   let second;
//   try {
//     second = yield first + 2;
//   } catch (ex) {
//     second = 6;
//   }
//   yield second + 3;
// }
// let iterator = createIterator();
// console.log(iterator.next());
// console.log(iterator.next(4));
// console.log(iterator.throw(new Error("Boom")));
// console.log(iterator.next());


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