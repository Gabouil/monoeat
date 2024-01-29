const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/', userController.create);
router.get('/', userController.getAll);
router.post('/login', userController.login);
router.get('/:id', userController.getByID);
router.patch('/:id', userController.updateByID);
router.delete('/:id', userController.deleteByID);

module.exports = router;