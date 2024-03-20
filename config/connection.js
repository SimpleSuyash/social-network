const { MongoClient } = require('mongodb');
require('dotenv').config();
const client = new MongoClient(process.env.SOCIAL_NETWORK_URI);
let dbConnection;

const connectionToDb = async(cb)=>{
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        dbConnection = client.db(process.env.DB_NAME);
        // Drops any documents, if they exist
        await dbConnection.collection('thoughtList').deleteMany({});
        // Adds data to database
        // const res = await dbConnection.collection('thoughtList').insertMany(data);
        // console.log(res);
        return cb();
    } catch (error) {
        console.error('Mongo connection error: ', error.message);
        return cb(error);
    }
};

const getDb = ()=> dbConnection;

module.exports ={ connectionToDb, getDb};