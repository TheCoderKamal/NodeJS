const mongoose = require("mongoose");

const schema = mongoose.Schema({
    image : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    publish_date : {
        type : Date,
        required : true
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    sold_copies : {
        type : Number,
        required : true,
        min : 0
    }
});

const bookDetails = mongoose.model("BookDatabase", schema);
module.exports = bookDetails;