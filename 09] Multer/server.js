const express = require("express");
const port = 3000;
const path = require("path")
const fs = require("fs");
const app = express();
const multer = require("multer");

const Storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname + "-" + Date.now());
    }
})

const upload = multer({storage : Storage}).single("image");

const db = require("./config/db");
const schema = require("./model/bookSchema.model")

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.get("/", async (req, res) => {
    await schema.find({}).then(books => {
        res.render("home", {books});
    })
})

app.post("/add-book", upload ,async (req, res) => {
    req.body.image = req.file.path
    await schema.create(req.body).then(() => {
        res.redirect("/");
    })
})

app.get("/delete/:id", async (req, res) => {
    const singleData = await schema.findById(req.params.id);
    fs.unlinkSync(singleData.image);
    await schema.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/");
    })
})

app.get("/edit/:id", async (req, res) => {
    await schema.findById(req.params.id).then(data => {
        res.render("update", {data});
    })
})

app.post("/update-book", upload,  async (req, res) => {
    console.log(req.body)
    const singleData = await schema.findById(req.body.id);
    let img;

    console.log(singleData)
    
    console.log(req.file)
    req.file ? img = req.file.path : req.body.image;
    req.file && fs.unlinkSync(singleData.image);
    req.body.image = img;
    console.log(req.body)
    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/");
    })
})

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
})