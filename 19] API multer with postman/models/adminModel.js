const mongoose = require("mongoose");

const schema = mongoose.Schema({
    adminImage: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const adminModel = mongoose.model("admin", schema);
module.exports = adminModel;