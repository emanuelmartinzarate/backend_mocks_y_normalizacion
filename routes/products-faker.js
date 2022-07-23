const express = require('express');
const router = express.Router();
const options = require('../options/mariaDB')
const knex = require('knex')(options)
const {faker} = require('@faker-js/faker')

function createProductMock(){
  return {
    name:faker.commerce.product(),
    price:faker.commerce.price(),
    image:faker.image.abstract()
  }
}

router.get('/', function(req, res, next) {
  res.json(createProductMock())
});

module.exports = router;
