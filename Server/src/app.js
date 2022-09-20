const express = require("express");
const app = express();
const loginRoutes = require("./routers/loginRoutes");
const contactRoutes = require("./routers/contactsRoutes");
const jwt = require("jsonwebtoken");
const user = require("./models/users");
require("dotenv").config();
const secret = process.env.SECRET;

app.use("/login",loginRoutes);

app.use("/contact",async (req,res,next)=>{
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token,secret);
        const userData = await user.findOne({_id:decoded.data});
        req.user = userData._id;
        next();
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})

app.use("/contact",contactRoutes);

module.exports = app;