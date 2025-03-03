const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/adminResetPass');
const db = mongoose.connection;

db.once("open", err => {
    err ? console.log("Error : ", err) : console.log("Database connected ...");
});

module.exports = db;