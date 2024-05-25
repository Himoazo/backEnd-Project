const mongoose = require("mongoose");


//Schema for meals collection
const hamburger = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "namnet måste fyllas i"]
    },
    ingredients: {
        type: String,
        required: [true, "Ingredienser måste fyllas i"]
    },
    prices: {
        Singel: {
            type: Number,
            required: [true, "Pris för Singel måste vara ifylld"]
        },
        Double: {
            type: Number,
            required: [true, "Pris för Double måste vara ifylld"]
        }
    },
    created: {
        type: Date,
        default: Date.now
    }  
});

const sides = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, " tillbehör namnet måste fyllas i"]
    },
    prices: {
        small: {
            type: Number,
            required: [true, "Pris för liten måste vara ifylld"]
        },
        big: {
            type: Number,
            required: [true, "Pris för stor måste vara ifylld"]
        }
    },
    created: {
        type: Date,
        default: Date.now
    }  
});

const dippSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, " Dippnamn måste fyllas i"]
    },
    price: {
        type: Number,
        required: [true, " Dipp pris måste vara ifylld"]
    },
    created: {
        type: Date,
        default: Date.now
    } 
});

const meal = mongoose.model("meal", hamburger);
const side = mongoose.model("sides", sides);
const dipp = mongoose.model("dipp", dippSchema);


module.exports = {
    meal,
    side,
    dipp
};