const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/21_jwt_and_bcryptjs");
const db = mongoose.connection;

db.once("open", err => {
    err ? console.log("error: ", err) : console.log("Database connected ...");
});

module.exports = db;