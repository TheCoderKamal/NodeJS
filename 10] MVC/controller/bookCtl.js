const schema = require("../model/bookSchema.model");

module.exports.readBook = async(req, res) => {
    await schema.find({}).then(books => {
        res.render("home", {books});
    });
}

module.exports.addBook = async(req, res) => {
    await schema.create(req.body).then(() => {
        res.redirect("/");
    });
}

module.exports.deleteBook = async(req, res) => {
    await schema.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/");
    });
}

module.exports.editBook = async(req, res) => {
    await schema.findById(req.params.id).then(data => {
        res.render("update", {data});
    });
}

module.exports.updateBook = async(req, res) => {
    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/");
    });
}