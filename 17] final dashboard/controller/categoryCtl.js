const categorySchema = require('../model/categoryModel');
const fs = require('fs');   

module.exports.categoryForm = (req, res) => {
    res.render("categoryForm");
};

module.exports.addCategory = async (req, res) => {
    req.body.categoryImage = req.file.path;
    await categorySchema.create(req.body).then(() => {
        res.redirect("/category/categoryForm");
    });
};

module.exports.categoryTable = async (req, res) => {
    await categorySchema.find({}).then((data) => {
        res.render("categoryTable", {data});
    });
};

module.exports.deleteCategory = async (req, res) => {
    const category = await categorySchema.findById(req.params.id);
    fs.unlinkSync(category.categoryImage);
    await categorySchema.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/category/categoryTable");
    });
};

module.exports.editCategory = async (req, res) => {
    await categorySchema.findById(req.params.id).then((category) => {
        res.render("categoryEdit", {category});
    });
};
module.exports.updateCategory = async (req, res) => {
    console.log(req.body);

    const category = await categorySchema.findById(req.body.id);
    let image;

    req.file ? image = req.file.path : image = category.categoryImage;
    fs.unlinkSync(category.categoryImage);
    req.body.categoryImage = image;
    
    await categorySchema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/category/categoryTable");
    });
};