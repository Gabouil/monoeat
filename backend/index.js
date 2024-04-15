const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const ingredientRoutes = require('./routes/ingredient.routes');
const recipeRoutes = require('./routes/recipe.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
const menuRoutes = require('./routes/menu.routes');

const app = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://monoeat.gabrielgoldbronn.com',
}));
app.use(fileUpload());

mongoose.connect('mongodb://127.0.0.1:27017/monoeat')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Could not connect to MongoDB", err));

app.get('/', (req, res) => {
    res.send('API server is running');
});

app.use('/images', express.static('public/uploads/images/recipes'));
app.use('/ingredients', ingredientRoutes);
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/menus', menuRoutes);

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
