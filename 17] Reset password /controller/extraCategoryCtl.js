const extraCategoryModel = require("../model/extraCategoryModel");
const subCategoryModel = require("../model/subCategoryModel");

module.exports.extraCategoryForm = async (req, res) => {
    await subCategoryModel.find({}).then((subCategory) => {
        res.render("extraCategoryForm", {subCategory});
    });
};

module.exports.addExtraCategory = async (req, res) => {
    await extraCategoryModel.create(req.body).then(() => {
        res.redirect("/extraCategory/extraCategoryForm");
    });
};

module.exports.extraCategoryTable = async (req, res) => {
    await extraCategoryModel.find({}).populate("subCategoryId").then((extraCategory) => {
        res.render("extraCategoryTable", {extraCategory});
    });
};