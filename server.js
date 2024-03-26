//import express
const express = require('express');
const connectionToDB= require('./config/connection');
// Import routes configuration
const routes = require('./routes'); 
//import middleware
const {clog} = require('./utils/clog');

//defining the port
const PORT = process.env.PORT || 3001;

//create a new server instance
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clog);

// turn on routes
app.use(routes);

// Start the server
connectionToDB.once('open', ()=>{
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
    });
});
