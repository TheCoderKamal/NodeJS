const express = require("express");
const passport = require("../middleware/passport");
const route = express.Router();
const ctl = require("../controller/extraCategoryCtl");

route.get("/extraCategoryForm", passport.checkAuth, ctl.extraCategoryForm);
route.post("/addExtraCategory", ctl.addExtraCategory);
route.get("/extraCategoryTable", passport.checkAuth, ctl.extraCategoryTable);

module.exports = route;