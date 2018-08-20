#### 定义

柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

例子：

```js
function add (a, b) {
  return a + b;
}
// 执行add函数，一次传入两个参数
add(1, 2); // 3
// 假设有一个curry函数可以做到柯里化
var addCurry = curry(add);
addCurry(1)(2); // 3
```

#### 用途

例子：

```js
function ajax (type, url, data) {
  var xhr = new XMLHttpRequest();
  xhr.open(type, url, true);
  xhr.send(data);
}
//  虽然 ajax 这个函数非常通用，但在重复调用的时候参数冗余
ajax('POST', 'www.test.com', 'name=feng');
ajax('POST', 'www.test2.com', 'name=feng');
ajax('POST', 'www.test3.com', 'name=feng');
// 利用curry
var ajaxCurry = curry(ajax);
// 以POST类型请求数据
var post = ajaxCurry('POST');
post('www.test.com', 'name=feng');
// 以 POST 类型请求来自于 www.test.com 的数据
var postFromTest = post('www.test.com');
postFromTest("name=feng");
```


