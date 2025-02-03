const express = require("express");
const route = express.Router();
const ctl = require("../controller/bookCtl");

route.get("/", ctl.readBook);
route.post("/add-book", ctl.addBook);
route.get("/delete/:id", ctl.deleteBook);
route.get("/edit/:id", ctl.editBook);
route.post("/update-book", ctl.updateBook);

module.exports = route;