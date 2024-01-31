const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');


router.post('/', orderController.create);
router.get('/', orderController.getAll);
router.get('/:id', orderController.getByID);
router.patch('/:id', orderController.updateByID);
router.delete('/:id', orderController.deleteByID);

module.exports = router;