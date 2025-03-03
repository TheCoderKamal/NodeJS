const express = require("express");
const route = express.Router();
const ctl = require("../controller/adminCtl");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }   
});

const uploads = multer({storage: storage}).single("image");

route.get("/", ctl.dashboard);
route.get("/adminForm", ctl.adminForm);
route.post("/addAdmin", uploads, ctl.addAdmin);
route.get("/adminTable", ctl.adminTable);

module.exports = route;