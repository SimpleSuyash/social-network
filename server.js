//import express
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

//create a new server instance
const app = express();
app.use(express.json());
//defining the port
const PORT = process.env.PORT || 3001;
let db;
const client = new MongoClient(process.env.SOCIAL_NETWORK_URI);

const startServerAfterSeeding = async () => {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        db = client.db(process.env.DB_NAME);
        // Drops any documents, if they exist
        await db.collection('thoughtList').deleteMany({});
        // Adds data to database
        const res = await db.collection('thoughtList').insertMany(data);
        console.log(res);
        app.listen(PORT, () => {
            console.log(`Example app listening at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Mongo connection error: ', error.message);
    }
};

startServerAfterSeeding();
