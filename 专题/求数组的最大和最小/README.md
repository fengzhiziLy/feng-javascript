### 取出数组中的最大值或最小值

#### Math.max

```js
Math.max([value1, value2, ...])
```

注意：
1. 如果有任一参数不能被转换为数值，则结果为`NaN`
2. max是`Math`的静态方法，所以应该像这样使用：`Math.max()`，而不是作为`Math`实例的方法 (简单的来说，就是不使用`new`)
3. 如果没有参数，则结果为`-Infinity`

需要分析的是：
1. 如果有任一参数不能被转换为数值，就意味着如果参数可以被转换为数字，就是可以比较的：

```js
Math.max(true, 0);          // 1
Math.max(true, '2', null);  // 2
Math.max(1, undefined);     // NaN
Math.max(1, {});            // NaN
```

2. 如果没有参数，则结果为`-Infinity`，对应的，`Math.min`函数，如果没有参数，则结果为`Infinity`

```js
var min = Math.min();
var max = Math.max();
console.log(min > max);   // true
```

#### 原始方法

循环遍历一遍

```js
var arr = [6, 4, 1, 8, 2, 11, 23];
var result = arr[0];
for (var i = 1; i < arr.length; i++) {
  result = Math.max(result, arr[i]);
}
console.log(result);    // 23
```

#### reduce

> 归并操作，总共两个参数，第一个是函数，可以理解为累加器，遍历数组累加回传的返回值，第二个是初始数值。如果没有提供初始值，则将使用数组中的第一个元素

```js
var arr = [6, 4, 1, 8, 2, 11, 23];
function max(prev, next) {
  return Math.max(prev, next);
}
console.log(arr.reduce(max));
```