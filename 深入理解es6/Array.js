// let items = Array.of(1, 2);
// console.log(items.length);
// console.log(items[0]);
// console.log(items[1]);

// items = Array.of(2);
// console.log(items.length);
// console.log(items[0]);

// items = Array.of("2");
// console.log(items.length);
// console.log(items[0]);

// console.log(Array.from('foo'));

// function translate () {
//   return Array.from(arguments, (value) => value + 1);
// }
// let numbers = translate(1, 2, 3);
// console.log(numbers);

// let helper = {
//   diff: 1,
//   add(value) {
//     return value + this.diff;
//   }
// };
// function translate () {
//   return Array.from(arguments, helper.add, helper);
// }
// let numbers = translate(1, 2, 3);
// console.log(numbers);

// let numbers = {
//   *[Symbol.iterator]() {
//     yield 1;
//     yield 2;
//     yield 3;
//   }
// };
// let numbers2 = Array.from(numbers, (value) => value + 1);
// console.log(numbers2);

// let numbers3 = [25, 30, 35, 40, 45];
// console.log(numbers3.find(n => n > 33));
// console.log(numbers3.findIndex(n => n > 33));

let numbers = [1, 2, 3, 4];
numbers.fill(1);
console.log(numbers);

let promise = new Promise(function(resolve, reject) {
  console.log("Promise");
  resolve();
});
promise.then(function() {
  console.log("Resolved");
});
console.log("Hi");