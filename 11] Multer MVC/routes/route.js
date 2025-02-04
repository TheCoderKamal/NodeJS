const ctl = require("../controller/multerCtl");
const express = require("express");
const route = express.Router();
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

route.get("/", ctl.readData);
route.post("/add-book", upload, ctl.addData);
route.get("/delete/:id", ctl.deleteData);
route.get("/edit/:id", ctl.editData);
route.post("/update-book", upload, ctl.updateData);

module.exports = route;