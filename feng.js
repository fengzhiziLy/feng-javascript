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

// function add(first, second = first) {
//   return first + second;
// }
// console.log(add(1, 2));
// console.log(add(1));


// function pick(object, ...keys) {
//   let result = Object.create(null);
//   // 从第二个参数开始
//   for(let i = 0, len = keys.length; i < len; i++) {
//     result[keys[i]] = object[keys[i]];
//   }
//   return result;
// }
// let book = {
//   title: 'ECMAScript 6',
//   author: 'feng',
//   year: 2018
// }
// let bookData = pick(book, "author", "year");
// console.log(bookData.author);
// console.log(bookData.year);


// var add = new Function("first", "second", "return first + second");
// console.log(add(1, 2));

// var add = new Function("first", "second = first", "return first + second");
// console.log(add(1, 3));
// console.log(add(2));

// var pickFirst = new Function("...args", "return args[0]");
// console.log(pickFirst(1, 2));

// let value1 = 25,
//     value2 = 50;
// console.log(Math.max(value1, value2));

// let values = [25, 50, 75, 100];
// console.log(Math.max.apply(Math, values));

// let values = [25, 50, 75, 100];
// console.log(Math.max(...values));

// function doSomething () {
//   // ...
// }
// var doAnotherThing = function() {
//   // ...
// }
// console.log(doSomething.name);
// console.log(doAnotherThing.name);



// var doSomething = function doSomethingElse() {
//   // ...
// };
// var person = {
//   get firstName() {
//     return "feng"
//   },
//   sayName: function () {
//     console.log(this.name);
//   }
// }
// console.log(doSomething.name);
// console.log(person.sayName.name);
// var descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
// console.log(descriptor.get.name);



// var doSomething = function() {
//   // ...
// }
// console.log(doSomething.bind().name);
// console.log((new Function()).name);


// function Person(name) {
//   this.name = name;
// }
// var person = new Person("feng");
// var notPerson = Person("feng");
// console.log(person);    // Person { name: 'feng' }
// console.log(notPerson); //undefined


// function Person (name) {
//   if (this instanceof Person) {
//     this.name = name;
//   } else {
//     throw new Error('必须通过new关键字调用');
//   }
// }
// var person = new Person("feng");
// var notPerson = Person("feng");
// console.log(person);
// console.log(notPerson);

// function Person (name) {
//   if (this instanceof Person) {
//     this.name = name;
//   } else {
//     throw new Error('必须通过new关键字调用');
//   }
// }
// var person = new Person("feng");
// var notPerson = Person.call(person, "wang");
// console.log(person);    // Person { name: 'wang' }
// console.log(notPerson); // undefined

// function Person (name) {
//   if (typeof new.target !== 'undefined') {
//     this.name = name;
//   } else {
//     throw new Error('必须通过new关键字调用');
//   }
// }
// var person = new Person("feng");
// var notPerson = Person.call(person, "feng");
// console.log(person);    // Person { name: 'wang' }
// console.log(notPerson);



// let person = function (name) {
//   return {
//     getName: function() {
//       return name;
//     }
//   }
// }("feng");
// console.log(person.getName());

// let person = ((name) => {
//   return {
//     getName: function() {
//       return name;
//     }
//   }
// })("wangzi");
// console.log(person.getName());


// function createArrowFunction () {
//   return () => arguments[0];
// }
// var arrowFunction = createArrowFunction(5);
// console.log(arrowFunction());

// var comparator = (a, b) => a - b;
// console.log(typeof comparator);
// console.log(comparator instanceof Function);


// var person = {},
//     lastName = "last name";
// person["first name"] = "Feng";
// person[lastName] = "zhizi";
// console.log(person["first name"]);
// console.log(person[lastName]);

// let lastName = "last name";
// let person = {
//   "first name": "feng",
//   [lastName]: "zhizi"
// }
// console.log(person["first name"]);
// console.log(person[lastName]);


// var suffix = " name";
// var person = {
//   ["first" + suffix]: "feng",
//   ["last" + suffix]: "zhizhi"
// }
// console.log(person["first name"]);
// console.log(person["last name"]);

// console.log(+0 == -0);
// console.log(+0 === -0);
// console.log(Object.is(+0, -0));

// console.log(NaN == NaN);
// console.log(NaN === NaN);
// console.log(Object.is(NaN, NaN));

// console.log(5 == 5);
// console.log(5 == "5");
// console.log(5 === 5);
// console.log(5 === "5");
// console.log(Object.is(5, 5));
// console.log(Object.is(5, "5"));


// function mixin(receiver, sipplier) {
//   Object.keys(sipplier).forEach(function(key) {
//     receiver[key] = sipplier[key];
//   });
//   return receiver;
// }
// function EventTarget () { /* ... */ }
// EventTarget.prototype = {
//   constructor: EventTarget,
//   emit: function () { console.log('111') },
//   on: function () { /* ... */ }
// }
// var myObject = {};
// Object.assign(myObject, EventTarget.prototype);
// myObject.emit("something");


// var receiver = {},
//     supplier = {
//       get name() {
//         return "file.js"
//       }
//     };
// Object.assign(receiver, supplier);
// var descriptor = Object.getOwnPropertyDescriptor(receiver, "name");
// console.log(descriptor.value);
// console.log(descriptor.get);


// var obj = {
//   a: 1,
//   0: 1,
//   c: 1,
//   2: 1,
//   b: 1,
//   1: 1
// }
// obj.d = 1;
// console.log(Object.getOwnPropertyNames(obj).join(""));



// let person = {
//   getGreeting () {
//     return "hello";
//   }
// };
// let dog = {
//   getGreeting () {
//     return "Worf";
//   }
// };
// // 以person为原型
// let firend = Object.create(person);
// console.log(firend.getGreeting());
// console.log(Object.getPrototypeOf(firend) === person);
// // 将原型设置为dog
// Object.setPrototypeOf(firend, dog);
// console.log(firend.getGreeting());
// console.log(Object.getPrototypeOf(firend) === dog);



// let person = {
//   getGreeting () {
//     return "hello";
//   }
// };
// let dog = {
//   getGreeting () {
//     return "Worf";
//   }
// };
// let firend = {
//   getGreeting () {
//     return super.getGreeting(this) + ", hi";
//   }
// };
// // 将原型设置为person
// Object.setPrototypeOf(firend, person);
// console.log(firend.getGreeting());
// console.log(Object.getPrototypeOf(firend) === person);
// // 将原型设置为dog
// Object.setPrototypeOf(firend, dog);
// console.log(firend.getGreeting());
// console.log(Object.getPrototypeOf(firend) === dog);


// let person = {
//   getGreeting () {
//     return "hello";
//   }
// };
// let friend = {
//   getGreeting () {
//     return super.getGreeting(this) + ", hi";
//   }
// };
// Object.setPrototypeOf(friend, person);  
// let realtive = Object.create(friend);
// console.log(person.getGreeting());
// console.log(friend.getGreeting());
// console.log(realtive.getGreeting());


// let node = {
//   type: "Feng",
//   name: "foo"
// };
// let type = "FENG";
// let name = 5;
// ({ type , name } = node);
// console.log(type);
// console.log(name);

// let node = {
//   type: "Feng",
//   name: "foo"
// };
// let { type: localType, name: localName } = node;
// console.log(localType);
// console.log(localName);


// let node = {
//   type: "Feng"
// };
// let { type: localType, name: localName = "bar" } = node;
// console.log(localType);
// console.log(localName);

// let node = {
//   type: "feng",
//   name: "foo",
//   loc: {
//     start: {
//       line: 1,
//       column: 1
//     },
//     end: {
//       line: 1,
//       column: 4
//     }
//   }
// };
// let { loc: { start: localStart } } = node;
// console.log(localStart.line);
// console.log(localStart.column);

// let colors = ['red', 'green', 'blue'];
// let [ firstColor, secondColor ] = colors;
// console.log(firstColor);
// console.log(secondColor);


// let colors = ['red', 'green', 'blue'];
// let [ , , thirdColor ] = colors;
// console.log(thirdColor);

// let colors = ['red', 'green', 'blue'];
// let firstColor = "black";
// let secondColor = "yellow";
// [ firstColor, secondColor ] = colors;
// console.log(firstColor);
// console.log(secondColor);


// let a = 1;
// let b = 5;
// [ a, b ] = [ b, a ];
// console.log(a);
// console.log(b);


// let colors = ['red'];
// let [ firstColor, secondColor = "green" ] = colors;
// console.log(firstColor);
// console.log(secondColor);


// let colors = ['red', [ 'green', 'lightgreen' ], 'blue'];
// let [ firstColor, secondColor ] = colors;
// console.log(firstColor);
// console.log(secondColor);


// let colors = ['red', [ 'green', 'lightgreen' ], 'blue'];
// let [ firstColor, ...restColors ] = colors;
// console.log(firstColor);
// console.log(restColors.length);
// console.log(restColors[0]);
// console.log(restColors[1]);

// let colors = ['red', 'green', 'blue'];
// let [ ...clonedColors ] = colors;
// console.log(clonedColors);

// function myObject() {}
// Object.defineProperty(myObject, Symbol.hasInstance, {
//   value: function (v) {
//     return false;
//   }
// });
// let obj = new myObject();
// console.log(obj instanceof myObject);

// let collection = {
//   0: 'hello',
//   1: 'feng',
//   length: 2,
//   [Symbol.isConcatSpreadable]: false
// }
// let message = ["Hi"].concat(collection);
// console.log(message.length);
// console.log(message);

// function Person(name) {
//   this.name = name;
// }
// Person.prototype[Symbol.toStringTag] = "Person";
// Person.prototype.toString = function () {
//   return this.name;
// }
// var me = new Person("feng");
// console.log(me.toString());
// console.log(Object.prototype.toString.call(me));

// var set = Object.create(null);
// set.foo = true;
// if (set.foo) {
//   console.log('....')
// }

// let set = new Set();
// set.add(5);
// set.add("5");
// console.log(set.size);

// let set = new Set();
// set.add(5);
// set.add("5");
// set.add(5);
// console.log(set.size);


// let set = new Set([1, 2, 3, 4, 5, 5, 5]);
// console.log(set.size);


// let set = new Set();
// set.add(5);
// set.add("5");
// console.log(set.has(5));
// set.delete(5);
// console.log(set.has(5));
// console.log(set.size);
// set.clear();
// console.log(set.size);

// let set = new Set([1, 2]);
// set.forEach(function (value, key, ownerSet) {
//   console.log(key + "  " + value);
//   console.log(ownerSet === set);
// })

// let set = new Set([1, 2]);
// let processor = {
//   output(value) {
//     console.log(value);
//   },
//   process(dataSet) {
//     dataSet.forEach(function(value) {
//       this.output(value)
//     }, this);
//   }
// };
// processor.process(set);

// let set = new Set([1, 2, 3, 4, 5, 4, 5, 5]);
// let array = [...set];
// console.log(array);


// function eliminateDuplicates(items) {
//   return [...new Set(items)];
// }
// let numbers = [1, 2, 3, 3, 3, 4, 4, 5, 5, 5];
// let noDuplicates = eliminateDuplicates(numbers);
// console.log(noDuplicates);

// let set = new WeakSet();
// let key = {};
// set.add(key);
// console.log(set.has(key));
// set.delete(key);
// console.log(set.has(key));

// let map = new Map();
// map.set("title", "fengzhizi");
// map.set("year", 2018);
// console.log(map.get("title"));
// console.log(map.get("year"));


// let map = new Map(),
//     key1 = {},
//     key2 = {};
// map.set(key1, 5);
// map.set(key2, 66);
// console.log(map.get(key1));
// console.log(map.get(key2));


let map = new Map([["name", "fengzhizi"], ["year", 2018]]);
map.forEach(function (value, key, ownerMap) {
  console.log(key + "  " + value);
  console.log(ownerMap === map);
})