const express = require("express");
const contact = require("../models/contact");

const router = express.Router();
const csv = require("csvtojson")
const multer = require("multer")

router.use(express.json());
router.use(express.urlencoded({extended:true}));

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

router.get("/",async(req,res)=>{
    const data = await contact.findOne({userId:req.user})

    if(data!=null){
        res.json({data:data.contactArray})
    }else{
        res.json({data:[]})
    }
})


router.post('/',upload.single("csv"),async(req,res)=>{
    try{
        csv()
        .fromFile(req.file.path)
        .then(async(jsonObj)=>{
            console.log(jsonObj)
            const userData = await contact.findOne({userId:req.user});
            if(!userData){
                console.log("user not found");
                await contact.create({
                    contactArray:jsonObj,
                    userId:req.user
                });
            }else{
                console.log("user found");
                for(let i=0;i<jsonObj.length;i++){
                    userData.contactArray.push(jsonObj[i]);
                }
                await contact.updateOne({userId:req.user},{contactArray:userData.contactArray});
            }
            res.status(200).json({status:"Success"})
        })
    }
    catch(e){
        res.status(400).json({status:"failed"})
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const ids = req.params.id.split(",");
        console.log(ids);
        const data = await contact.updateOne({userId:req.user.toString()},{$pull:{contactArray:{_id:{$in:ids}}}});
        //const contactData = await contact.find({userId:req.user.toString()},{contactArray:{$elemMatch:{phoneNumber:phoneNumbers}}});
        res.status(200).json({
            Status:"Success",
        })
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
});

module.exports = router
