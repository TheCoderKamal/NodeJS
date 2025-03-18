const adminModel = require('../model/adminModel');

module.exports.addAdmin = async(req, res) => {
    await adminModel.create(req.body).then(() => {
        res.status(200).json({msg: "admin added successfully !!!"});
    });  
};

module.exports.deleteAdmin = async(req, res) => {
    await adminModel.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({msg: "admin deleted successfully !!!"});
    });
};

module.exports.viewAdmin = async(req, res) => {
    await adminModel.find().then((data) => {
        res.status(200).json(data);
    });
};

module.exports.updateAdmin = async(req, res) => {
    await adminModel.findByIdAndUpdate(req.params.id, req.body).then(() => {
        res.status(200).json({msg: "admin updated successfully !!!"});
    });
};