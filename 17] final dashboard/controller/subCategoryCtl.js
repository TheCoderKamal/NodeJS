const categoryModel = require('../model/categoryModel');
const subCategoryModel = require('../model/subCategoryModel');

module.exports.SubCategoryForm = async (req, res) => {
    await categoryModel.find({}).then((category) => {
        res.render('subCategoryForm', {category});
    });
};

module.exports.addSubCategory = async(req, res) => {
    console.log(req.body);
    await subCategoryModel.create(req.body).then(() => {
        res.redirect('/subCategory/subCategoryTable');
    });
};

module.exports.subCategoryTable = async (req, res) => {
    await subCategoryModel.find({}).populate('categoryId').then((subCategory) => {
        res.render('subCategoryTable', {subCategory});
        console.log(subCategory);
    });
};