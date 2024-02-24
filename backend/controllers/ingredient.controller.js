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
    const RecipesWithIngredient = await Recipe.find({"ingredients.ingredient": req.params.id}.name);

    if (RecipesWithIngredient.length > 0) {
        for(let key in RecipesWithIngredient) {
            RecipesWithIngredient[key] = RecipesWithIngredient[key].name;
        }
        res.status(400).send(RecipesWithIngredient);
        return;
    }
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
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