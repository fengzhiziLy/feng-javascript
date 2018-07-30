#### 属性初始值的简写

```js
// ES5
function createPerson(name, age) {
  return {
    name: name,
    age: age
  }
}
// ES6
function createPerson(name, age) {
  return {
    name,
    age
  }
}

// es5
var person = {
  name: 'feng',
  getName: function() {
    console.log(this.name)
  }
}
// es6
var person = {
  name: 'feng',
  getName () {
    console.log(this.name)
  }
}
```

#### 可计算属性名

在ES5以及之前，像要通过计算得到属性名，就需要用方括号代替点记法。

```js
var person = {},
    lastName = "last name";
person["first name"] = "Feng";
person[lastName] = "zhizi";
console.log(person["first name"]);
console.log(person[lastName]);
```

在ES6中，可在对象字面量中使用可计算属性名称.

```js
let lastName = "last name";
let person = {
  "first name": "feng",
  [lastName]: "zhizi"
}
console.log(person["first name"]);
console.log(person[lastName]);
```

```js
var suffix = " name";
var person = {
  ["first" + suffix]: "feng",
  ["last" + suffix]: "zhizhi"
}
console.log(person["first name"]);
console.log(person["last name"]);
```


#### Object.is()

> 问题由来：在使用===的时候，可以避免触发强制类型转换，但全等运算符也不是完全准确。
> +0与-0在JavaScript中表示两个完全不同的个体，而使用`===`的时候,两者相等
> `NaN === NaN`的返回值是`false`,需要使用`isNaN`来正确检测`NaN`

`Object.is()`如果这两个参数类型相同且具有相同的值，则返回`true`

```js
console.log(+0 == -0);            // true
console.log(+0 === -0);           // true
console.log(Object.is(+0, -0));   // false

console.log(NaN == NaN);          //false
console.log(NaN === NaN);         // false
console.log(Object.is(NaN, NaN)); // true

console.log(5 == 5);              // true
console.log(5 == "5");            // true
console.log(5 === 5);             // true
console.log(5 === "5");           // false
console.log(Object.is(5, 5));     // true
console.log(Object.is(5, "5"));   // false
```

#### Object.assgin()

混合(Mixin)是JavaScript中实现对象组合最流行的一种模式。
在一个mixin方法中，一个对象接受来自另一个对象的属性和方法。

```js
function mixin(receiver, sipplier) {
  Object.keys(sipplier).forEach(function(key) {
    receiver[key] = sipplier[key];
  });
  return receiver;
}
```

在上面的例子中，mixin()函数遍历supplier的自有属性并复制到receiver中(此处的复制行为是浅复制，当属性值为对象时只复制对象的引用)，这样一来，receiver不用通过继承就可以获得新属性了。

```js
function EventTarget () { /* ... */ }
EventTarget.prototype = {
  constructor: EventTarget,
  emit: function () { /* ... */ },
  on: function () { /* ... */ }
}
var myObject = {};
mixin(myObject, EventTarget.prototype);
myObject.emit("something");
```

`Object.assign()`方法的用法----实现了浅复制

```js
function EventTarget () { /* ... */ }
EventTarget.prototype = {
  constructor: EventTarget,
  emit: function () { /* ... */ },
  on: function () { /* ... */ }
}
var myObject = {};
Object.assign(myObject, EventTarget.prototype);
myObject.emit("something");
```

> `Object.assign()`方法不能将提供者的访问器属性复制到接收对象中。由于`Object.assign()`方法执行了赋值操作，因此提供者的访问器属性最终会转变为接受对象中的一个数据属性。

```js
var receiver = {},
    supplier = {
      get name() {
        return "file.js"
      }
    };
Object.assign(receiver, supplier);
var descriptor = Object.getOwnPropertyDescriptor(receiver, "name");
console.log(descriptor.value);    // file.js
console.log(descriptor.get);      // undefined
```


#### 自由属性枚举顺序

1. 所有数字键按升序排序
2. 所有字符串键按照他们被加入对象的顺序排序
3. 所有`symbol`键按照他们被加入对象的顺序排序

```js
var obj = {
  a: 1,
  0: 1,
  c: 1,
  2: 1,
  b: 1,
  1: 1
}
obj.d = 1;
console.log(Object.getOwnPropertyNames(obj).join(""));  // 012acbd
```


#### 改变对象的原型

> es5中缺少对象在实例化后改变原型的标准方法

> es6添加了`Object.setPrototypeOf()`方法，可以改变任意指定对象的原型

```js
let person = {
  getGreeting () {
    return "hello";
  }
};
let dog = {
  getGreeting () {
    return "Worf";
  }
};
// 以person为原型
let firend = Object.create(person);
console.log(firend.getGreeting());      // hello
console.log(Object.getPrototypeOf(firend) === person);      // true
// 将原型设置为dog
Object.setPrototypeOf(firend, dog);
console.log(firend.getGreeting());      // Worf
console.log(Object.getPrototypeOf(firend) === dog);   // true
```

> 对象原型的真实值被储存在内部专用属性`[[Prototype]]`中


#### 简化原型访问的Super引用

若想重写对象实例的方法，有需要调用与它同名的原型方法，在ES5中的实现：

```js
let person = {
  getGreeting () {
    return "hello";
  }
};
let dog = {
  getGreeting () {
    return "Worf";
  }
};
let firend = {
  getGreeting () {
    return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi";
  }
};
// 将原型设置为person
Object.setPrototypeOf(firend, person);
console.log(firend.getGreeting()); // "hello, hi"
console.log(Object.getPrototypeOf(firend) === person);  // true
// 将原型设置为dog
Object.setPrototypeOf(firend, dog);
console.log(firend.getGreeting());  // "Worf, hi"
console.log(Object.getPrototypeOf(firend) === dog); // true
```

`Super`引用相当于指向对象原型的指针，实际上就是`Object.getPrototypeOf(this)`的值。

```js
let firend = {
  getGreeting () {
    return super.getGreeting(this) + ", hi";
  }
};
```

Super引用在多重继承的情况下非常有用，用`Object.getPrototypeOf()`将会出现问题。

```js
let person = {
  getGreeting () {
    return "hello";
  }
};
let friend = {
  getGreeting () {
    return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi";
  }
};
Object.setPrototypeOf(friend, person);  
let realtive = Object.create(friend);
console.log(person.getGreeting());      // hello
console.log(friend.getGreeting());      // hello, hi
console.log(realtive.getGreeting());    // error
```

在使用Super引用的时候可以解决这个错误

```js
let person = {
  getGreeting () {
    return "hello";
  }
};
let friend = {
  getGreeting () {
    return super.getGreeting(this) + ", hi";
  }
};
Object.setPrototypeOf(friend, person);  
let realtive = Object.create(friend);
console.log(person.getGreeting());      // hello
console.log(friend.getGreeting());      // hello, hi
console.log(realtive.getGreeting());    // hello, hi
```