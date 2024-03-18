const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');


router.post('/', recipeController.create);
router.get('/', recipeController.getAll);
router.get('/:id', recipeController.getByID);
router.patch('/:id', recipeController.updateByID);
router.delete('/:id', recipeController.deleteByID);
router.post('/fake/:number', recipeController.fakeRecipe);

module.exports = router;