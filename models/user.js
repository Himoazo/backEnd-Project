const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["staff", "admin"],
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Hash password
userSchema.pre("save", async function(next){
    try{
        if(this.isNew || this.isModified("password")){
            const hashed = await bcrypt.hash(this.password, 10);
            this.password = hashed;
            next();
        }
    }catch(error){
        next(error);
    }
});

// Register user
userSchema.statics.register = async function(username, password, email){
    try{
        const user = this({username, password, email});
        await user.save;
        return user;
    }catch(error){
        throw(error);
    }
}

//Compare hashed password
userSchema.methods.comparePassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password);
    }catch(error){
        throw error;
    }
}

const User = mongoose.model("user", userSchema);
module.exports = User;