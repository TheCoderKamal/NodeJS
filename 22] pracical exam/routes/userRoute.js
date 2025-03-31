const express = require('express');
const multer = require('multer');
const route = express.Router();
const storage = require('../middlewares/multer');
const userCtl = require('../controllers/userController');

const uploads = multer({ storage: storage }).single('avatar');

route.post('/registration', uploads, userCtl.registration);
// route.get('/login', userCtl.loginPage);
route.post('/login', userCtl.login);

module.exports = route;