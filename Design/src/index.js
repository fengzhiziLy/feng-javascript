// class jQuery {
//   constructor(selector) {
//     let slice = Array.prototype.slice
//     let dom = slice.call(document.querySelectorAll(selector))
//     let len = dom ? dom.length : 0
//     for (let i = 0; i < len; i++) {
//       this[i] = dom[i]
//     }
//     this.length = len
//     this.selector = selector || ''
//   }
//   append(node) {

//   }
//   addClass(name) {

//   }
//   html(data) {

//   }
//   // 此处省略若干 API
// }
// window.$ = function (selector) {
//   return new jQuery(selector)
// }

// var $p = $('p')
// console.log($p)
// console.log($p.addClass)

function loadImg(src) {
  var promise = new Promise(function (resolve, reject) {
    var img = document.createElement('img')
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject('图片加载失败')
    }
    img.src = src
  })
  return promise
}

var src = 'https://www.imooc.com/static/img/index/logo_new.png'
var result = loadImg(src)

result.then(function (img) {
  console.log('img.width', img.width)
  return img
}).then(function (img) {
  console.log('img.height', img.height)
}).catch(function (ex) {
  // 统一捕获异常
  console.log(ex)
})