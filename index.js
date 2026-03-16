// This is the read file 
const fs = require('fs');

fs.readFile('./files/start_here.txt', (err, data)=>{
    if(err) throw err;
    console.log(data);
    console.log(data.toString());
})

//exit on uncaught exceptions
process.on('uncaughtException', err =>{
    console.error('There was an uncaught error', err);
    process.exit(1); //mandatory (as per the Node.js docs)
})

console.log("This will be printed");