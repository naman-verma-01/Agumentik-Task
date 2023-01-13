const mongoose = require('mongoose')
const express = require('express')
const port = process.env.PORT || 1800;
const app = express();
const MONGODB_URI = 'mongodb://localhost/Agumentik'
const AdminController = require('./controller/AdminController')
const LeadController = require('./controller/LeadController')
const PageDataController = require('./controller/PageDataController')

const {json} = require('body-parser')
var cors = require('cors');
app.use(json());
app.use(cors())
app.use("/admin/", AdminController);
app.use("/lead/", LeadController);
app.use("/pageData/", PageDataController);



const start = async () => {
    mongoose.Promise = global.Promise;

    await mongoose.connect(MONGODB_URI);

    app.listen(port || port, async () => {
        console.log(`Server Connected To Port: ${port}`)
        
    });

};

start();