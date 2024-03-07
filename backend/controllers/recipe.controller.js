const Recipe = require("../models/recipe.model");
const Ingredient = require("../models/ingredient.model");
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


    const recipe = await Recipe.create(req.body);

    console.log(recipe._id);
    let ingredientUpdated
    console.log("req.body.ingredients = ", req.body.ingredients.length);
    if (req.body.ingredients.length === 0) {
        const ingrediantExiste = await Ingredient.find({ recipe: recipe._id })
        console.log("ingrediantExiste = ", ingrediantExiste.length);
        ingredientUpdated = await ingrediantExiste.map(async recipe => {
            recipe.recipe.splice(recipe._id, 1);
            await recipe.save();
            return "Delete : " + recipe.name;
        });

        console.log("ingredientUpdated = ", ingredientUpdated);
    } else {
        ingredientUpdated = await Promise.all(req.body.ingredients.map(async (ingredient) => {
            const ingrediantExiste = await Ingredient.findById(ingredient.ingredient);
            console.log("ingrediantExiste = ", ingrediantExiste);
            if (!ingrediantExiste.recipe.includes(recipe._id)) {
                ingrediantExiste.recipe.push(recipe._id);
                await ingrediantExiste.save();
                return "Add : " + ingrediantExiste.name;
            }
            ingrediantExiste.recipe.map(async recipe => {
                if (recipe !== recipe._id) {
                    ingrediantExiste.recipe.splice(recipe, 1);
                    await ingrediantExiste.save();
                    return "Delete : " + ingrediantExiste.name;
                }
            });
        }));
    }

    console.log(ingredientUpdated);
    res.send(recipe);
});

const getAll = catchAsync(async (req, res) => {
    const recipes = await Recipe.find(req.query);
    const recipesDetails = await Promise.all(recipes.map(async recipe => {
        let RecetteNew = recipe.toObject();
        RecetteNew.ingredients = await Promise.all(recipe.ingredients.map(async ingredient => {
            const ingredientsDetails = await Ingredient.findById(ingredient.ingredient);
            return {ingredients:ingredientsDetails, quantity: ingredient.quantity};
        }));
        RecetteNew.image = "http://localhost:3000/images/" + RecetteNew.image;
        return RecetteNew;
    }));
    res.send(recipesDetails);
});

const getByID = catchAsync(async (req, res) => {


    const recipe = await Recipe.findById(req.params.id);
    recipe.image = "http://localhost:3000/images/" + recipe.image;
    console.log(recipe);

    if (recipe) {
        res.send(recipe);
    } else {
        res.status(404).send('Not Found');
    }
});

const updateByID = catchAsync(async (req, res) => {
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
    let ingredientUpdated
    if (req.body.ingredients.length === 0) {
        const ingrediantExiste = await Ingredient.find({ recipe: req.params.id })
        ingredientUpdated = await ingrediantExiste.map(async recipe => {
            recipe.recipe.splice(req.params.id, 1);
            await recipe.save();
            return "Delete : " + recipe.name;
        });
    } else {
        ingredientUpdated = await Promise.all(req.body.ingredients.map(async (ingredient) => {
            const ingrediantExiste = await Ingredient.findById(ingredient.ingredient);
            if (!ingrediantExiste.recipe.includes(req.params.id)) {
                ingrediantExiste.recipe.push(req.params.id);
                await ingrediantExiste.save();
                return "Add : " + ingrediantExiste.name;
            }
            ingrediantExiste.recipe.map(async recipe => {
                if (recipe !== req.params.id) {
                    ingrediantExiste.recipe.splice(recipe, 1);
                    await ingrediantExiste.save();
                    return "Delete : " + ingrediantExiste.name;
                }
            });
        }));
    }

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
    if (recipe) {
        res.send(recipe);
    } else {
        res.status(404).send('Not Found');
    }
});

const deleteByID = catchAsync(async (req, res) => {
    let recipe = await Recipe.findById(req.params.id);

    for (let key in recipe.ingredients) {
        const ingredient = await Ingredient.findById(recipe.ingredients[key].ingredient);
        const index = ingredient.recipe.indexOf(req.params.id);
        ingredient.recipe.splice(index, 1);
        Ingredient.findByIdAndUpdate(recipe.ingredients[key].ingredient, ingredient);
    }

    recipe = await Recipe.deleteOne({ _id: req.params.id });
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