const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
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
            recipe: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
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
        default: 'pending'
    },
    total: {
        type: Number,
        default: 0
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
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);