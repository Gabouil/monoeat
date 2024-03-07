const Ingredient = require('../models/ingredient.model');
const Recipe = require('../models/recipe.model');
const catchAsync = require("../helpers/catchAsync");

const create = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    const ingredient = await Ingredient.create(req.body);
    res.send(ingredient);
});

const getAll = catchAsync(async (req, res) => {
    const ingredients = await Ingredient.find(req.query);
    res.send(ingredients);
});

const getByID = catchAsync(async (req, res) => {
    const ingredient = await Ingredient.findById(req.params.id);
    if (ingredient) {
        res.send(ingredient);
    } else {
        res.status(404).send('Not Found');
    }
});

const updateByID = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    console.log("req.params = ", req.params);
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body);
    if (ingredient) {
        res.send(ingredient);
    } else {
        res.status(404).send('Not Found');
    }
});

const deleteByID = catchAsync(async (req, res) => {
    console.log("req.params.id = ", req.params.id);
    let ingredient = await Ingredient.findById(req.params.id);
    let recipes = [];
    for (let key in ingredient.recipe) {
        const recipe = await Recipe.findById(ingredient.recipe[key]);
        recipes.push(recipe.name);
    }
    console.log("recipes = ", recipes);

    if (recipes.length > 0) {
        res.status(400).send(recipes);
        return;
    }
    ingredient = await Ingredient.deleteOne({ _id: req.params.id });
    if (ingredient) {
        console.log("user delete = ", ingredient);
        res.send(ingredient);
    } else {
        res.status(404).send('Not Found');
    }
});

module.exports = {
    create,
    getAll,
    getByID,
    updateByID,
    deleteByID,
}