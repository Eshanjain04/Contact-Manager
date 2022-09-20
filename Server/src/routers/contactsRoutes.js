const express = require("express");
const contact = require("../models/contact");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.delete("/:phoneNumbers",async(req,res)=>{
    try{
        const phoneNumbers = req.params.phoneNumbers.split(",").map(Number);
        const data = await contact.updateOne({userId:req.user.toString()},{$pull:{contactArray:{phoneNumber:{$in:phoneNumbers}}}});
        const contactData = await contact.find({userId:req.user.toString()},{contactArray:{$elemMatch:{phoneNumber:phoneNumbers}}});
        res.status(200).json({
            status:"Success",
            message:data
        })
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
});

module.exports = router
