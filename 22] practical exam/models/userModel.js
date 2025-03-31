const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    avatar: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String, 
        unique: true 
    },
    password: {
        type: String,
        required: true,
    },
    role: { 
        type: String, 
        enum: ["user", "admin"],
        default: "user", 
    },
    recipes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Recipe"
    }],
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
