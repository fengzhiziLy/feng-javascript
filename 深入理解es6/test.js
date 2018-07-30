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