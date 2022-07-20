const express = require('express');
const router = express.Router();
const options = require('../options/mariaDB')
const knex = require('knex')(options)


router.get('/', function(req, res, next) {
  knex.from('products')
            .then( data => {
                res.json(data)              
            })
            .catch(err => console.log(err))
});

router.get('/:id', function(req, res, next) {
  knex('products')
    .where({ id:  parseInt(req.params.id) })
    .then((data) => {
      if(data.length == 0){
        return res.status(400).send({error: `El producto con id ${req.params.id} no existe`})
      }
        res.json(data); 
      })
    .catch(err => console.log(err));
});

router.post('/', function(req, res, next) {
  const product =req.body
  knex('products').insert(product)
        .then((data) =>{
          product.id = data[0]
          res.json(product)
        })
        .catch(err => console.log(err))
});

router.put('/', function(req, res, next) {
  knex('products')
  .where({ id: parseInt(req.body.id) })
  .update({
    name: req.body.name,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    username: req.body.username
    })
  .then((data) => {
      if(data == 0){
        return res.status(400).send({error: `El producto con id ${req.body.id } no existe`})
      }
      res.json(req.body);
    })
  .catch(err => console.log(err));
});

router.delete('/:id', function(req, res, next) {
  knex('products')
  .where({ id: parseInt(req.params.id) })
  .del()
  .then(() => { res.json(`El producto con id ${req.params.id} fue eliminado`); })
  .catch(err => console.log(err));
});

module.exports = router;
