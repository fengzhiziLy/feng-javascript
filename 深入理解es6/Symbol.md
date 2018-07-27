```js
let collection = {
  0: 'hello',
  1: 'feng',
  length: 2,
  [Symbol.isConcatSpreadable]: true
}
let message = ["Hi"].concat(collection);
console.log(message.length);
console.log(message);
```


```js
// 实际上等价于 /^.{10}$/
let hasLengthOf10 = {
  [Symbol.match]: function(value) {
    return value.length === 10 ? [value] : null;
  },
  [Symbol.replace]: function (value, replacement) {
    return value.length === 10 ? replacement : value;
  },
  [Symbol.search]: function(value) {
    return value.length === 10 ? 0 : -1;
  },
  [Symbol.split]: function(value) {
    return value.length === 10 ? [, ] : [value]
  }
}
let message1 = "Hello feng",
    message2 = "Hello bai";
let match1 = message1.match(hasLengthOf10);
    match2 = message2.match(hasLengthOf10);
console.log(match1);
console.log(match2);
let replace1 = message1.replace(hasLengthOf10);
    replace2 = message2.replace(hasLengthOf10);
console.log(replace1);
console.log(replace2);
let search1 = message1.search(hasLengthOf10);
    search2 = message2.search(hasLengthOf10);
console.log(search1);
console.log(search2);
let split1 = message1.split(hasLengthOf10);
    split2 = message2.split(hasLengthOf10);
console.log(split1);
console.log(split2);
```


```js
function Temperature(degrees) {
  this.degrees = degrees;
}
Temperature.prototype[Symbol.toPrimitive] = function (hint) {
  switch (hint) {
    case "string":
      return this.degrees + "\u00b0";
    case "number":
      return this.degrees;
    case "default":
      return this.degrees + " degrees";
  }
}
var freezing = new Temperature(32);
console.log(freezing + "!");
console.log(freezing / 2);
console.log(String(freezing));
```