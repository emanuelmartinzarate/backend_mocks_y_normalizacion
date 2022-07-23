const express = require('express');
const router = express.Router();
const {faker} = require('@faker-js/faker')

function createProductMock(){
  return {
    name:faker.commerce.product(),
    price:faker.commerce.price(),
    image:faker.image.abstract()
  }
}

router.get('/', function(req, res, next) {
  const productsFacker = []
  for(let i=0; i<5; i++){
    productsFacker.push(createProductMock())
  }
  res.json(productsFacker)
});

module.exports = router;
