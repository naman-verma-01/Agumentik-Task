//import mongoose from "mongoose";
const {mongoose} = require("mongoose")
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type:String
    },
    email:{
        type:String
    }
},
{timestamp:true}
);


const Admin = mongoose.model('Admin', AdminSchema);
module.exports =  Admin