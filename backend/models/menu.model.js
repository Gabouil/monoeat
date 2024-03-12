const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    recipes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Recipe',
        required: true,
    },
    date: {
        type: Date,
        required: true,
        unique: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('Menu', menuSchema);