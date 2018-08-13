#### 双层循环

```js
var array = [1, 1, "1", "1"];
function unique(array) {
  // res用来存储结果
  var res = [];
  for(var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {
        break;
      }
    }
    // 如果array[i]是唯一的，执行完循环，j等于resLen
    if (j === resLen) {
      res.push(array[i])
    }
  }
  return res;
}
console.log(unique(array));
```

#### indexOf

> indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
> indexOf() 方法可返回数组中某个指定的元素位置。
> 该方法将从头到尾地检索数组，看它是否含有对应的元素。开始检索的位置在数组 start 处或数组的开头（没有指定 start 参数时）。如果找到一个 item，则返回 item 的第一次出现的位置。开始位置的索引为 0。
> 如果在数组中没找到指定元素则返回 -1

```js
var array = [1, 1, "1"];
function unique(array) {
  var res = [];
  for (var i = 0, len = array.length; i < len; i++) {
    var current = array[i];
    // 如果在结果数组res中没有找到current,则把current压入结果数组res中
    if (res.indexOf(current) === -1) {
      res.push(current);
    }
  }
  return res;
}
console.log(unique(array));
```

#### 排序后去重

先将要去重的数组使用`sort`方法排序后，相同的值就会被排在一起，然后就可以只判断当前元素与上一个元素是否相同，相同就说明重复，不相同就添加进`res`

> concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本
> sort() 方法用于对数组的元素进行排序

```js
var array = [1, 1, "1"];
function unique(array) {
  var res = [];
  var sortedArray = array.concat().sort();
  var seen;
  for (var i = 0, len = sortedArray.length; i < len; i++) {
    // 如果是第一个元素或者相邻的元素不相同
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i])
    }
    seen = sortedArray[i];
  }
  return res;
}
console.log(unique(array));
```

#### unique API

可以去尝试写一个名为`unique`的工具函数，根据一个参数`isSorted`判断传入的数组是否是已排序的，如果为`true`，就判断相邻元素是否相同，如果为`false`，就使用`indexOf`进行判断

```js
var array1 = [1, 2, '1', 2, 1];
var array2 = [1, 1, '1', 2, 2];
function unique(array, isSorted) {
  var res = [];
  var seen = [];
  for (var i = 0, len = array.length; i < len; i++) {
    var value = array[i];
    if (isSorted) {
      if (!i || seen !== value) {
        res.push(value);
      }
      seen = value;
    } else if (res.indexOf(value) === -1) {
      res.push(value);
    }
  }
  return res;
}
console.log(unique(array1));
console.log(unique(array2, true));
```

#### 优化

需求：字母的大小写视为一致

```js
var array = [1, 1, 'a', 'A', 2, 2];
function unique(array, isSorted, iteratee) {
  var res = [];
  var seen = [];
  for (var i = 0, len = array.length; i < len; i++) {
    var value = array[i];
    var computed = iteratee ? iteratee(value, i, array) : value;
    if (isSorted) {
      if (!i || seen !== computed) {
        res.push(value)
      }
      seen = computed;
    } else if (iteratee) {
      if (seen.indexOf(computed) === -1) {
        seen.push(computed);
        res.push(value)
      }
    } else if (res.indexOf(value) === -1) {
      res.push(value);
    }
  }
  return res;
}
console.log(unique(array, false, function(item){
    return typeof item == 'string' ? item.toLowerCase() : item
}));
```

#### filter

> filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素

比如：filter + indexOf

```js
var array = [1, 2, 1, 1, '1'];
function unique(array) {
  var res = array.filter(function(item, index, array){
    return array.indexOf(item) === index;
  })
  return res;
}
console.log(unique(array));
```

sort() + filter

```js
var array = [1, 2, 1, 1, "1"];
function unique(array) {
  return array.concat().sort().filter(function (item, index, array) {
    return !index || item !== array[index - 1];
  })
}
console.log(unique(array));
```

#### Object键值对

利用一个空的`Object`对象，把数组的值存成`Object`的`key`值，比如`Object[value1] = true`，在判断另一个值的时候，如果`Object[value2]`存在的话，就说明该值是重复的

```js
var array = [1, 2, 1, 1, "1"];
function unique(array) {
  var obj = {};
  return array.filter(function(item, index, array) {
    // return obj.hasOwnProperty(item) ? false : (obj[item] = true);
    // typeof 操作符来检测变量的数据类型, 为了防止1和'1', 这种被类型转换, 造成丢失
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
  })
}
console.log(unique(array));
```

```js
var array = [{value: 1}, {value: 1}, {value: 2}];
function unique(array) {
  var obj = {};
  return array.filter(function(item, index, array) {
    console.log(typeof item + JSON.stringify(item));
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
  })
}
console.log(unique(array));
```

#### ES6

```js
var array = [1, 2, 1, 1, "1"];
function unique(array) {
  return Array.from(new Set(array));
}
console.log(unique(array));
```

```js
var array = [1, 2, 1, 1, "1"];
function unique(array) {
  return [...new Set(array)];
}
console.log(unique(array));
```

```js
var array = [1, 2, 1, 1, "1"];
var unique = (a) => [...new Set(a)];
console.log(unique(array));
```

```js
function unique(arr) {
  const seen = new Map();
  //过滤条件是，如果res中没有某个键，就设置这个键的值为1
  return arr.filter((a) => !seen.has(a) && seen.set(a, 1));
}
```

```js
Array.prototype.unique = function () {
  const newArray = [];
  const tmp = new Map();
  for(let i = 0; i < this.length; i++){
    if(!tmp.get(this[i])){
        tmp.set(this[i], 1);
        newArray.push(this[i]);
    }
  }
  return newArray;
}
```