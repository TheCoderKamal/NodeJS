const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/API_With_Postman');
const db = mongoose.connection;

db.once("open", err => {
    err ? console.log(err) : console.log("Database connected successfully");
});

module.exports = db;