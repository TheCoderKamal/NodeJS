const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    subCategoryName: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorie',
        required: true
    }
});

const subCategoryModel = mongoose.model("subCategorie", subCategorySchema);
module.exports = subCategoryModel;