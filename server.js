const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path');
const fs = require('fs');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
