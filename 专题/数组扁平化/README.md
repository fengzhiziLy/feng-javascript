#### 扁平化

数组的扁平化，就是将一个嵌套多层的数组array(嵌套可以是任何层数)转换为只有一层的数组

假设有个flatten的函数可以做到数组扁平化，效果如下：

```js
var arr = [1, [2, [3, 4]]];
console.log(flatten(arr)); // [1, 2, 3, 4]
```

#### 递归

循环数组元素，如果还是一个数组，就递归调用该方法

```js
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result;
}
console.log(flatten(arr));
```

#### toString

> 如果数组的元素都是数字，可以考虑使用`toString`方法

```js
console.log([1, [2, [3, 4]]].toString()); // "1, 2, 3, 4"
```

```js
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
  return arr.toString().split(',').map(function(item) {
    return +item
  })
}
console.log(flatten(arr));
```

#### reduce

```js
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
  return arr.reduce(function(prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}
console.log(flatten(arr));
```

#### ...

ES6 增加了扩展运算符，用于取出参数对象的所有可遍历属性，拷贝到当前对象之中：

```js
var arr = [1, [2, [3, 4]]];
console.log([].concat(...arr));   // [ 1, 2, [ 3, 4 ] ]
```

```js
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr;
}
console.log(flatten(arr));
```