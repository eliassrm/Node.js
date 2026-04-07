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
    
    const extension = path.extname(req.url);
    let contentType;

    switch (extension) {
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".jpg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
        default:
            contentType = "text/html";
    }

    let filePath =
        contentType === "text/html" && req.url === "/"
            ? path.join(__dirname, "views", "index.html")
            : contentType === "text/html" && req.url.slice(-1) === "/"
                ? path.join(__dirname, "views", req.url, "index.html")
                : contentType === "text/html"
                    ? path.join(__dirname, "views", req.url)
                    : path.join(__dirname, req.url);
    
    // If there is no extension and the url does not end with a slash, assume .html
    if (!extension && req.url.slice(-1) !== "/") filePath += ".html";
   
    const fileExists = fs.existsSync(filePath);
    if (fileExists){
        // Serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                resp.statusCode = 500;
                resp.end();
            } else {
                // 404 , 500, 301 redirects
                resp.statusCode = 200;
                resp.setHeader("Content-Type", contentType);
                resp.end(data);
            }});
            
    }
    
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

// // const os = require("os");
// const path = require("path");
// console.log(path.dirname(__filename));
// console.log(path.dirname(__dirname));

// console.log(path.parse(__filename));