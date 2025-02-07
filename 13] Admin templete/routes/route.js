const ctl = require("../controller/multerCtl");
const express = require("express");
const route = express.Router();
const multer = require("multer");

const Storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"public/uploads/")
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname + "-" + Date.now());
    }
})

const upload = multer({storage : Storage}).single("image");

route.get("/", ctl.readData);
route.get("/addAdmin", ctl.addData);
route.post("/createAdmin", upload, ctl.createAdmin);

module.exports = route;