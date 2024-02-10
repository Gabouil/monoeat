const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
    },
    category: {
        type: String,
        enum: ["entrées", "plats", "desserts", "autres"],
        default: 'autres',
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [{
            ingredient: mongoose.Schema.Types.ObjectId,
            quantity: Number,
        }],
        ref: 'Ingredient',
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['facile', 'moyen', 'difficile'],
        default: 'facile',
        required: true,
    },
    comments: {
        type: [{
            user: mongoose.Schema.Types.ObjectId,
            comment: String,
        }],
        ref: 'Comment',
    },
    score: {
        type: [{
            user: mongoose.Schema.Types.ObjectId,
            score: Number,
        }],
        default: 0,
        min: 0,
        max: 5,
    },
    recipeSteps: {
        type: [String],
        required: true,
    },
    cookTime: {
        type: {
            time: Number,
            unit: String,
        },
        required: true,
    },
    utensils: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    nutritionalValues: {
        type: {
            calories: Number,
            lipids: Number,
            carbohydrates: Number,
            proteins: Number,
            sels: Number,
        },
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('Recipe', recipeSchema);