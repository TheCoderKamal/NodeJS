const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/BookProject");
const db = mongoose.connection;

db.once("open", err => {
    err ? console.log("Error : ", err) : console.log("Database Connected...");
});

module.exports = db;