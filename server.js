const http = require("http");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

console.log("Server is running...");

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {};
// Initialize the event object
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, resp) => {
    console.log(req.url, req.method);

});

server.listen(PORT, ()) => console.log(`Server is running on port ${PORT}...`));

// // const os = require("os");
// const path = require("path");
// console.log(path.dirname(__filename));
// console.log(path.dirname(__dirname));

// console.log(path.parse(__filename));