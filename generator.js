var x = 1;
function *foo () {
  x++;
  // bar();
  yield;
  console.log("x:" + x);
}
function bar() {
  x++;
}
var it = foo();
it.next();
console.log(x);
bar();
it.next();

function *foo (x, y) {
  return x * y;
}
var it = foo(6, 7);
var res = it.next();
console.log(res.value);

function *foo(x) {
  var y = x * (yield);
  return y;
}
var it = foo(6);
it.next();
var res = it.next(7);
res.value;
console.log(res);

function *foo(x) {
  var y = x * (yield "Hello");
  return y;
}
var it = foo(6);
var res = it.next();
console.log(res.value);
var res = it.next(7);
console.log(res.value);

function *foo() {
  var x = yield 2;
  z++;
  var y = yield (x * z);
  console.log(x, y, z);
}
var z = 1;
var it1 = foo();
var it2 = foo();
var val1 = it1.next().value;
console.log(val1);
var val2 = it2.next().value;
console.log(val2);
val1 = it1.next(val2 * 10).value;
console.log(val1);
val2 = it2.next(val1 * 5).value;
console.log(val2);
it1.next(val2 / 2);
it2.next(val1 / 4);

var a = 1;
var b = 2;
function *foo () {
  a++;
  yield;
  b = b * a;
  a = (yield b) + 3;
}
function *bar() {
  b--;
  yield;
  a = (yield 8) + b;
  b = a * (yield 2);
}
function step(gen) {
  var it = gen();
  var last;
  return function(){
    last = it.next(last).value;
  }
}
a = 1;
b = 2;
var s1 = step(foo);
var s2 = step(bar);
s1();
s1();
s1();
s2();
s2();
s2();
s2();
console.log(a,b);

var gimmeSomething = (function () {
  var nextVal;
  return function () {
    if (nextVal === undefined) {
      nextVal = 1;
    } else {
      nextVal = (3 * nextVal) + 6;
    }
    return nextVal;
  }
})()
console.log(gimmeSomething());
console.log(gimmeSomething());
console.log(gimmeSomething());
console.log(gimmeSomething());


var something = (function() {
  var nextVal;
  return {
    [Symbol.iterator]: function() { return this; },
    next: function () {
      if (nextVal === undefined) {
        nextVal = 1;
      } else {
        nextVal = (3 * nextVal) + 6;
      }
      return { done: false, value: nextVal };
    }
  }
})();
// console.log(something.next().value);
// console.log(something.next().value);
// console.log(something.next().value);
// console.log(something.next().value);
for (var v of something) {
  console.log(v);
  if (v > 500) {
    break;
  }
}


var a = [1, 2, 3, 4, 5];
for (var v of a) {
  console.log(v);
}

var a = [1, 2, 3, 4, 5];
var it = a[Symbol.iterator]();
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);

var sym = Symbol("some optional description");
console.log(typeof sym);
console.log(sym.toString());

var arr = [1, 2, 3];
var it = arr[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

var str = "feng";
var it = str[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

function *something() {
  var nextVal;
  while (true) {
    if (nextVal === undefined) {
      nextVal = 1;
    } else {
      nextVal = (3 * nextVal) + 6;
    }
    yield nextVal;
  }
}
for (var v of something()) {
  console.log(v);
  if (v > 500) {
    break;
  }
}

function *something(){
  try {
    var nextVal;
    while (true) {
      if (nextVal === undefined) {
        nextVal = 1;
      } else {
        nextVal = (3 * nextVal) + 6;
      }
      yield nextVal;
    }
  }
  finally {
    console.log("cleaning up!");
  }
}
var it = something();
for(var v of it) {
  console.log(v);
  if(v > 500) {
    console.log(
      it.return("hello World").value
    )
  }
}


function *foo() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}
function *bar() {
  var x = yield *foo();
  console.log("x:", x);
}
for(var v of bar()) {
  console.log(v)
}


function *foo(x){
  if (x < 3) {
    x = yield *foo(x + 1);
  }
  return x *2;
}
var it = foo(1)
it.next() // { value: 24, done: true }

function *foo() {
  var x = yield 1;
  var y = yield 2;
  var z = yield 3;
  console.log(x, y, z);
}
var it = foo()


function *f() {
  console.log('执行了')
}
var generator = f();
setTimeout(function() {
  generator.next()
}, 2000)