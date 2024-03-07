const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    recipe: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Recipe',
    },
    unit: {
        type: String,
        enum: [ "mg", 'cg',"g", "kg", "ml", "cl", "l", "cuillère à café", "cuillère à soupe", "verre", "tasse", "bol", "pincée", "unité"],
        default: '',
        required: true,
    },
    allergens: {
        type: Boolean,
        default: false,
        required: true,
    },
    category: {
        type: String,
        enum: ["légumes", "viandes", "poissons", "produits laitiers", "fruits", "épices", "autres"],
        default: 'other',
        required: true,
    },
    optional: {
        type: Boolean,
        default: false,
        required: true,
    },
    optionalUnit: {
        type: String,
        enum: [ "mg", 'cg',"g", "kg", "ml", "cl", "l", "cuillère à café", "cuillère à soupe", "verre", "tasse", "bol", "pincée", "unité"],
    },
    optionalQuantity: {
        type: Number,
    },
    optionalPrice: {
        type: Number,
    }
}, {timestamps: true});

module.exports = mongoose.model('Ingredient', ingredientSchema);