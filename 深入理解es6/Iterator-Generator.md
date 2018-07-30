#### Iterator

使用ES5创建一个Iterator

```js
function createIterator(items) {
  var i = 0;
  return {
    next: function() {
      var done = (i => items.length);
      var value = !done ? item[i++] : undefined;
      return {
        done: done,
        value: value
      }
    }
  }
}
var iterator = createIterator([1, 2, 3]);
console.log(iterator.next());     // { done: false, value: 1 }
console.log(iterator.next());     // { done: false, value: 1 }
console.log(iterator.next());     // { done: false, value: 1 }
console.log(iterator.next());     // { done: true, value: undefined }
```

#### Generator