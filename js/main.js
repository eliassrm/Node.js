// Variables and basic data types
let name = "JavaScript";
let number = 42;
let isAwesome = true;

console.log("Hello, " + name);
console.log("The answer is: " + number);

// Simple function
function greet(username) {
    return "Welcome, " + username + "!";
}

console.log(greet("Beginner"));

// Array and loop
let fruits = ["apple", "banana", "orange"];

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// Object
let person = {
    name: "Alice",
    age: 25,
    city: "New York"
};

console.log(person.name + " is " + person.age + " years old");