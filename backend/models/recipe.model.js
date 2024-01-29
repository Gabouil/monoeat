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
        enum: ["starter", "main course", "dessert", "other"],
        default: 'other',
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [{
            ingredients: mongoose.Schema.Types.ObjectId,
            quantity: Number,
        }],
        ref: 'Ingredient',
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'easy',
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
    cookingTime: {
        type: {
            time: Number,
            unit: String,
        },
        required: true,
    },
    ustenciles: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    nutritionalValue: {
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