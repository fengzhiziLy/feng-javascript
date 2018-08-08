#### 基本的类声明语法

```js
class PersonClass {
  // 等价于PersonClass构造函数
  constructor(name) {
    this.name = name;
  }
  // 等价于PersonClass..prototype.sayName
  sayName() {
    console.log(this.name); 
  }
}
let person = new PersonClass("feng");
person.sayName();                                     // feng
console.log(person instanceof PersonClass);           // true
console.log(person instanceof Object);                // true
console.log(typeof PersonClass);                      // function
console.log(typeof PersonClass.prototype.sayName);    // function
```

```js
let PersonType = (function () {
  "use strict";
  const PersonType = function (name) {
    if (typeof new.target === 'undefined') {
      throw new Error('必须通过关键字new调用构造函数')
    }
    this.name = name;
  }
  Object.defineProperty(PersonType.prototype, "sayName", {
    value: function () {
      if (typeof new.target !== 'undefined') {
        throw new Error('不可以使用new关键字调用该方法')
      }
      console.log(this.name)
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
  return PersonType;
}())
```