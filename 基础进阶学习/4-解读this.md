### 结论

**this的指向，是在函数被调用的时候确定的**，也就是说，在执行上下文被创建时确定的。

```js
var a = 10;
var obj = {
  a: 20;
}
function fn () {
  console.log(this.a);
}
fn(); // 10
fn.call(obj); // 20
```