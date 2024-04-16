const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const ingredientRoutes = require('./routes/ingredient.routes');
const recipeRoutes = require('./routes/recipe.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
const menuRoutes = require('./routes/menu.routes');

const authMiddleware = require('./helpers/authMiddleware');

const app = express();
const cors = require('cors');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors({
    origin: ['https://monoeat.gabrielgoldbronn.com', 'https://api.monoeat.gabrielgoldbronn.com', 'http://localhost:5173'],
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(fileUpload());

mongoose.connect('mongodb://127.0.0.1:27017/monoeat')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Could not connect to MongoDB", err));

app.get('/', (req, res) => {
    res.send('API server is running');
});

app.use('/images', express.static('public/uploads/images/recipes'));
app.use('/ingredients', authMiddleware, ingredientRoutes);
app.use('/recipes', authMiddleware, recipeRoutes);
app.use('/users', authMiddleware, userRoutes);
app.use('/orders', authMiddleware, orderRoutes);
app.use('/menus', authMiddleware, menuRoutes);

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
