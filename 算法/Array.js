var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
numbers[numbers.length] = 10;
console.log(numbers);
numbers.push(11);
numbers.push(12, 13);
console.log(numbers);
// 插入元素到数组首位
for (var i = numbers.length; i >= 0; i--) {
  // 将其前一个元素的值赋值给最后一位
  numbers[i] = numbers[i-1];
}
numbers[0] = -1;
console.log(numbers);
numbers.unshift(-3, -2);
console.log(numbers);

// 删除最后一个元素
numbers.pop();
console.log(numbers);

// 从数组首位删除元素
for (var i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i+1];
}
console.log(numbers);
numbers.shift();
console.log(numbers);

// 在任意位置添加或删除元素
numbers.splice(5, 3);
console.log(numbers);
numbers.splice(5, 0, 4, 5, 6);
console.log(numbers);

// 数组合并
var zero = 0;
var positiveNumbers = [1, 2, 3];
var negativeNumbers = [-3, -2, -1];
var feng = negativeNumbers.concat(zero, positiveNumbers);
console.log(feng);

// 迭代器函数
var isEven = function (x) {
  console.log(x);
  return (x % 2 == 0) ? true : false
}
var arrays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
arrays.every(isEven);
arrays.some(isEven);
arrays.forEach(function(x) {
  console.log((x % 2 == 0));
});
var myMap = arrays.map(isEven);
console.log(myMap);
var evenNumbers = arrays.filter(isEven);
console.log(evenNumbers);

arrays.reverse();
console.log(arrays);
arrays.sort();
console.log(arrays);
arrays.sort(function(a, b){
  return a - b;
});
console.log(arrays);

var friends = [
  {name: 'feng', age: 30},
  {name: 'fengzhi', age: 20},
  {name: 'fengzhizi', age: 35}
];
function comparePerson (a, b) {
  if (a.age < b.age) {
    return -1;
  }
  if (a.age > b.age) {
    return 1;
  }
  return 0;
}
console.log(friends.sort(comparePerson));

console.log(numbers.toString());
var numberString = numbers.join('-');
console.log(numberString);