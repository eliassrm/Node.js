// video stopped at 2:39:00
// last topic covered is 
// middleware function

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path');
const { logger } = require('./middleware/logEvents');
const { deleteLogs } = require('./middleware/logEvents');
const fs = require('fs');
const cors = require('cors');

// Delete old log files on server start
deleteLogs();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

app.use(logger);

// const corsOptions = {
//     origin: 'http://localhost:3500', // Replace with your allowed origin
//     optionsSuccessStatus: 200 // For legacy browser support
// };

// app.use(cors(corsOptions));

// Middleware to log requests
// in other words, a function that runs before the route handler
// content-type: application/json
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// server static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    console.log('Request for index received');
});
app.get('/404', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
    console.log('Request for /404 received');
});
app.get('/x', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'x.html'));
    console.log('Request for /x received');
});


app.get('/hello', (req, res, next)=> {
    console.log('Attempting to load hello.html');
    next();
}, (req, res)=> {
    res.sendFile(path.join(__dirname, 'views', 'hello.html'));
    console.log('hello.html loaded successfully');
});

