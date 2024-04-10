const Order = require('../models/order.model');
const User = require('../models/user.model');
const Recipe = require('../models/recipe.model');
const catchAsync = require('../helpers/catchAsync');

const create = catchAsync(async (req, res) => {
    let order = {}
    order.user = req.body.user;

    const lastOrder = await Order.find().sort({orderNumber: -1}).limit(1);
    order.orderNumber = lastOrder[0]?.orderNumber + 1 || 1;

    order.recipes = req.body.recipes ? JSON.parse(req.body.recipes) : [];
    if (order.recipes.length === 0) {
        res.status(400).send('No recipes in the order');
        return;
    }

    const recipePrices = await Promise.all(order.recipes.map(async (recipe) => {
        const foundRecipe = await Recipe.findById(recipe.id);
        return foundRecipe.price * recipe.quantity;
    }));
    order.totalPrice = recipePrices.reduce((a, b) => a + b, 0) + 5; // 5 est le prix de livraison

    order.status = 'pending';

    const user = await User.findById(order.user);
    order.deliveryInfo = user.deliveryInfo;
    order.billingInfo = user.billingInfo;

    const newOrder = await Order.create(order);
    console.log("newOrder = ", newOrder);
    res.send(newOrder);
});

const getAll = catchAsync(async (req, res) => {
    const orders = await Order.find(req.query);
    res.send(orders);
});

const getByID = catchAsync(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send('Not Found');
    }
});

const getLastOrderByUser = catchAsync(async (req, res) => {
    const order = await Order.find({user: req.params.id})
        .sort({orderNumber: -1})
        .limit(1)
        .populate('recipes.id');

    if (order) {
        res.send(order[0]);
    } else {
        res.status(404).send('Not Found');
    }
});

const updateByID = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    console.log("req.params = ", req.params);
    const order = await Order.findByIdAndUpdate(req.params.id, req.body);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send('Not Found');
    }
});

const deleteByID = catchAsync(async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) {
        console.log("order delete = ", Order);
        res.send(order);
    } else {
        res.status(404).send('Not Found');
    }
});


module.exports = {
    create,
    getAll,
    getByID,
    getLastOrderByUser,
    updateByID,
    deleteByID,
}