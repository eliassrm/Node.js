// This is the read file 
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'files', 'start_here.txt'),'utf8', (err, data)=>{
    if(err) throw err;
    console.log(data);
    console.log(data.toString());
})

console.log("This will be printed first?");
//exit on uncaught exceptions
process.on('uncaughtException', err =>{
    console.error('There was an uncaught error', err);
    process.exit(1); //mandatory (as per the Node.js docs)
})

console.log("This will be printed");