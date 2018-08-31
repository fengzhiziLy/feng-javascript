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

// function loadImg(src) {
//   var promise = new Promise(function (resolve, reject) {
//     var img = document.createElement('img')
//     img.onload = function () {
//       resolve(img)
//     }
//     img.onerror = function () {
//       reject('图片加载失败')
//     }
//     img.src = src
//   })
//   return promise
// }

// var src = 'https://www.imooc.com/static/img/index/logo_new.png'
// var result = loadImg(src)

// result.then(function (img) {
//   console.log('img.width', img.width)
//   return img
// }).then(function (img) {
//   console.log('img.height', img.height)
// }).catch(function (ex) {
//   // 统一捕获异常
//   console.log(ex)
// })

// 车辆
class Car {
  constructor(num) {
    this.num = num
  }
}
// 摄像头
class Camera {
  shot(car) {
    return {
      num: car.num,
      inTime: Date.now()
    }
  }
}
// 出口显示屏
class Screen {
  show(car, inTime) {
    console.log('车牌号', car.num)
    console.log('停车时间', Date.now() - inTime)
  }
}
// 停车场
class Park {
  constructor(floors) {
    this.floors = floors || []
    this.camera = new Camera()
    this.screen = new Screen()
    this.carList = {} // 存储摄像头拍摄返回的车辆信息
  }
  in(car) {
    // 通过摄像头获取信息
    const info = this.camera.shot(car)
    // 停到某个停车位
    const i = parseInt(Math.random() * 100 % 100)
    const place = this.floors[0].places[i]
    place.in()
    info.place = place
    // 记录信息
    this.carList[car.num] = info
  }
  out(car) {
    // 获取信息
    const info = this.carList[car.num]
    // 将停车位情空
    const place = info.place
    place.out()
    // 显示时间
    this.screen.show(car, info.inTime)
    // 情空记录
    delete this.carList[car.num]
  }
  emptyNum() {
    return this.floors.map(floor => {
      return `${floor.index}层还有${floor.emptyPlaceNum()}个空闲车位`
    }).join('\n')
  }
}
// 层
class Floor {
  constructor(index, places) {
    this.index = index
    this.places = places || []
  }
  emptyPlaceNum() {
    let num = 0
    this.places.forEach(p => {
      if (p.empty) {
        num = num + 1
      }
    })
    return num
  }
}
// 车位
class Place {
  constructor() {
    this.empty = true
  }
  in () {
    this.empty = false
  }
  out() {
    this.empty = true
  }
}
// 测试
// 初始化停车场
const floors = []
for (let i = 0; i < 3; i++) {
  const palces = []
  for (let j = 0; j < 100; j++) {
    palces[j] = new Place()
  }
  floors[i] = new Floor(i + 1, palces)
}
const park = new Park(floors)
// 初始化车辆
const car1 = new Car(100)
const car2 = new Car(200)
const car3 = new Car(300)
console.log('第一辆车进入')
console.log(park.emptyNum())
park.in(car1)
console.log('第二辆车进入')
console.log(park.emptyNum())
park.in(car2)
console.log('第一辆车离开')
park.out(car1)
console.log('第二辆车离开')
park.out(car2)
console.log('第三辆车进入')
console.log(park.emptyNum())
park.in(car3)
console.log('第三辆车离开')
park.out(car3)