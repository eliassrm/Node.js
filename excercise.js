// JavaScript practice exercise
// Complete each TODO, then run: node excercise.js

console.log("=== JavaScript Exercise ===");

// 1) Variables
// TODO: Change these values to your own information.
let name = "YourName";
const age = 18;
let city = "YourCity";

console.log("Name:", name);
console.log("Age:", age);
console.log("City:", city);

// 2) Math operations
// TODO: Try changing x and y and rerun the file.
let x = 12;
let y = 5;

console.log("Sum:", x + y);
console.log("Difference:", x - y);
console.log("Product:", x * y);
console.log("Quotient:", x / y);
console.log("Remainder:", x % y);

// 3) Functions
function add(a, b) {
    return a + b;
}

const multiply = (a, b) => a * b;

console.log("add(4, 6):", add(4, 6));
console.log("multiply(3, 7):", multiply(3, 7));

// 4) Arrays + methods
const numbers = [1, 2, 3, 4, 5, 6];

const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);

console.log("Numbers:", numbers);
console.log("Doubled:", doubled);
console.log("Evens:", evens);

// 5) Conditionals
// TODO: Change score and check the result.
const score = 72;
let result;

if (score >= 50) {
    result = "Pass";
} else {
    result = "Fail";
}

console.log("Score:", score);
console.log("Result:", result);

// Bonus TODO:
// Create an object called student with keys: name, age, isActive.
// Then print: console.log(student);