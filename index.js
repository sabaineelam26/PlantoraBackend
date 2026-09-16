const { initializeDB } = require("./db/db.connect");
const express = require("express"); 
const app = express(); 
const cors = require("cors"); 
require("dotenv").config();  


app.use(cors()); 
app.use(express.json()); 


initializeDB(); 

