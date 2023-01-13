//import mongoose from "mongoose";
const { mongoose } = require("mongoose")
const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact_number: {
        type: String
    },
    email: {
        type: String
    },
    interest: {
        type: String
    }
},
    { timestamp: true }
);


const Lead = mongoose.model('Lead', LeadSchema);
module.exports = Lead