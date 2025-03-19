const express = require('express');
const route = express.Router();
const adminCtl = require('../controllers/adminCtl');
const storage = require('../middlewares/multer');
const multer = require('multer');

const uploads = multer({ storage: storage }).single('adminImage');

route.get('/viewAdmin', adminCtl.viewAdmin);
route.post('/addAdmin', uploads, adminCtl.addAdmin);
route.delete("/deleteAdmin/:id", adminCtl.deleteAdmin);
route.put("/updateAdmin/:id", uploads, adminCtl.updateAdmin);

module.exports = route;