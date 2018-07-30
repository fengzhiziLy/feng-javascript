### 对象解构

```js
let node = {
  type: "Feng",
  name: "foo"
}
let { type, name } = node;
console.log(type);      // Feng
console.log(name);      // foo 
```

#### 解构赋值

```js
let node = {
  type: "Feng",
  name: "foo"
};
let type = "FENG";
let name = 5;
({ type , name } = node);
console.log(type);    // Feng
console.log(name);    // foo
```

#### 为非同名局部变量赋值

```js
let node = {
  type: "Feng",
  name: "foo"
};
let { type: localType, name: localName } = node;
console.log(localType);
console.log(localName);
```

`type: localType`的含义是读取名为`type`的属性并将其值存储在变量`localType`中，这种语法其实与传统对象字面量的语法相悖。

```js
let node = {
  type: "Feng"
};
let { type: localType, name: localName = "bar" } = node;
console.log(localType);
console.log(localName);
```

上面的代码表示：当使用其他变量名进行赋值时也可以添加默认值。

#### 嵌套对象解构

```js
let node = {
  type: "feng",
  name: "foo",
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line: 1,
      column: 4
    }
  }
};
let { loc: { start } } = node;
console.log(start.line);
console.log(start.column);
```

```js
let node = {
  type: "feng",
  name: "foo",
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line: 1,
      column: 4
    }
  }
};
let { loc: { start: localStart } } = node;
console.log(localStart.line);
console.log(localStart.column);
```

### 数组解构

```js
let colors = ['red', 'green', 'blue'];
let [ firstColor, secondColor ] = colors;
console.log(firstColor);
console.log(secondColor);
```

```js
let colors = ['red', 'green', 'blue'];
let [ , , thirdColor ] = colors;
console.log(thirdColor);
```

#### 解构赋值

数组解构也可以用于赋值上下文，但不需要用小括号包裹表达式，这一点与对象解构的约定不同。

```js
let colors = ['red', 'green', 'blue'];
let firstColor = "black";
let secondColor = "yellow";
[ firstColor, secondColor ] = colors;
console.log(firstColor);
console.log(secondColor);
```

数组解构还有一个独特的用法：交换两个变量的值。

> 在ES5中交换两个变量的值，则需要引用第三个临时的变量：

```js
let a = 1;
let b = 5;
let tmp;
tmp = a;
a = b;
b = tmp;
console.log(a);
console.log(b);
```

> 在ES6中

```js
let a = 1;
let b = 5;
[ a, b ] = [ b, a ];
console.log(a);
console.log(b);
```

#### 默认值

```js
let colors = ['red'];
let [ firstColor, secondColor = "green" ] = colors;
console.log(firstColor);
console.log(secondColor);
```

#### 嵌套数组解构

```js
let colors = ['red', [ 'green', 'lightgreen' ], 'blue'];
let [ firstColor, [ secondColor ] ] = colors;
console.log(firstColor);
console.log(secondColor);
```

#### 不定参数

```js
let colors = ['red', [ 'green', 'lightgreen' ], 'blue'];
let [ firstColor, ...restColors ] = colors;
console.log(firstColor);
console.log(restColors.length);
console.log(restColors[0]);
console.log(restColors[1]);
```

可以用这种方法复制数组。

```js
let colors = ['red', 'green', 'blue'];
let [ ...clonedColors ] = colors;
console.log(clonedColors);
```