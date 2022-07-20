const express = require('express');
const router = express.Router();

let products = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'E-commerce',formProduct:'Enter new Product' });
});

module.exports = router;
