const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const port = 1234;

const app = express();

const Storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename : (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

const upload = multer({storage : Storage}).single("image");

const db = require("./config/db");
const schema = require("./model/bookDetails.model");
const { execPath } = require("process");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

let books = [];

app.get("/", async (req, res) => {
    await schema.find({}).then(books => {
        res.render("home", {books})
    })
});

app.post("/add-book", upload, async (req, res) => {
    req.body.image = req.file.path;
    console.log(req.body)
    await schema.create(req.body).then(() => {
        res.redirect("/")
    })
})

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
})