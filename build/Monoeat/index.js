const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();

// Serve static files from the Vue app
app.use('/', serveStatic(path.join(__dirname, '/dist')));

// Catch all routes and redirect to the index file
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

// Set port
const port = process.env.PORT || 5001;
app.listen(port);

console.log('Server started on port ' + port);
