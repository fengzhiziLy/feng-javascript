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

// function *foo() {
//   var x = yield 3;
//   var y = x.toUpperCase();
//   yield y;
// }
// var it = foo();
// it.next();
// try {
//   it.next(42);
// } catch (err) {
//   console.log(err);
// }

// function *g() {
//   yield 1;
//   console.log('throwing an exception');
//   throw new Error('generator broke');
//   yield 2;
//   yield 3;
// }
// function log(generator) {
//   var v;
//   console.log('starting generator');
//   try {
//     v = generator.next();
//     console.log('第一次运行next方法', v);
//   } catch (err) {
//     console.log('捕获错误', v);
//   }
//   try {
//     v = generator.next();
//     console.log('第二次运行next方法', v);
//   } catch (err) {
//     console.log('捕获错误', v);
//   }
//   try {
//     v = generator.next();
//     console.log('第三次运行next方法', v);
//   } catch (err) {
//     console.log('捕获错误', v);
//   }
//   console.log('caller done');
// }
// log(g());

// function *gen() {
//   yield 1;
//   yield 2;
//   yield 3;
// }
// var g = gen();
// g.next();
// g.return('foo');
// g.next();

// const g = function *(x, y) {
//   let result = yield x + y;
//   return result;
// }
// const gen = g(1, 2);
// console.log(gen.next());
// console.log(gen.next(1));

// function *foo() {
//   yield 'a';
//   yield 'b';
// }
// function *bar() {
//   yield 'x';
//   foo();
//   yield 'y';
// }
// for (let v of bar()) {
//   console.log(v)
// }

// function *foo() {
//   yield 'a';
//   yield 'b';
// }
// function *bar() {
//   yield 'x';
//   yield *foo();
//   yield 'y';
// }
// for (let v of bar()) {
//   console.log(v)
// }

// function *inner() {
//   yield 'hello!';
// }
// function *outer1() {
//   yield 'open';
//   yield inner();
//   yield 'close';
// }
// var gen = outer1()
// console.log(gen.next().value)
// console.log(gen.next().value)
// console.log(gen.next().value)
// function *outer2() {
//   yield 'open';
//   yield *inner();
//   yield 'close';
// }
// var gen = outer2()
// console.log(gen.next().value)
// console.log(gen.next().value)
// console.log(gen.next().value)

// let delegatedIterator = (function *() {
//   yield 'Hello';
//   yield 'Bey!';
// }())
// let delegatingIterator = (function *() {
//   yield 'Greeting';
//   yield *delegatedIterator;
//   yield 'Ok, bye.';
// }())
// for (let value of delegatingIterator) {
//   console.log(value)
// }

// function *gen() {
//   yield *["a", "b", "c"];
// }
// console.log(gen().next())

// let collection = {
//   0: 'hello',
//   1: 'feng',
//   length: 2,
//   [Symbol.isConcatSpreadable]: true
// }
// let message = ["Hi"].concat(collection);
// console.log(message.length);
// console.log(message);

// let hasLengthOf10 = {
//   [Symbol.match]: function(value) {
//     return value.length === 10 ? [value] : null;
//   },
//   [Symbol.replace]: function (value, replacement) {
//     return value.length === 10 ? replacement : value;
//   },
//   [Symbol.search]: function(value) {
//     return value.length === 10 ? 0 : -1;
//   },
//   [Symbol.split]: function(value) {
//     return value.length === 10 ? [, ] : [value]
//   }
// }
// let message1 = "Hello World",
//     message2 = "Hello Feng";
// let match1 = message1.match(hasLengthOf10);
//     match2 = message2.match(hasLengthOf10);
// console.log(match1);
// console.log(match2);
// let replace1 = message1.replace(hasLengthOf10);
//     replace2 = message2.replace(hasLengthOf10);
// console.log(replace1);
// console.log(replace2);
// let search1 = message1.search(hasLengthOf10);
//     search2 = message2.search(hasLengthOf10);
// console.log(search1);
// console.log(search2);
// let split1 = message1.split(hasLengthOf10);
//     split2 = message2.split(hasLengthOf10);
// console.log(split1);
// console.log(split2);


// function Temperature(degrees) {
//   this.degrees = degrees;
// }
// Temperature.prototype[Symbol.toPrimitive] = function (hint) {
//   switch (hint) {
//     case "string":
//       return this.degrees + "\u00b0";
//     case "number":
//       return this.degrees;
//     case "default":
//       return this.degrees + " degrees";
//   }
// }
// var freezing = new Temperature(32);
// console.log(freezing + "!");
// console.log(freezing / 2);
// console.log(String(freezing));

// let message = `feng
//               zhizi`
// console.log(message);


// let name = "feng",
//     message = `hello, ${name}`;
// console.log(message);



// function mixArgs(first, second = "b") {
//   console.log(arguments.length);
//   console.log(first === arguments[0]);
//   console.log(second === arguments[1]);
//   first = "c";
//   second = "d";
//   console.log(first === arguments[0]);
//   console.log(second === arguments[1]);
// }
// mixArgs("a")


// let value = 5
// function getValue() {
//   return value++;
// }
// function add(first, second=getValue()) {
//   return first + second;
// }
// console.log(add(1, 2));
// console.log(add(1));
// console.log(add(1));

function add(first, second = first) {
  return first + second;
}
console.log(add(1, 2));
console.log(add(1));