// var timer = setTimeout(function () {
//   console.log('22222')
// }, 0);
// console.log('other');

// setTimeout(function () {
//   console.log(a)
// }, 0)
// var a = 10;

// console.log(b);
// console.log(fn);

// var b = 20;
// function fn () {
//   setTimeout(function () {
//     console.log('setTimeout 10ms')
//   }, 10);
// };

// fn.toString = function () {
//   return 30;
// };

// console.log(fn);

// setTimeout(function() {
//   console.log('setTimeout 20ms');
// }, 20);
// fn();

// for (var i = 1; i <= 5; i++) {
//   setTimeout(function timer() {
//     console.log(i)
//   }, i * 1000)
// }

// 在函数中闭包判定的准则：执行时是否在内部定义的函数中访问了上层作用域的变量
// for(var i = 1; i <= 5; i++) {
//   (function(i) {
//     setTimeout(function timer() {
//       console.log(i)
//     }, i * 1000)
//   })(i)
// }

// function foo () {
//   // slice() 方法可从已有的数组中返回选定的元素。
//   // var arr = Array.prototype.slice.call(arguments);
//   var arr = Array.from(arguments);
//   arr.push("bam");
//   console.log(arr)
// }
// foo("bar", "baz");

// var a = new Array(3);
// var b = [ undefined, undefined, undefined ];
// var c = [];
// c.length = 3;
// a.join("-");
// b.join("-");
// a.map(function(v, i) { return i; })
// b.map(function(v, i) { return i; })

// function fakeJoin(arr, connector) {
//   var str = "";
//   for(var i = 0; i < arr.length; i++) {
//     if (i > 0) {
//       str += connector;
//     }
//     if (arr[i] !== undefined) {
//       str += arr[i]
//     }
//   }
//   return str;
// }
// var a = new Array(3);
// fakeJoin(a, "-");

// var a = {
//   b: 42,
//   c: "42",
//   d: [1, 2, 3]
// };
// JSON.stringify(a, null, 3);


// var a  = 42;
// var b = null;
// var c = "foo";
// if(a && (b ||c)) {
//   console.log("feng");
// }

// function foo ( a = 42, b = a + 1) {
//   console.log(
//     arguments.length, a, b,
//     arguments[0], arguments[1]
//   );
// }

// function now () {
//   return 21;
// }
// function later () {
//   answer = answer * 2;
//   console.log("meaning of life:", answer);
// }
// var answer = now();
// setTimeout(later, 1000);

// var a = {
//   index: 1
// };
// console.log(a);
// a.index++;


// var p = Promise.resolve(21);
// var p2 = p.then(function (v) {
//   console.log(v);
//   return v * 2;
// });
// p2.then(function (v) {
//   console.log(v);
// });

// var p = Promise.resolve(21);
// p.then(function (v) {
//   console.log(v);
//   return v * 2;
// })
// .then(function (v) {
//   console.log(v);
// });

// var p = Promise.resolve(21);
// p.then(function (v) {
//   console.log(v);
//   return new Promise(function (resolve, reject) {
//     resolve(v * 2);
//   })
// })
// .then(function (v) {
//   console.log(v);
// });


// function delay(time) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(resolve, time);
//   })
// };
// delay(100)
// .then(function STEP2() {
//   console.log("step 2 after 100ms");
//   return delay(200)
// })
// .then(function STEP3() {
//   console.log("step 3 after another 200ms");
//   // return delay(2000)
// })
// .then(function STEP4() {
//   console.log("step 4 next job");
//   return delay(50)
// })
// .then(function STEP5() {
//   console.log("step 5 after 50ms");
// })

// var p = new Promise(function(resolve, reject) {
//   reject("Oops");
// });
// var p2 = p.then(
//   function fulfilled() {
//     // ...
//   }
// )

// var p = Promise.resolve(42);
// p.then(
//   function fulfilled(msg) {
//     console.log(msg.toLowerCase());
//   },
//   function rejected(err) {
//     //...
//   }
// )

// var p = Promise.reject("Oops");
// p.then(
//   function fulfilled(msg) {
//     // ...
//   },
//   function rejected(err) {
//     console.log(err)
//   }
// )

// var p = Promise.resolve(42);
// p.then(
//   function fulfilled(msg) {
//     console.log(msg.toLowerCase());
//   }
// ).catch(handleErrors);

var x = 1;
function *foo () {
  x++;
  yield;
  console.log("x:", x);
}
function bar () {
  x++;
}
var it = foo();
it.next();
console.log(x);
bar();
console.log(x);
it.next();