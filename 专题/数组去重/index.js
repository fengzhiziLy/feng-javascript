// var array = [1, 1, "1", "1"];
// function unique(array) {
//   // res用来存储结果
//   var res = [];
//   for(var i = 0, arrayLen = array.length; i < arrayLen; i++) {
//     for (var j = 0, resLen = res.length; j < resLen; j++) {
//       if (array[i] === res[j]) {
//         break;
//       }
//     }
//     // 如果array[i]是唯一的，执行完循环，j等于resLen
//     if (j === resLen) {
//       res.push(array[i])
//     }
//   }
//   return res;
// }
// console.log(unique(array));

// var array = [1, 1, "1"];
// function unique(array) {
//   var res = [];
//   for (var i = 0, len = array.length; i < len; i++) {
//     var current = array[i];
//     if (res.indexOf(current) === -1) {
//       res.push(current);
//     }
//   }
//   return res;
// }
// console.log(unique(array));

// var array = [1, 1, "1", 2];
// function unique(array) {
//   var res = [];
//   var sortedArray = array.concat().sort();
//   var seen;
//   for (var i = 0, len = sortedArray.length; i < len; i++) {
//     // 如果是第一个元素或者相邻的元素不相同
//     if (!i || seen !== sortedArray[i]) {
//       res.push(sortedArray[i])
//     }
//     seen = sortedArray[i];
//   }
//   return res;
// }
// console.log(unique(array));

// var array1 = [1, 2, '1', 2, 1];
// var array2 = [1, 1, '1', 2, 2];
// function unique(array, isSorted) {
//   var res = [];
//   var seen = [];
//   for (var i = 0, len = array.length; i < len; i++) {
//     var value = array[i];
//     if (isSorted) {
//       if (!i || seen !== value) {
//         res.push(value);
//       }
//       seen = value;
//     } else if (res.indexOf(value) === -1) {
//       res.push(value);
//     }
//   }
//   return res;
// }
// console.log(unique(array1));
// console.log(unique(array2, true));

// var array = [1, 1, 'a', 'A', 2, 2];
// function unique(array, isSorted, iteratee) {
//   var res = [];
//   var seen = [];
//   for (var i = 0, len = array.length; i < len; i++) {
//     var value = array[i];
//     var computed = iteratee ? iteratee(value, i, array) : value;
//     if (isSorted) {
//       if (!i || seen !== computed) {
//         res.push(value)
//       }
//       seen = computed;
//     } else if (iteratee) {
//       if (seen.indexOf(computed) === -1) {
//         seen.push(computed);
//         res.push(value)
//       }
//     } else if (res.indexOf(value) === -1) {
//       res.push(value);
//     }
//   }
//   return res;
// }
// console.log(unique(array, false, function(item){
//     return typeof item == 'string' ? item.toLowerCase() : item
// }));

// var array = [1, 2, 1, 1, '1'];
// function unique(array) {
//   var res = array.filter(function(item, index, array){
//     return array.indexOf(item) === index;
//   })
//   return res;
// }
// console.log(unique(array));


// var array = [1, 2, 1, 1, "1"];
// function unique(array) {
//   return array.concat().sort().filter(function (item, index, array) {
//     return !index || item !== array[index - 1];
//   })
// }
// console.log(unique(array));

// var array = [1, 2, 1, 1, "1"];
// function unique(array) {
//   var obj = {};
//   return array.filter(function(item, index, array) {
//     // return obj.hasOwnProperty(item) ? false : (obj[item] = true);
//     return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
//   })
// }
// console.log(unique(array));

// var array = [{value: 1}, {value: 1}, {value: 2}];
// function unique(array) {
//   var obj = {};
//   return array.filter(function(item, index, array) {
//     console.log(typeof item + JSON.stringify(item));
//     // JSON.stringify目的: 为了防止对象出现这种情况"object[object Object]", 所以使用了这个函数先转换成字符串, 不调用toSting
//     return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
//   })
// }
// console.log(unique(array));


var array = [1, 2, 1, 1, "1"];
function unique(arr) {
  let seen = new Map();
  return arr.filter((a) => !seen.has(a) && seen.set(a, 1));
}
console.log(unique(array));