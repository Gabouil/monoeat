const Menu = require("../models/menu.model");
const catchAsync = require("../helpers/catchAsync");

const create = catchAsync(async (req, res) => {
  const menu = new Menu(req.body);
  await menu.save();
  res.status(201).json(menu);
});

const getMenu = catchAsync(async (req, res) => {
    if (req.query.category) {
        const menu = await Menu.findOne({ date: req.params.date }).populate({
            path: 'recipes',
            populate: {
                path: 'ingredients.ingredient',
                model: 'Ingredient'
            }
        });
        const recipes = menu.recipes.filter((recipe) => recipe.category === req.query.category);
        recipes.forEach(recipe => {
            recipe.image = "http://localhost:3000/images/" + recipe.image;
        });
        res.status(200).json(recipes);
    } else {
        const menu = await Menu.findOne({date: req.params.date});
        res.status(200).json(menu);
    }
});

const updateMenu = catchAsync(async (req, res) => {
    req.body.recipes = req.body.recipes ? JSON.parse(req.body.recipes) : [];
    const menu = await Menu.findOneAndUpdate({ date: req.params.date }, req.body)
    if (menu) {
        res.send(menu);
    } else {
        res.status(404).send('Not Found');
    }
});

const deleteMenu = catchAsync(async (req, res) => {
    await Menu.findOneAndDelete({ date: req.params.date });
    res.status(204).json();
});


module.exports = {
    create,
    getMenu,
    updateMenu,
    deleteMenu,
}