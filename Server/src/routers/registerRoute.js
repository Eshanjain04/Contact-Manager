const express = require("express");
const data = require('../models/users')
const router = express.Router()
const bcrypt = require("bcrypt")
router.use(express.json())


router.post("/",async(req,res)=>{
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(req.body.password,salt)   

    const a =await data.create({
        mailid:req.body.mailid,
        password:hash
    })
    res.send("Success")
})


module.exports = router
