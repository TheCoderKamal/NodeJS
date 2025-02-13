const mongoose = require("mongoose");

const schema = mongoose.Schema({
    image : {
        type : String,
        required : true,
    },
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        required : true,
    },
    hobbies : {
        type : Array,
        required : true,
    },
});

const adminModule = mongoose.model("adminPanelProject", schema);
module.exports = adminModule;