#### ES5中的Set与Map集合

Set集合是一种无重复元素的列表，通常的做法是检测给定的值在某个集合中是否存在；
Map集合内含多组键值对，经常被用于缓存频繁取用的数据。

```js
var set = Object.create(null);
set.foo = true;
// 检查属性是否存在
if (set.foo) {
  console.log('....')
}

var map = Object.create(null);
map.foo = "bar";
// 获取已存值
var value = map.foo;
console.log(value)
```


#### Set集合

在Set集合中，**不会对所存值进行强制类型判断**。
唯一的例外：**Set集合中的+0与-0被认为是相等的**。

```js
let set = new Set();
set.add(5);
set.add("5");
console.log(set.size);    // 2
```

```js
let set = new Set(),
    key1 = {},
    key2 = {};
set.add(key1);
set.add(key2);
console.log(set.size);
```

如果多次调用add()方法并传入相同的值作为参数，则后续的调用实际上会被忽略。

```js
let set = new Set();
set.add(5);
set.add("5");
set.add(5);               // 会被忽略
console.log(set.size);    // 2
```

也可以使用数组来初始化Set集合，Set构造函数会过滤掉重复的值从而保证集合中的元素各自唯一。

```js
let set = new Set([1, 2, 3, 4, 5, 5, 5]);
console.log(set.size);      // 5
```

```js
let set = new Set();
set.add(5);
set.add("5");
console.log(set.has(5));    // true
set.delete(5);
console.log(set.has(5));    // false
console.log(set.size);      // 1
set.clear();
console.log(set.size);      // 0
```

Set集合的forEach()方法，回调函数接受一下3个参数：
1. Set集合中下一次索引的位置
2. 与第一个参数一样的值     --- Set集合中没有键名
3. 被遍历的Set集合本身

```js
let set = new Set([1, 2]);
set.forEach(function (value, key, ownerSet) {
  console.log(key + "  " + value);
  console.log(ownerSet === set);
})
// 1  1
// true
// 2  2
// true
```

如果需要在回调函数中使用this引用，则可以将它作为第二个参数传入forEach()函数

```js
let set = new Set([1, 2]);
let processor = {
  output(value) {
    console.log(value);
  },
  process(dataSet) {
    dataSet.forEach(function(value) {
      this.output(value)
    }, this);
  }
};
processor.process(set);
// 1
// 2
// 可是使用箭头函数
let processor = {
  output(value) {
    console.log(value);
  },
  process(dataSet) {
    dataSet.forEach(value => this.output(value));
  }
};
```

不能像访问数组元素那样直接通过索引访问集合中的对象，必须先将Set集合转换为数组。

```js
let set = new Set([1, 2, 3, 4, 5, 4, 5, 5]);
let array = [...set];
console.log(array);   // [ 1, 2, 3, 4, 5 ]
```

如果已创建了一个数组，想要复制它并创建一个无重复的数组，上述方法非常有用：

```js
function eliminateDuplicates(items) {
  return [...new Set(items)];
}
let numbers = [1, 2, 3, 3, 3, 4, 4, 5, 5, 5];
let noDuplicates = eliminateDuplicates(numbers);
console.log(noDuplicates);    // [ 1, 2, 3, 4, 5 ]
```

#### Weak Set集合

Weak Set集合只存储对象的弱引用，并且不可以存储原始值，集合中的弱引用如果是对象唯一的引用，则会被回收并释放相应内存。

```js
let set = new WeakSet();
let key = {};
set.add(key);
console.log(set.has(key));      // true
set.delete(key);
console.log(set.has(key));      // false
```

```js
let set = new WeakSet();
let key = {};
set.add(key);
console.log(set.has(key));      // true
key = null;
```

#### Map集合

Map类型是一种存储着许多键值对的有序列表，其中的键名和对应的值支持所有的数据类型。键名的等价判断是通过调用`Object.is()`方法来实现的。

```js
let map = new Map();
map.set("title", "fengzhizi");
map.set("year", 2018);
console.log(map.get("title"));    // fengzhizi
console.log(map.get("year"));     // 2018
```

在对象中，无法用对象作为对象属性的键名，但在Map集合中，却可以。

> 这样，不需要修改对象本身就可以为其添加一些附加信息

```js
let map = new Map(),
    key1 = {},
    key2 = {};
map.set(key1, 5);
map.set(key2, 66);
console.log(map.get(key1));
console.log(map.get(key2));
```

```js
let map = new Map([["name", "fengzhizi"], ["year", 2018]]);
map.forEach(function (value, key, ownerMap) {
  console.log(key + "  " + value);
  console.log(ownerMap === map);
});
// name  fengzhizi
// true
// year  2018
// true
```