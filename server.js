const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path');
const fs = require('fs');



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    console.log('Request for / received');
});
app.get('/404', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
    console.log('Request for /404 received');
});
app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});
app.get('/  x', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'x.html'));
    console.log('Request for /x received');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);

});

app.get('/hello', (req, res, next)=> {
    console.log('Attempting to load hello.html');
    next();
}, (req, res)=> {
    res.sendFile(path.join(__dirname, 'views', 'hello.html'));
    console.log('hello.html loaded successfully');
});

app.get('/chain', (req, res, next)=> {
    console.log('Attempting to load chain.html');
    next();
}, (req, res, next)=> {
    console.log('Processing chain.html');
    next();
}, (req, res)=> {
    res.sendFile(path.join(__dirname, 'views', 'chain.html'));
    console.log('chain.html loaded successfully');
});

app.get('/404', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    console.log('Request for unknown route received, sending 404 page');
});