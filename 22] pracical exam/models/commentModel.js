const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
    },
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);
