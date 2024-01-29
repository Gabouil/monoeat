const Recipe = require("../models/recipe.model");
const catchAsync = require("../helpers/catchAsync");

const create = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    const recipe = await Recipe.create(req.body);
    res.send(recipe);
});

const getAll = catchAsync(async (req, res) => {
    const recipes = await Recipe.find(req.query);
    res.send(recipes);
});

const getByID = catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
        res.send(recipe);
    } else {
        res.status(404).send('Not Found');
    }
});

const updateByID = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    console.log("req.params = ", req.params);
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
    if (recipe) {
        res.send(recipe);
    } else {
        res.status(404).send('Not Found');
    }
});

const deleteByID = catchAsync(async (req, res) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (recipe) {
        console.log("recipe delete = ", recipe);
        res.send(recipe);
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