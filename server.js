//Express
const express = require("express");
const app = express();
app.use(express.json());
// dotenv
require("dotenv").config();
const PORT = process.env.PORT || 3000;
//Cors
const cors = require("cors");
app.use(cors());
//JWT
const jwt = require("jsonwebtoken");
//Require routes
const authRoutes = require("./routes/auth");

const mongoose = require("mongoose");

mongoose.createConnection(process.env.uri2).asPromise(); //meals collection
mongoose.createConnection(process.env.uri3).asPromise(); //sides collection
mongoose.createConnection(process.env.uri4).asPromise(); //Dipps
mongoose.createConnection(process.env.uri5).asPromise(); //Orders

const {meal, side, dipp } = require("./models/meals.js");
const order = require("./models/order.js");

//Routing
app.use("/api/auth", authRoutes);

//GET request
//Menu
app.get("/api/", async(req, res)=>{
    try{
        let meals = await meal.find({});
        let sides = await side.find({});
        let dipps = await dipp.find({});
        
        return res.json({meals, sides, dipps});
    }catch(error){
        return res.status(500).json(error);
    }
});
//Orders
app.get("/api/orders", async(req, res)=>{
    try{
        let orders = await order.find({});
        
        return res.json({orders});
    }catch(error){
        return res.status(500).json(error);
    }
});
//GET Order by ID
app.get("/api/orders/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let orderById = await order.findById(id);

        return res.json({ orderById });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

//Hantera POST requests
//Hamburger
app.post("/api/meals", authenticatetoken, async(req, res)=>{
    try{
        let result = await meal.create(req.body);
        return res.json(result);
    }catch(error){
        return res.status(400).json(error);
    }
});

//Sides
app.post("/api/sides", authenticatetoken, async(req, res)=>{
    try{
        let result = await side.create(req.body);
        return res.json(result);
    }catch(error){
        return res.status(400).json(error);
    }
});

//Dipps
app.post("/api/dipps", authenticatetoken, async(req, res)=>{
    try{
        let result = await dipp.create(req.body);
        return res.json(result);
    }catch(error){
        return res.status(400).json(error);
    }
});
//Orders
app.post("/api/orders", async(req, res)=>{
    try{
        let result = await order.create(req.body);
        return res.json(result);
    }catch(error){
        return res.status(400).json(error);
    }
});

//Hantera DELETE requests
//Hamburger
app.delete("/api/meals/:id", authenticatetoken, async(req, res)=>{
    let id = req.params.id;

    try{
        let result = await meal.deleteOne({_id: id});
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});
//Sides
app.delete("/api/sides/:id", authenticatetoken, async(req, res)=>{
    let id = req.params.id;

    try{
        let result = await side.deleteOne({_id: id});
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});
//Dipps
app.delete("/api/dipps/:id", authenticatetoken, async(req, res)=>{
    let id = req.params.id;

    try{
        let result = await dipp.deleteOne({_id: id});
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});
//Orders
app.delete("/api/orders/:id", authenticatetoken, async(req, res)=>{
    let id = req.params.id;

    try{
        let result = await order.deleteOne({_id: id});
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});

//Hantera PUT requests
//Hamburger
app.put("/api/meals/:id", authenticatetoken, async(req, res)=>{
    let id = req.params.id;
    let item = req.body;
    
    try{
        let result = await meal.updateOne({_id: id}, {$set: item}, { new:true, runValidators: true, upsert: true });
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});

//Sides
app.put("/api/sides/:id", authenticatetoken, async(req, res)=>{
    let id = req.params.id;
    let item = req.body;
    
    try{
        let result = await side.updateOne({_id: id}, {$set: item}, { new:true, runValidators: true, upsert: true });
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});
//Dipps
app.put("/api/dipps/:id", authenticatetoken, async(req, res)=>{
    let id = req.params.id;
    let item = req.body;
    
    try{
        let result = await dipp.updateOne({_id: id}, {$set: item}, { new:true, runValidators: true, upsert: true });
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});
//Orders
app.put("/api/orders/:id", authenticatetoken, async(req, res)=>{
    let id = req.params.id;
    let item = req.body;
    
    try{
        let result = await order.updateOne({_id: id}, {$set: item}, { new:true, runValidators: true, upsert: true });
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});
//Validate token
function authenticatetoken(req, res, next){
    
    const authHeader = req.headers['authorization'];
        
    if(authHeader == null){
        res.status(401).json({message: " Not authorized for this route - token is missing"});
    }

    const token = authHeader.split(' ')[1];
    //Verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username)=>{
        if(err){
            return res.status(403).json({message: "Invalid JWT"});
        }
        
        req.username = username;
        next();
    });
}

//Starting application
app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});