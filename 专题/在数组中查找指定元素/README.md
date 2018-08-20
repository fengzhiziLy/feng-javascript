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

假设这样：在一个排好序的数组中找到`value`对应的位置，保证插入数组后，依然保持有序的状态

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

#### indexOf

```js
function createIndexOfFinder(dir) {
  return function (array, item) {
    var length = array.length;
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (array[index] === item) return index;
    }
    return -1;
  }
}
var indexOf = createIndexOfFinder(1);
var lastIndexOf = createIndexOfFinder(-1);
var result = indexOf([1, 2, 3, 4, 5], 2);
console.log(result);
```

#### fromIndex

`indexOf`的`fromIndex`:

> indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
> stringObject.indexOf(searchvalue,fromindex)
> 设定开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回 -1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即 -1 表示从最后一个元素开始查找，-2 表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，仍然从前向后查询数组。如果抵消后的索引值仍小于 0，则整个数组都将会被查询。其默认值为 0

`lastIndexOf`的`fromIndex`:

> 从此位置开始逆向查找。默认为数组的长度减 1，即整个数组都被查找。如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找

```js
function createIndexOfFinder(dir) {
  return function(array, item, idx) {
    var length = array.length;
    var i = 0;
    if (typeof idx == "number") {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(length + idx, 0);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx <length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  }
}
var indexOf = createIndexOfFinder(1);
var lastIndexOf = createIndexOfFinder(-1);
var result = indexOf([1, 2, 3, 4, 5], 2);
console.log(result);
```

#### 优化

在`underscore`中有两个优化，第一个是支持查找`NaN`:

因为`NaN`不全等于`NaN`，所以原生的`indexOf`并不能找出`NaN`的下标。

```js
[1, NaN].indexOf(NaN) // -1
```

如何实现这个功能：就是从数组中找到符合条件的值的下标，就是一开始写的`findIndex`的

第二个优化是支持对有序数组进行更快的二分查找：

如果`indexOf`第三个参数不传开始搜索的下标值，而是一个布尔值`true`，就认为数组是一个排好序的数组，这时候，就会采用更快的二分法进行查找

```js
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
```