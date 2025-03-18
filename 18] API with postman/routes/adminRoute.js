const express = require('express');
const route = express.Router();
const adminCtl = require('../controller/adminCtl');

route.post("/addAdmin", adminCtl.addAdmin);
route.delete("/deleteAdmin/:id", adminCtl.deleteAdmin);
route.get("/viewAdmin", adminCtl.viewAdmin);
route.put("/updateAdmin/:id", adminCtl.updateAdmin);

module.exports = route;