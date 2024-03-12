const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');


router.post('/', menuController.create);
router.get('/:date', menuController.getMenu);
router.patch('/:date', menuController.updateMenu);
router.delete('/:date', menuController.deleteMenu);

module.exports = router;