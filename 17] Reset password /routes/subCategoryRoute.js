const express = require('express');
const route = express.Router();
const ctl = require('../controller/subCategoryCtl');
const passport = require('../middleware/passport');

route.get('/subCategoryForm', passport.checkAuth, ctl.SubCategoryForm);
route.post('/addSubCategory', ctl.addSubCategory);
route.get('/subCategoryTable', passport.checkAuth, ctl.subCategoryTable);

module.exports = route;    