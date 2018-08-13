var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
  console.log(e)
  container.innerHTML = count++;
}

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

// container.onmousemove = getUserAction;
var setUserAction = debounce(getUserAction, 10000, true);
container.onmousemove = setUserAction;
document.getElementById("button").addEventListener("click", function () {
  setUserAction.cancel();
})
