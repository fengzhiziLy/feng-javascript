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

在函数执行过程中，this一旦被确定，就不可更改了。

```js
var a = 10;
var obj = {
  a: 20;
}
function fn () {
  this = obj;  // 这句话试图修改this，运行后会报错
  console.log(this.a);
}
fn();
```

#### 全局对象中的this

全局对象中的this，指向它本身。

```js
// 通过this绑定到全局
this.a1 = 20;
// 通过声明绑定到变量对象，但在全局环境中，变量对象就是它自身
var a2 = 10;
// 仅仅只有赋值操作，标识符会隐式绑定到全局变量
a3 = 30;
console.log(a1, a2, a3);
```

#### 函数中的this

```js
var a = 20;
function fn () {
  console.log(this.a);  // 20
}
fn();
```

```js
var a = 20;
function fn () {
  function foo () {
    console.log(this.a);  // 20
  }
  foo();
}
fn();
```

```js
var a = 20;
var obj = {
  a: 10,
  c: this.a + 20,
  fn: function () {
    return this.a;
  }
}
console.log(obj.c);       // 40
console.log(obj.fn());    // 10
// 在对象中的c属性使用this.a + 20的时候，单独的{}是不会形成新的作用域的，因此这里的this.a，由于没有作用域的限制，仍然处在全局作用域中，所以这里的this指向的window对象。
```

结论：
在一个函数上下文中，this由调用者提供，由调用函数的方式来决定。
**如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的this指向该对象**。
**如果函数独立调用，那么该函数内部的this，则指向undefined**，但在非严格模式下，当this指向undefined时，它会被自动指向全局对象。

从结论中可以看出，要想准确确定this指向，**找到函数的调用者以及区分它是否是独立调用就很关键**。

```js
function fn () {
  'use strict';
  console.log(this);
}
fn();         // undefined // fn是调用者，独立调用
window.fn();  // Window // fn是调用者，被window所拥有
```

fn()作为独立调用者，它内部的this指向就为undefined。而window.fn()则因为fn被window所拥有，内部的this就指向了window对象。

```js
'use strict';
var a = 20;
function foo () {
  var a = 1;
  var obj = {
    a: 10,
    c: this.a + 20,
    fn: function () {
      return this.a;
    }
  }
  return obj.c;
}
console.log(foo()); // VM2623:7 Uncaught TypeError: Cannot read property 'a' of undefined
console.log(window.foo()); // 40
```

{}不会产生新的作用域，它里面的this是指向全局的，严格模式下是undefined，非严格模式下为window。foo()执行完返回的是this.a + 20，其中obj.c不产生新的作用域，在这里this为undefined，故就是undefined.a + 20，所以程序报错。

```js
var a = 20;
var foo = {
  a: 10,
  getA: function () {
    return this.a;
  }
}
console.log(foo.getA());    // 10
var test = foo.getA;
console.log(test());        // 20
```

在这个例子中，getA是调用者，被对象foo所拥有，因此它的this指向了foo。而test()作为调用者，尽管它与foo.getA的引用相同，但是它是独立调用的，因此this指向undefined，在非严格模式下，自动转向全局window。

```js
var a = 20;
function getA () {
  return this.a;
}
var foo = {
  a: 10,
  getA: getA
}
console.log(foo.getA());    // 10
```

```js
function foo () {
  console.log(this.a)
}
function active(fn) {
  fn(); 
}
var a = 20;
var obj = {
  a: 10,
  getA: foo
}
active(obj.getA);  // 20
```