function LinkedList () {
  var Node = function (element) {
    this.element = element;
    this.next = null;
  }
  var length = 0;
  var head = null;  // 存储第一个节点的引用
  this.append = function (element) {
    var node = new Node(element),
        current;
    if (head === null) {
      head = node;
    } else {
      current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    length++;
  };

  // 根据给定位置移除第一个元素的方法
  this.removeAt = function (position)  {
    // 检查越界值
    if (position > -1 && position < length) {
      var current = head;
      var previous;
      var index = 0;
      // 移除第一项
      if (position === 0) {
        head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  }

  this.insert = function(position, element) {
		//检查越界值
		if (position >= 0 && position <= length) { 
			var node = new Node(element),
				current = head,
				previous,
				index = 0;
			if (position === 0) {
				node.next = current; 
				head = node;
			} else {
				while (index++ < position) { 
					previous = current;
					current = current.next;
				}
				node.next = current; 
				previous.next = node; 
			}
			length++; //更新列表的长度
			return true;
		} else {
			return false; 
		}
	};
  // 把LinkedList对象转换成一个字符串
  this.toString = function() {
		var current = head, 
			string = ''; 
		while (current) { 
			string += "," + current.element; 
			current = current.next; 
		}
		return string.slice(1); 
  };
  this.indexOf = function(element) {
    var current = head;
    var index = 0;
    while (current) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }
	this.print = function() {
		console.log(this.toString());
	};
}
var list = new LinkedList();
list.append(15);
list.append(10);
list.print();