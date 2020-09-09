var express = require('express');
var companyController = require('../controller/companyController');
var router = express.Router();

router.post('/add-company', companyController.addCompany);

module.exports = router;