// var arr = [1, [2, [3, 4]]];
// function flatten(arr) {
//   var result = [];
//   for (var i = 0, len = arr.length; i < len; i++) {
//     if (Array.isArray(arr[i])) {
//       result = result.concat(flatten(arr[i]))
//     } else {
//       result.push(arr[i])
//     }
//   }
//   return result;
// }
// console.log(flatten(arr));

// console.log([1, [2, [3, 4]]].toString())

// var arr = [1, [2, [3, 4]]];
// function flatten(arr) {
//   return arr.toString().split(',').map(function(item) {
//     return +item
//   })
// }
// console.log(flatten(arr));


// var arr = [1, [2, [3, 4]]];
// function flatten(arr) {
//   return arr.reduce(function(prev, next) {
//     return prev.concat(Array.isArray(next) ? flatten(next) : next)
//   }, [])
// }
// console.log(flatten(arr));


// var arr = [1, [2, [3, 4]]];
// console.log([].concat(...arr));

var arr = [1, [2, [3, 4]]];
function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr;
}
console.log(flatten(arr));