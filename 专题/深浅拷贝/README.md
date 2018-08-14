#### 数组的浅拷贝

> 可以利用数组的一些方法：`slice`、`concat`返回一个新数组的特性实现数组拷贝

```js
var arr = ['old', 1, true, null, undefined];
var new_arr = arr.concat();
// var new_arr = arr.slice();
new_arr[0] = 'new';
console.log(arr);       // [ 'old', 1, true, null, undefined ]
console.log(new_arr);   // [ 'new', 1, true, null, undefined ]
```

如果数组嵌套了数组或对象

```js
var arr = [{old: 'old'}, ['old']];
var new_arr = arr.concat();
new_arr[0].old = 'new';
new_arr[1][0] = 'new';
console.log(arr);      // [ { old: 'new' }, [ 'new' ] ]
console.log(new_arr);  // [ { old: 'new' }, [ 'new' ] ]
```

如果数组元素是基本类型，就会拷贝一份，互不影响
而如果是对象或者数组，就会只拷贝对象和数组的引用，这样我们无论在新旧数组进行了修改，两者都会发生变化.
这种复制引用的拷贝方法称之为浅拷贝
使用`concat`和`slice`是一种浅拷贝

深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个

#### 数组的深拷贝

```js
var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}];
var new_arr = JSON.parse(JSON.stringify(arr));
new_arr[0] = 'new';
console.log(arr);       // [ 'old', 1, true, [ 'old1', 'old2' ], { old: 1 } ]
console.log(new_arr);   // [ 'new', 1, true, [ 'old1', 'old2' ], { old: 1 } ]
```

上述方法有一个问题，**就是不能拷贝函数**

```js
var arr = [function () {
  console.log(a)
}, {
  b: function () {
    console.log(b)
  }
}]
var new_arr = JSON.parse(JSON.stringify(arr));
console.log(new_arr);   // [null, {}]
```

#### 浅拷贝的实现

思路：遍历对象，把属性和属性值放在一个新对象

```js
var shallowCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceOf Array ? [] : {};
  // 遍历obj，并且判断obj的属性才拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
```

#### 深拷贝的实现

```js
var deepCopy = function (obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}
```

尽管使用深拷贝会完全的克隆一个新对象，不会产生副作用，但是深拷贝因为使用递归，性能会不如浅拷贝