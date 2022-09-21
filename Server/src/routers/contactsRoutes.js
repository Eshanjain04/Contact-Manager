const express = require("express");
const contact = require("../models/contact");

const router = express.Router();
const csv = require("csvtojson")
const multer = require("multer")

var storage = multer.diskStorage(
    {
        destination: 'src/uploads',
        filename: function ( req, file, cb ) {
            const [name,extension] = file.originalname.split(".");
            filename = name +"."+ extension;
            cb( null, filename);
        }
    }
);

var upload = multer( { storage: storage } );
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get("/",async(req,res)=>{
    const data = await contact.findOne({userId:req.user})

    if(data!=null){
        res.json({data:data.contactArray})
    }else{
        res.json({data:[]})
    }
})


router.post('/',upload.single("file"),async(req,res)=>{
    try{
        csv()
        .fromFile(req.file.path)
        .then(async(jsonObj)=>{
            console.log(jsonObj)
            await contact.create({
                contactArray:jsonObj,
                userId:req.user
            });
            res.status(200).json({status:"Success"})
        })
    }
    catch(e){
        res.status(400).json({status:"failed"})
    }
   
})

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
