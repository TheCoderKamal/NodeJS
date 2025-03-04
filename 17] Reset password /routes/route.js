const express = require("express");
const route = express.Router();
const ctl = require("../controller/adminCtl");
const multer = require("multer");
const passport = require("../middleware/passport");
const passportt = require("passport");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }   
});

const uploads = multer({storage: storage}).single("image");

route.get("/", ctl.login);
route.post("/login", passportt.authenticate("local", {failureRedirect : "/"}), ctl.adminLogin);
route.get("/logout", ctl.logout);
route.get("/dashboard", passport.checkAuth, ctl.dashboard);
route.get("/adminForm", passport.checkAuth, ctl.adminForm);
route.post("/addAdmin", uploads, ctl.addAdmin);
route.get("/adminTable", passport.checkAuth, ctl.adminTable);
route.get("/deleteAdmin/:id", passport.checkAuth, ctl.deleteAdmin);
route.get("/editAdmin/:id", passport.checkAuth, ctl.editAdmin);
route.post("/updateAdmin", uploads, ctl.updateAdmin);
route.get("/adminProfile", passport.checkAuth, ctl.adminProfile);
route.get("/changePassword", passport.checkAuth, ctl.changePassword);
route.post("/updatePassword", ctl.updatePassword);  
route.post("/changeForgotPassword", ctl.changeForgotPassword);
route.get("/changeForgotPasswordPage", ctl.changeForgotPasswordPage);
route.post("/changeOtpPassword", ctl.changeOtpPassword);

module.exports = route;