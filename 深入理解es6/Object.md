### 扩展对象的功能性

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

