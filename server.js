//import express
const express = require('express');
const { connectionToDb, getDb } = require('./config/connection');

//create a new server instance
const app = express();
app.use(express.json());
//defining the port
const PORT = process.env.PORT || 3001;
let db;
connectionToDb((error)=>{
    if(!error){
        app.listen(PORT, () => {
            console.log(`Example app listening at http://localhost:${PORT}`);
        });
        db = getDb();
    }
});