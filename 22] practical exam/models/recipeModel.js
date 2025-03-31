const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true,
    }],
    instructions: [{
        type: String,
        required: true,
    }],
    prepTime: {
        type: Number,
        required: true,
    },
    cookTime: {
        type: Number,
        required: true,
    },
    totalTime: {
        type: Number,
        required: true,
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment",
    }],
}, { timestamps: true });

module.exports = mongoose.model("Recipe", RecipeSchema);
