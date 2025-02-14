const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/passport");
const db = mongoose.connection;

db.once("open", err => {
    err ? console.log("error : ", err) : console.log("Database connected...");
});

module.exports = db;