// function isBigEnough(element) {
//   return element >= 15;
// }
// console.log([12, 5, 8, 130, 55].findIndex(isBigEnough));


// function findIndex(array, predicate, context) {
//   for (var i = 0; i < array.length; i++) {
//     if (predicate.call(context, array[i], i, array)) return i;
//   }
//   return -1;
// }
// console.log(findIndex([1, 2, 3, 4], function(item, i, array) {
//   if (item === 3) return true;
// }))

// function createIndexFinder (dir) {
//   return function(array, predicate, context) {
//     var length = array.length;
//     var index = dir > 0 ? 0 : length - 1;
//     for (; index >= 0 && index < length; index += dir) {
//       if (predicate.call(context, array[index], index, array)) return index;
//     }
//     return -1;
//   }
// }
// var findIndex = createIndexFinder(1);
// var findLastIndex = createIndexFinder(-1);
// console.log(findIndex([1, 2, 3, 4], function(item, i, array) {
//   if (item === 3) return true;
// }))
// console.log(findLastIndex([1, 2, 3, 4], function(item, i, array) {
//   if (item === 1) return true;
// }))


// function sortedIndex(array, obj) {
//   var low = 0, high = array.length;
//   while (low < high) {
//     var mid = Math.floor((low + high) / 2)
//     if (array[mid] < obj) low = mid + 1;
//     else high = mid;
//   }
//   return high;
// }
// console.log(sortedIndex([10, 20, 30, 40, 50], 35));


// function cb (func, context) {
//   if (context === void 0) return func;
//   return function () {
//     return func.apply(context, arguments);
//   }
// }
// function sortedIndex(array, obj, iteratee, context) {
//   iteratee = cb(iteratee, context);
//   var low = 0, high = array.length;
//   while (low < high) {
//     var mid = Math.floor((low + high) / 2);
//     if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
//     else high = mid;
//   }
//   return high;
// }
// var stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];
// var result = sortedIndex(stooges, {name: 'stooge3', age: 20}, function(stooge){
//   return stooge.age
// })
// console.log(result);


// function createIndexOfFinder(dir) {
//   return function (array, item) {
//     var length = array.length;
//     var index = dir > 0 ? 0 : length - 1;
//     for (; index >= 0 && index < length; index += dir) {
//       if (array[index] === item) return index;
//     }
//     return -1;
//   }
// }
// var indexOf = createIndexOfFinder(1);
// var lastIndexOf = createIndexOfFinder(-1);
// var result = indexOf([1, 2, 3, 4, 5], 2);
// console.log(result);


// function createIndexOfFinder(dir) {
//   return function(array, item, idx) {
//     var length = array.length;
//     var i = 0;
//     if (typeof idx == "number") {
//       if (dir > 0) {
//         i = idx >= 0 ? idx : Math.max(length + idx, 0);
//       } else {
//         length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
//       }
//     }
//     for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx <length; idx += dir) {
//       if (array[idx] === item) return idx;
//     }
//     return -1;
//   }
// }
// var indexOf = createIndexOfFinder(1);
// var lastIndexOf = createIndexOfFinder(-1);
// var result = indexOf([1, 2, 3, 4, 5], 2);
// console.log(result);


function createIndexOfFinder(dir, predicate, sortedIndex) {
  return function (array, item, idx) {
    var length = array.length;
    var i = 0;
    if (typeof idx == "number") {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(length + idx, 0);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      // 如果该插入的位置的值正好等于元素的值，说明是第一个符合要求的值
      return array[idx] === item ? idx : -1;
    }
    // 判断是否是 NaN
    if (item !== item) {
      idx = predicate(array.slice(i, length), isNaN)
      return idx >= 0 ? idx + i : -1;
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  }
}
var indexOf = createIndexOfFinder(1, findIndex, sortedIndex);
var lastIndexOf = createIndexOfFinder(-1, findLastIndex);