const express = require('express');
const  cors = require('cors');
const  bodyParser = require('body-parser');
const PORT = 8000;
const app = express()
require('dotenv').config();
const router = require('./Router')

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Elon Health Care")
})
app.use('/',router)

app.listen(PORT,()=>{console.log("sever is running on:",PORT)})