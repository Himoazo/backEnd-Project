/**
 * Kontakt routes
 */
const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//Connect to db
mongoose.createConnection(process.env.uri6).asPromise(); //contact

//Contact schema
const contactSchema = new mongoose.Schema({
    customername: {
        type: String,
        required: [true, " Kundnamn måste anges"]
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    message:{
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    } 
});

const Contact = mongoose.model("contact", contactSchema);

//Load contact us messages
router.get("/", authenticatetoken, async(req, res)=>{
    try{
        let messages = await Contact.find({});
        
        return res.json({messages});
    }catch(error){
        return res.status(500).json(error);
    }
});

//contact us POST request
router.post("/", async(req, res)=>{
    try{
        let message = await Contact.create(req.body);
        return res.json(message);
    }catch(error){
        return res.status(400).json(error);
    }
});

//Delete message
router.delete("/:id", authenticatetoken, async(req, res)=>{
    let id = req.params.id;

    try{
        let result = await Contact.deleteOne({_id: id});
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});


//Validate token
function authenticatetoken(req, res, next){

    if (!req.headers['authorization']) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }
    
    const authHeader = req.headers['authorization'];
        
    if(authHeader == null || !authHeader){
        res.status(401).json({message: " Not authorized for this route - token is missing"});
    }

    const token = authHeader.split(' ')[1];
    //Verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err)=>{
        if(err){
            return res.status(403).json({message: "Invalid JWT"});
        }
        next();
    });
}

module.exports = router;