// function wrapper(generatorFunction) {
//   return function(...args) {
//     let generatorObject = generatorFunction(...args);
//     generatorObject.next();
//     return generatorObject;
//   }
// }
// const wrapped = wrapper(function *() {
//   console.log(`First input: ${yield}`);
//   return 'DONE';
// });
// wrapped().next('hello!')

// function *objectEntries() {
//   let propKeys = Object.keys(this);
//   for(let propKey of propKeys) {
//     yield [propKey, this[propKey]];
//   }
// }
// let feng = { first: 'bai', last: 'feng' };
// feng[Symbol.iterator] = objectEntries;
// for (let [key, value] of feng) {
//   console.log(`${key}: ${value}`);
// }

// function *numbers () {
//   yield 1;
//   yield 2;
//   return 3;
//   yield 4;
// }
// for(let n of numbers()) {
//   console.log(n)
// }

// var g = function *() {
//   try {
//     yield;
//   } catch (e) {
//     console.log('内部捕获', e);
//   }
// };
// var i = g();
// i.next();
// try {
//   i.throw('a');
//   i.throw('b');
// } catch(e) {
//   console.log("外部捕获", e)
// }

// var g = function *() {
//   try {
//     yield;
//   } catch (e) {
//     console.log(e);
//   }
// };
// var i = g();
// i.next();
// i.throw(new Error('出错了！'));


// var g = function *() {
//   while (true) {
//     try {
//       yield;
//     } catch (e) {
//       if (e != 'a') throw e;
//       console.log('内部捕获', e);
//     }
//   }
// }
// var i = g();
// i.next();
// try {
//   throw new Error('a');
//   throw new Error('b');
// } catch (e) {
//   console.log('外部捕获', e);
// }

// function *gen() {
//   try {
//     yield 1;
//   } catch (e) {
//     console.log('内部捕获');
//   }
// }
// var g = gen();
// g.throw(1);

// var gen = function *gen() {
//   try {
//     yield console.log('a');
//   } catch (e) {
//     // ...
//   }
//   yield console.log('b');
//   yield console.log('c');
// }
// var g = gen();
// g.next()
// g.throw()
// g.next()

function *foo() {
  var x = yield 3;
  var y = x.toUpperCase();
  yield y;
}
var it = foo();
it.next();
try {
  it.next(42);
} catch (err) {
  console.log(err);
}