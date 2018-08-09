function HashTable() {
  var table = [];
  var loseloseHashCode = function (key) {
    var hash = 0;
    for (var i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };
  this.put = function (key, value) {
    var position = loseloseHashCode(key);
    console.log(position + ' - ' + key);
    table[position] = value;
  };
  this.get = function (key) {
    return table[loseloseHashCode(key)];
  };
  this.remove = function (key) {
    table[loseloseHashCode(key)] = undefined;
  };
}

var hash = new HashTable();
hash.put('feng', 'feng@email.com');
hash.put('zhi', 'zhi@email.com');
hash.put('zhao', 'zhao@email.com');

console.log(hash.get('feng'));
console.log(hash.get('tong'));

hash.remove('zhi');
console.log(hash.get('zhi'));

function HashMap() {
  function LinkedList() {
    var Node = function (element) {
      this.element = element;
      this.next = null;
    }
    var length = 0;
    var head = null; // 存储第一个节点的引用
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
    this.removeAt = function (position) {
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

    this.insert = function (position, element) {
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
    this.toString = function () {
      var current = head,
        string = '';
      while (current) {
        string += "," + current.element;
        current = current.next;
      }
      return string.slice(1);
    };
    this.indexOf = function (element) {
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
    this.print = function () {
      console.log(this.toString());
    };
  }
  var table = [];
  var loseloseHashCode = function (key) {
    var hash = 0;
    for (var i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };
  // 分离链接
  var ValuePair = function (key, value) {
    this.key = key;
    this.value = value;
    this.toString = function () {
      return '[' + this.key + ' - ' + this.value + ']'
    }
  };
  this.put = function (key, value) {
    var position = loseloseHashCode(key);
    if (table[position] == undefined) {
      table[position] = new LinkedList();
    }
    table[position].append(new ValuePair(key, value));
    console.log(position + ' - ' + key);
  };
  this.get = function (key) {
    var position = loseloseHashCode(key);
    if (table[position] !== undefined) {
      var current = table[position].getHead();
      while (current.next) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
      if (current.element.key === key) {
        return current.element.value;
      }
      return undefined;
    }
  };
  this.remove = function (key) {
    var position = loseloseHashCode(key);
    if (table[position] !== undefined) {
      var current = table[position].getHead();
      while (current.next) {
        if (current.element.key === key) {
          table[position].remove(current.element);
          if (table[position].isEmpty()) {
            table[position] = undefined;
          }
          return true;
        }
        current = current.next;
      }
      // 检查是否为第一个或最后一个元素
      if (current.element.key === key) {
        table[position].remove(current.element);
        if (table[position].isEmpty()) {
          table[position] = undefined;
        }
        return true;
      }
    }
    return false;
  };
  this.print = function () {
    for (var i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ": " + table[i]);
      }
    }
  }
}
var hashM = new HashMap();
hashM.put('Tyrion', 'tyrion@email.com');
hashM.put('Aaron', 'aaron@email.com');
hashM.print()