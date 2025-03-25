const express = require('express');
const route = express.Router();
const adminCtl = require("../controllers/adminCtl");
const adminAuth = require("../middlewares/auth");
const adminModel = require('../models/adminModel');

route.post('/registerAdmin', adminCtl.registerAdmin);
route.post('/loginAdmin', adminCtl.loginAdmin);
route.get('/viewAdmin', adminAuth, adminCtl.viewAdmin);
route.post('/changePassword', adminAuth, adminCtl.changePassword);
route.post('/OTPInMail', adminCtl.OTPInMail);
route.post('/verifyOTP', adminCtl.verifyOTP);

module.exports = route;