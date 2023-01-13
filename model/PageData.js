//import mongoose from "mongoose";
const { mongoose } = require("mongoose")
const PageDataSchema = new mongoose.Schema({
    TopSlide: [{
        name : String,
        image : String
    }],
    BottomSlide: [{
        name : String,
        image : String
    }],
    facebook: {
        type: String
    },
    instagram: {
        arr: String
    }
},
    { timestamp: true }
);


const PageData = mongoose.model('PageData', PageDataSchema);
module.exports = PageData