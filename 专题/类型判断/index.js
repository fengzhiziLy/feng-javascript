// console.log(typeof('feng'));    // string

// console.log(typeof 'feng');

// function a() {}
// console.log(typeof a);

// var date = new Date();
// var error = new Error();
// console.log(typeof date);
// console.log(typeof error);

// console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
// console.log(Object.prototype.toString.call(null));      // [object Null]
// var date = new Date();
// console.log(Object.prototype.toString.call(date));      // [object Date]

// var number = 1;               // [object Number]
// var string = '123';           // [object String]
// var boolean = true;           // [object Boolean]
// var und = undefined;          // [object Undefined]
// var nul = null;               // [object Null]
// var obj = {a: 1};             // [object Object]
// var array = [1, 2, 3];        // [object Array]
// var date = new Date();        // [object Date]
// var error = new Error();      // [object Error]
// var reg = /a/g;               // [object RegExp]
// var func = function a() {};   // [object Function]
// function checkType () {
//   for (var i = 0; i < arguments.length; i++) {
//     console.log(Object.prototype.toString.call(arguments[i]));
//   }
// }
// checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)

// console.log(Object.prototype.toString.call(Math));    //[object Math]
// console.log(Object.prototype.toString.call(JSON));    // [object JSON]

// function a() {
//   console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
// }
// a();

// var classType = {};
// "Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(function(item, index) {
//   classType["[object " + item + "]"] = item.toLowerCase();
// })
// function type(obj) {
//   return typeof obj === "object" || typeof obj === "function" ?
//     classType[Object.prototype.toString.call(obj)] || "object" :
//     typeof obj;
// }
// console.log(type("123"))

var arr = [1,,];
console.log(arr.length);
var arrLike = {
  0: 1,
  length: 1
}
console.log(arrLike.length);