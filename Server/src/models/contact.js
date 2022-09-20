const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    contactArray : [{
    
    name:{type:String,required:true},
    designation:{type:String,required:true},
    company:{type:String,required:true},
    industry:{type:String,required:true},
    email:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
    country:{type:String,required:true},
    }],
    userId:{type:Schema.Types.ObjectId,ref:"user"},
});

const contact = mongoose.model("contact",contactSchema);

module.exports = contact;