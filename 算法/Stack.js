// 栈是一种遵循后进先出原则(LIFO)的有序集合

// 创建栈
function Stack() {
  // 需要一种数据结构来保存栈中的元素
  let items = [];
  // 向栈中添加元素
  this.push = function(element) {
    items.push(element)
  };
  // 从栈中移除元素
  this.pop = function () {
    return items.pop();
  };
  // 查看栈中的元素
  this.peek = function () {
    return items[items.length - 1];
  };
  // 检查栈是否为空
  this.isEmpty = function () {
    return items.length == 0;
  };
  this.size = function () {
    return items.length;
  };
  // 清空栈元素
  this.clear = function () {
    items = [];
  };
  this.print = function () {
    console.log(items.toString());
  };
};

let stack = new Stack();
console.log(stack.isEmpty());
stack.push(5);
stack.push(8);
console.log(stack.peek());
stack.push(11);
console.log(stack.size());
console.log(stack.isEmpty());
stack.push(15);
stack.pop();
stack.pop();
console.log(stack.size());
stack.print();