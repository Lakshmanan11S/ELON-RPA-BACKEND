const express = require('express');
const  cors = require('cors');
const  bodyParser = require('body-parser');
const PORT = 7000;
const app = express()
require('dotenv').config();
const router = require('./Router')
const mongoose = require('mongoose');

mongoose.connect(process.env.DATA_BASE)
.then(()=>{console.log("Db connected")})
.catch((error)=>{console.log("Db not connected",error)})



app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Elon Health Care")
})
app.use('/',router)

app.listen(PORT,()=>{console.log("sever is running on:",PORT)})