const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        }
    },
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            itemType: {
                type: String,
                required: true,
                enum: ['meal', 'side', 'dipp'] 
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "in progress", "ready", "completed"],
        default: "pending"
    }
}, { timestamps: true });

const Order = mongoose.model("order", orderSchema);


module.exports = Order;