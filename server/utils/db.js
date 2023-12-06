const mongoose = require('mongoose');

const dbConnection = () => {

    const dbURI = 'mongodb://localhost:27017/infosecfuture';

    mongoose.connect(dbURI);

    const db = mongoose.connection;

    // Handle connection events
    db.on('connected', () => {
        console.log('Connected to MongoDB');
    });

    db.on('error', (err) => {
        console.error('Connection error:', err);
    });


}


module.exports = dbConnection;