### 防抖的实现

防抖的原理：
触发事件，但一定在事件触发n秒之后才执行，如果在一个事件触发n秒内又触发了这个事件，那么就以新的事件的时间为准，n秒后才执行。

#### this的指向

```js
function getUserAction() {
  container.innerHTML = count++;
  console.log(this);
}
container.onmousemove = getUserAction;
```

在上面的代码中，`this`的值为`<div id="container">{count的显示}</div>`

```js
function getUserAction() {
  container.innerHTML = count++;
  console.log(this);
}
container.onmousemove = debounce(getUserAction, 1000);
```

而这样得情况下，`this`的值为window对象
为了得到`this`的正确指向：

```js
function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context);
    }, wait);
  }
}
```

#### event对象

```js
function getUserAction(e) {
  console.log(e)
  container.innerHTML = count++;
}
container.onmousemove = getUserAction;
```

这里会打印出MouseEvent对象：`MouseEvent {isTrusted: true, screenX: 384, screenY: 272, clientX: 255, clientY: 69, …}`

> 但是如果在`debounce`函数中，打印就是`undefined`

```js
function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  }
}
```

这样就会打印出MouseEvent对象：`MouseEvent {isTrusted: true, screenX: 384, screenY: 272, clientX: 255, clientY: 69, …}`

#### 立刻执行

若不希望非要等到事件停止触发后才执行，希望的是立刻执行，然后等到停止触发 n 秒后，才可以重新触发执行

```js
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不在执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context,  args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  }
}
```

#### 返回值

此时注意一点，就是`getUserAction`函数可能是有返回值的，所以我们也要返回函数的执行结果，但是当`immediate`为`false`的时候，因为使用了`setTimeout`，我们将 `func.apply(context, args)`的返回值赋给变量，最后再`return`的时候，值将会一直是`undefined`，所以只在`immediate`为`true`的时候返回函数的执行结果。

```js
function debounce(func, wait, immediate) {
  var timeout, result;
  return function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不在执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context,  args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  }
}
```

#### 取消

希望能取消`debounce`函数，比如说`debounce`的时间间隔是 10 秒钟，`immediate`为`true`，这样的话，只有等 10 秒后才能重新触发事件，现在希望有一个按钮，点击后，取消防抖，这样再去触发，就可以又立刻执行

```js
function debounce(func, wait, immediate) {
  var timeout, result;
  var debounced = function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不在执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context,  args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  }
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  }
  return debounced;
}
```