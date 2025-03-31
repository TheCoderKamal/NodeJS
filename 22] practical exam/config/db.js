const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Recipe_Sharing_Platform');
const db = mongoose.connection;

db.once('open', err => {
    err ? console.log('err: ', err) : console.log('Database connected...');
});

module.exports = db;