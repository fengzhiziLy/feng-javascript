/**
 * 同步和异步任务分别进入不同的执行场所，同步的进入主线程，异步的进入Event Table
 * 当指定的事情完成时，Event Table会将这个函数移入Event Queue
 * 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行
 * 上述过程不断重复，也就是常说的Event Loop
 */

/**
 * 微任务(Microtasks)  宏任务(task)
 * 微任务和宏任务皆是异步任务，它们都属于一个队列，主要区别在于它们的执行顺序，Event Loop的走向和取值
 * JS异步的一个机制：遇到宏任务先执行宏任务，将宏任务放入到Event Queue中，然后在执行微任务，将微任务放到Event Queue中，这两个Event Queue不是一个queue
 * 当往外拿的时候，先从微任务中拿这个回调函数，然后在从宏任务的queue中拿宏任务的回调函数
 * 宏任务一般是：包括整体的script,setTimeout,setInterval,setImmediate等
 * 微任务：原生promise，process.nextTick,object.observe(已废弃)
 */

// 事件队列
console.log('1');
setTimeout(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  })
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5');
  })
})
process.nextTick(function () {
  console.log('6');
});
new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  console.log('8')
});
setTimeout(function () {
  console.log('9');
  process.nextTick(function () {
    console.log('10');
  })
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12')
  })
})