const Recipe = require("../models/recipe.model");
const catchAsync = require("../helpers/catchAsync");
const path = require("path");

const create = catchAsync(async (req, res) => {
    const localPath = path.join(__dirname, '../public/uploads/images/recipes/', req.files.image.name);
    await req.files.image.mv(localPath);
    req.body.image = req.files.image.name;
    req.body.recipeSteps = req.body.recipeSteps ? JSON.parse(req.body.recipeSteps) : [];
    req.body.utensils = req.body.utensils ? JSON.parse(req.body.utensils) : [];
    req.body.cookTime = req.body.cookTime ? JSON.parse(req.body.cookTime) : {};
    req.body.nutritionalValues = req.body.nutritionalValues ? JSON.parse(req.body.nutritionalValues) : {};
    req.body.ingredients = req.body.ingredients ? JSON.parse(req.body.ingredients) : [];

    console.log(req.body);
    const recipe = await Recipe.create(req.body);
    res.send(recipe);
});

const getAll = catchAsync(async (req, res) => {
    const recipes = await Recipe.find(req.query);
    res.send(recipes);
});

const getByID = catchAsync(async (req, res) => {


    const recipe = await Recipe.findById(req.params.id);
    recipe.image = "http://localhost:3000/images/" + recipe.image;
    console.log(recipe);

    if (recipe) {
        res.send(recipe);
        res.sendFile(imagePath);
    } else {
        res.status(404).send('Not Found');
    }
});

const updateByID = catchAsync(async (req, res) => {
    console.log(req.body);
    if (req.files) {
        const localPath = path.join(__dirname, '../public/uploads/images/recipes/', req.files.image.name);
        await req.files.image.mv(localPath);
        req.body.image = req.files.image.name;
    }
    req.body.recipeSteps = req.body.recipeSteps ? JSON.parse(req.body.recipeSteps) : [];
    req.body.utensils = req.body.utensils ? JSON.parse(req.body.utensils) : [];
    req.body.cookTime = req.body.cookTime ? JSON.parse(req.body.cookTime) : {};
    req.body.nutritionalValues = req.body.nutritionalValues ? JSON.parse(req.body.nutritionalValues) : {};
    req.body.ingredients = req.body.ingredients ? JSON.parse(req.body.ingredients) : [];

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