const express = require("express");
const route = express.Router();
const ctl = require("../controller/categoryCtl");
const multer = require("multer");
const passport = require("../middleware/passport");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

const upload = multer({storage: storage}).single("categoryImage");

route.get("/categoryForm", passport.checkAuth, ctl.categoryForm);
route.post("/addCategory", upload, ctl.addCategory);
route.get("/categoryTable", ctl.categoryTable);
route.get("/deleteCategory/:id", ctl.deleteCategory);
route.get("/editCategory/:id", ctl.editCategory);
route.post("/updateCategory", upload, ctl.updateCategory);

module.exports = route;