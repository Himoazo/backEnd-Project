/**
 * Authenticating routes
 */
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Connect to db
mongoose.connect(process.env.uri).then(()=>{
    console.log("Connected to Mongodb")
}).catch((error)=>{
    console.error("Connecting to Mong faild" + error);
});

//User schema
const User = require("../models/user");

//Registrera användare
router.post("/register", async (req, res)=>{
    try{
        const {username, password, email} = req.body;

        //Validation
        if(!username || !password || !email){
            return res.status(400).json({error: "Invalid input"});
        }

        //Successful user registration
        const user = new User({username, password, email});
        await user.save();

        res.status(201).json({message: "User is created"});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
        console.log(error);
    }
});

//logga in användare
router.post("/login", async (req, res)=>{
    try{
        const {username, password} = req.body;

        //Validation
        if(!username || !password){
            return res.status(400).json({error: "Invalid username/password"});
        }

        //Existing user
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({error: "Incorrect username/password"});
        }

        //Password check
        const passMatch = await user.comparePassword(password);
        if(!passMatch){
            return res.status(401).json({error: "Incorrect username/password!"});
        }else{
            //JWT
            const payload = {username: username};
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
        
            return res.status(200).json(token);
        }
        
    }catch(error){
        res.status(500).json({message: "Internal server error!"});
    }
});

module.exports = router;