const adminModel = require("../models/adminModel");
const fs = require('fs');

module.exports.viewAdmin = async(req, res) => {
    await adminModel.find({}).then((data) => {
        res.status(200).json(data);
    });
};

module.exports.addAdmin = async(req, res) => {
    req.body.adminImage = req.file.path;
    await adminModel.create(req.body).then(() => {
        res.status(200).json({
            message: "Data added successfully",
        });
    });
};

module.exports.deleteAdmin = async(req, res) => {
    const admin = await adminModel.findById(req.params.id);
    fs.unlinkSync(admin.adminImage);

    await adminModel.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({message: "Admin deleted"});
    });
};

module.exports.updateAdmin = async(req, res) => {
    const admin = await adminModel.findById(req.params.id);
    let image;

    req.file ? image = req.file.path : req.body.adminImage;
    req.file && fs.unlinkSync(admin.adminImage);
    req.body.adminImage = image;

    await adminModel.findByIdAndUpdate(req.params.id, req.body).then(() => {
        res.status(200).json({message: "Admin updated ...."});
    });
};