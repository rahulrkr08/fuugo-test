const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Loading library file
const { getLocationInfo } = require('./lib');

// route endpoint
app.get('/search', getLocationInfo);

// Start application
app.listen(port, () => console.log(`Application start on ${port}`))