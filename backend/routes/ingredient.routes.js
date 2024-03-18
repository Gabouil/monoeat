const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredient.controller');


router.post('/', ingredientController.create);
router.get('/', ingredientController.getAll);
router.get('/:id', ingredientController.getByID);
router.patch('/:id', ingredientController.updateByID);
router.delete('/:id', ingredientController.deleteByID);
router.post('/fake/:number', ingredientController.fakeIngredient);

module.exports = router;