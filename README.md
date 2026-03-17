# JavaScript Basics Starter Guide

This project is a simple place to start learning JavaScript with Node.js.

## 1) Basic JavaScript Operations

### Variables
- `let`: value can change
- `const`: value should not change
- `var`: older style (usually avoid in modern code)

```js
let username = "Elias";
const year = 2026;
```

### Data Types
- String: `"hello"`
- Number: `42`, `3.14`
- Boolean: `true`, `false`
- Null: `null`
- Undefined: `undefined`
- Array: `[1, 2, 3]`
- Object: `{ name: "Elias", age: 20 }`

### Math Operations
```js
let a = 10;
let b = 3;

console.log(a + b); // 13
console.log(a - b); // 7
console.log(a * b); // 30
console.log(a / b); // 3.333...
console.log(a % b); // 1
```

### Strings
```js
const name = "Elias";
console.log("Hello " + name);
console.log(`Hello ${name}`);
```

### Conditionals
```js
const score = 75;

if (score >= 50) {
  console.log("Pass");
} else {
  console.log("Fail");
}
```

### Functions
```js
function add(x, y) {
  return x + y;
}

const multiply = (x, y) => x * y;
```

### Arrays and Methods
```js
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens);   // [2, 4]
```

## 2) Useful Node.js Commands

Run a file:

```bash
node index.js
```

Run the server example:

```bash
node server.js
```

Run the exercise file:

```bash
node excercise.js
```

## 3) Practice Exercise

Open `excercise.js` and complete the TODOs.

Goals:
1. Create and print variables.
2. Perform math operations.
3. Write and call functions.
4. Work with arrays (`map`, `filter`).
5. Use conditionals.

When done, run:

```bash
node excercise.js
```

If your output looks correct, you are ready for the next step: modules and file handling with `math.js` and `index.js`.
