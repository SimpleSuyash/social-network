const mongoose = require('mongoose');
require('dotenv').config();

// Wrap Mongoose around local connection to MongoDB
// mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
mongoose.connect('mongodb://127.0.0.1:27017/social_network_db');

module.exports = mongoose.connection;