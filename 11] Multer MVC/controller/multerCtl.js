const schema = require("../model/bookSchema.model");
const fs = require("fs");


module.exports.readData = async(req, res) => {
    await schema.find({}).then(books => {
        res.render("home", {books});
    });
}

module.exports.addData = async(req, res) => {
    req.body.image = req.file.path
    await schema.create(req.body).then(() => {
        res.redirect("/");
    });
}

module.exports.deleteData = async(req, res) => {
    const singleData = await schema.findById(req.params.id);
    fs.unlinkSync(singleData.image);
    await schema.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/");
    });
}

module.exports.editData = async(req, res) => {
    await schema.findById(req.params.id).then(data => {
        res.render("update", {data});
    });
}

module.exports.updateData = async(req, res) => {
    console.log(req.body)
    const singleData = await schema.findById(req.body.id);
    let img;
    
    console.log(req.file)
    req.file ? img = req.file.path : req.body.image;
    req.file && fs.unlinkSync(singleData.image);
    req.body.image = img;
    console.log(req.body)
    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/");
    });
}