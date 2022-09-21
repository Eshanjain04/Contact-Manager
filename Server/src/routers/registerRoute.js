const express = require("express");
const data = require('../models/users')
const router = express.Router()
const bcrypt = require("bcrypt")
router.use(express.json())


router.post("/",async(req,res)=>{
    const password = req.body.password;
    const cnfPassword = req.body.cnfPassword;
    if(password != cnfPassword) return res.status(400).json({message:"Password doesnot match"});
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(req.body.password,salt)   

    const a =await data.create({
        mailid:req.body.mailid,
        password:hash
    })
    res.status(200).json({status:"Success"});
})


module.exports = router
