const schema = require("../model/bookSchema.model");
const fs = require("fs");


module.exports.readData = async(req, res) => {
    res.render("index");
}

module.exports.addData = async(req, res) => {
    res.render("addAdmin");
}

module.exports.createAdmin = async(req, res) => {
    req.body.image = req.file.path;
    await schema.create(req.body).then(() => {
        res.redirect("/");
    });
}