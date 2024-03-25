//import express
const express = require('express');
const connectionToDB= require('./config/connection');

//defining the port
const PORT = process.env.PORT || 3001;
// Import routes configuration
// const routes = require('./routes'); 
//create a new server instance
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
// app.use(routes);
connectionToDB.once('open', ()=>{
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
    });
});
