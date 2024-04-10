const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: [true, 'Order must have a number'],
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Order must belong to a user']
    },
    recipes : [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Recipe',
                required: [true, 'Order must belong to a product']
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'paid', 'delivered', 'cancelled'],
        default: 'pending',
        required: [true, 'Order must have a status']
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: [true, 'Order must have a total price']
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
        required: [true, 'Order must have a delivery info']
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
        required: [true, 'Order must have a billing info']

    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);