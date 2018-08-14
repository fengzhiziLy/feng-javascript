// var arr = ['old', 1, true, null, undefined];
// var new_arr = arr.slice();
// new_arr[0] = 'new';
// console.log(arr);
// console.log(new_arr);

// var arr = [{old: 'old'}, ['old']];
// var new_arr = arr.concat();
// new_arr[0].old = 'new';
// new_arr[1][0] = 'new';
// console.log(arr);
// console.log(new_arr);

// var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}];
// var new_arr = JSON.parse(JSON.stringify(arr));
// new_arr[0] = 'new';
// console.log(arr);
// console.log(new_arr);

var arr = [function () {
  console.log(a)
}, {
  b: function () {
    console.log(b)
  }
}]
var new_arr = JSON.parse(JSON.stringify(arr));
console.log(new_arr);