#### ES6之findIndex

`findIndex`会返回数组中满足提供的函数的第一个元素的索引，否则返回-1

```js
function isBigEnough(element) {
  return element >= 15;
}
[12, 5, 8, 130, 55].findIndex(isBigEnough);   // 3
```

#### 实现findIndex

遍历一遍，返回符合要求的值即可

```js
function findIndex(array, predicate, context) {
  for (var i = 0; i < array.length; i++) {
    if (predicate.call(context, array[i], i, array)) return i;
  }
  return -1;
}
console.log(findIndex([1, 2, 3, 4], function(item, i, array) {
  if (item === 3) return true;
})) // 2
```

#### findLastIndex

```js
function findLastIndex(array, predicate, context) {
  var length = array.length;
  for (var i = length -1; i >= 0; i--) {
    if (predicate.call(context, array[i], i, array)) return i;
  }
  return -1;
}
console.log(findLastIndex([1, 2, 3, 4], function(item, i, array) {
  if (item === 1) return true;
}));    // 0
```

#### createIndexFinder

findLastIndex与findIndex有很多重复的地方，要精简冗余的内容

`underscore`的思路就是利用传参的不同，返回不同的函数

```js
function createIndexFinder (dir) {
  return function(array, predicate, context) {
    var length = array.length;
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (predicate.call(context, array[index], index, array)) return index;
    }
    return -1;
  }
}
var findIndex = createIndexFinder(1);
var findLastIndex = createIndexFinder(-1);
```

#### sortedIndex

假设这样：在一个排好序的数组中找到 value 对应的位置，保证插入数组后，依然保持有序的状态

效果为：

```js
sortedIndex([10, 20, 30], 25); // 2
```

由于是有序的数组，不需要遍历，可以使用二分查找法，确定值的位置

```js
function sortedIndex(array, obj) {
  var low = 0, high = array.length;
  while (low < high) {
    var mid = Math.floor((low + high) / 2)
    if (array[mid] < obj) low = mid + 1;
    else high = mid;
  }
  return high;
}
console.log(sortedIndex([10, 20, 30, 40, 50], 35));   // 3
```

上面的通用性不够，比如希望处理这样的情况：

```js
var stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];
var result = sortedIndex(stooges, {name: 'stooge3', age: 20}, function(stooge){
  return stooge.age
})
console.log(result);   // 1
```

所以还需要加上一个参数`iteratee`函数对数组的每一个元素进行处理，一般这个时候，还需要确定this的指向，故需要再传一个`context`可以指定this

```js
function cb (func, context) {
  if (context === void 0) return func;
  return function () {
    return func.apply(context, arguments);
  }
}
function sortedIndex(array, obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  var low = 0, high = array.length;
  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
    else high = mid;
  }
  return high;
}
```