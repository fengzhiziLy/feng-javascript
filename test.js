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
for(var i = 1; i <= 5; i++) {
  (function(i) {
    setTimeout(function timer() {
      console.log(i)
    }, i * 1000)
  })(i)
}