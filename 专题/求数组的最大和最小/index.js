// console.log(Math.max(true, 0));
// console.log(Math.max(true, '2', null));
// console.log(Math.max(1, undefined));
// console.log(Math.max(1, {}));

// var min = Math.min();
// var max = Math.max();
// console.log(min > max);

// var arr = [6, 4, 1, 8, 2, 11, 23];
// var result = arr[0];
// for (var i = 1; i < arr.length; i++) {
//   result = Math.max(result, arr[i]);
// }
// console.log(result);

// var arr = [6, 4, 1, 8, 2, 11, 23];
// function max(prev, next, index) {
//   console.log("执行了第", index, "次,next的值是", next, ",prev的值是", prev)
//   return Math.max(prev, next);
// }
// console.log(arr.reduce(max));

// var arr = [6, 4, 1, 8, 2, 11, 23];
// arr.sort(function (a, b) {
//   return a - b;
// });
// console.log(arr[arr.length - 1]);


// var arr = [6, 4, 1, 8, 2, 11, 23];
// console.log(Math.max.apply(null, arr));

var arr = [6, 4, 1, 8, 2, 11, 23];
console.log(Math.max(...arr));