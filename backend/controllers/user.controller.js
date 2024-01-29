const User = require('../models/user.model');
const catchAsync = require('../helpers/catchAsync');

const create = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    const user = await User.create(req.body);
    res.send(user);
});

const getAll = catchAsync(async (req, res) => {
    const users = await User.find(req.query);
    res.send(users);
});

const getByID = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send('Not Found');
    }
});

const updateByID = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    console.log("req.params = ", req.params);
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send('Not Found');
    }
});

const deleteByID = catchAsync(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
        console.log("user delete = ", user);
        res.send(user);
    } else {
        res.status(404).send('Not Found');
    }
});

const login = catchAsync(async (req, res) => {
   console.log("req.body = ", req.body);
   const user = await User.findOne(req.body);
   if (user) {
       res.send(user);
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
    login,
}