const Order = require('../models/order.model');
const catchAsync = require('../helpers/catchAsync');

const create = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    const order = await Order.create(req.body);
    res.send(order);
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
    updateByID,
    deleteByID,
}