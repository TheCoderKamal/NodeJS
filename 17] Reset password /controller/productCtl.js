const productModel = require('../model/productModel');
const extraCategoryModel = require('../model/extraCategoryModel');

module.exports.productForm = async (req, res) => {
    const extraCategory = await extraCategoryModel.find();
    res.render('productForm', { extraCategory });
};

module.exports. addProduct = async (req, res) => {
    req.body.productImage = req.file.path;

    await productModel.create(req.body).then(() => {
        res.redirect("/product/productForm");
    })
};

module.exports.productTable = async (req, res) => {
    const product = await productModel.find().populate({
        path: "extraCategoryId",
        populate: {
            path: "subCategoryId",
            populate: {
                path: "categoryId"  
            }
        }
    });
    res.render('productTable', { product });
};