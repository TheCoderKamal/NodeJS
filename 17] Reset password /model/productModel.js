const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    extraCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "extraCategorie",
        required: true
    },
});


const productModel = mongoose.model("product", productSchema);
module.exports = productModel;