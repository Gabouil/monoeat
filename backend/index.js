const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/monoeat')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Could not connect to MongoDB", err));

app.get('/', (req, res) => {
    res.send('API server is running');
});

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
    console.clear();
    console.log('Server is listening on port 3000');
});
