const model = require("../model/adminModel");

module.exports.dashboard = (req, res) => {
    res.render("dashboard");
};

module.exports.adminForm = (req, res) => {
    res.render("adminForm");
};

module.exports.addAdmin = async(req, res) => {
    req.body.image = req.file.path;
    await model.create(req.body).then(() => {
        res.redirect("/adminForm");
    })
};

module.exports.adminTable = async(req, res) => {
    await model.find({}).then((data) => {
        res.render("adminTable", {data});
    });
};