function Set () {
  var items = {};
  this.has = function (value) {
    // return value in items;
    return items.hasOwnProperty(value);
  };
  this.add = function (value) {
    if (!this.has(value)) {
      items[value] = value;
      return true;
    }
    return false;
  };
  this.remove = function (value) {
    if (this.has(value)) {
      delete items[value];
      return true;
    }
    return false;
  };
  this.clear = function() {
    items = {};
  };
  this.size = function () {
    return Object.keys(items).length;
  };
  this.values = function () {
    return Object.keys(items);
  };
  this.union = function(otherSet) {
    var unionSet = new Set();
    var values = this.values();
    for (var i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }
    values = otherSet.values();
    for (var i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }
    return unionSet;
  };
  this.intersection = function(otherSet) {
    var intersectionSet = new Set();
    var values = this.values();
    for (var i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i]);
      }
    }
    return intersectionSet;
  };
  this.difference = function(otherSet) {
    var differenceSet = new Set();
    var values = this.values();
    for (var i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        differenceSet.add(values[i]);
      }
    }
    return differenceSet;
  };
  this.subset = function(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    } else {
      var values = this.values();
      for (var i = 0; i < values.length; i++) {
        if (!otherSet.has(values[i])) {
          return false
        }
      }
      return true;
    }
  };
}
var setA = new Set();
setA.add(1);
setA.add(2);
var setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);
setB.add(4);
// var unionAB = setA.union(setB);
// var intersectionAB = setA.intersection(setB);
// var differenceAB = setA.difference(setB);
console.log(setA.subset(setB));
// var set = new Set();
// set.add(1);
// console.log(set.values());
// console.log(set.has(1));
// console.log(set.size());
// set.add(2);
// console.log(set.values());
// console.log(set.has(2));
// console.log(set.size());
// set.remove(1);
// console.log(set.values());
// set.remove(2);
// console.log(set.values());