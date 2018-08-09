function Dictionary () {
  var items = {};
  this.has = function (key) {
    return key in items;
  };
  this.set = function (key, value) {
    items[key] = value;
  };
  this.remove = function (key) {
    if (this.has(key)) {
      delete items[key];
      return true;
    }
    return false;
  };
  this.get = function (key) {
    return this.has(key) ? items[key] : undefined;
  };
  this.values = function () {
    var values = [];
    for (var k in items) {
      if (this.has(k)) {
        values.push(items[k]);
      }
    }
    return values;
  };
  this.getItems = function () {
    return items;
  };
  this.clear = function() {
    items = {};
  };
  this.size = function () {
    return Object.keys(items).length;
  };
  this.keys = function () {
    return Object.keys(items);
  };
}

var dictionary = new Dictionary();
dictionary.set('feng', 'feng@email.com');
dictionary.set('zhi', 'zhi@email.com');
dictionary.set('zhao', 'zhao@email.com');

console.log(dictionary.has('feng'));
console.log(dictionary.size());

console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get('zhao'));

dictionary.remove('zhi');
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.getItems());