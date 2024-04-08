const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    favorites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Recipe',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    billingInfo: {
        type: {
            firstname: String,
            lastname: String,
            email: String,
            phone: String,
            company: String,
            country: String,
            address: String,
            address2: String,
            postalCode: String,
            city: String,
        },
    },
    deliveryInfo: {
        type: {
            firstname: String,
            lastname: String,
            email: String,
            phone: String,
            company: String,
            country: String,
            address: String,
            address2: String,
            postalCode: String,
            city: String,
        },
    },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);