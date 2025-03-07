const mogooose = require('mongoose');

const extraCategorySchema = mogooose.Schema({
    extraCategoryName : {
        type : String,
        required : true
    },
    subCategoryId : {
        type : mogooose.Schema.Types.ObjectId,
        ref : 'subCategorie',
        required : true
    }
});

const extraCategoryModel = mogooose.model("extraCategorie", extraCategorySchema);
module.exports = extraCategoryModel;