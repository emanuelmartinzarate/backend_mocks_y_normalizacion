const express = require('express');
const router = express.Router();
const options = require('../options/sqlite')
const knex = require('knex')(options)


router.get('/', function(req, res, next) {
  knex.from('messages')
            .then( data => {
                res.json(data)              
            })
            .catch(err => console.log(err))
});

router.get('/:id', function(req, res, next) {
  knex('messages')
    .where({ id:  parseInt(req.params.id) })
    .then((data) => {
      if(data.length == 0){
        return res.status(400).send({error: `El mensaje con id ${req.params.id} no existe`})
      }
        res.json(data); 
      })
    .catch(err => console.log(err));
});

router.post('/', function(req, res, next) {
  const message =req.body
  knex('messages').insert(message)
        .then((data) =>{
          message.id = data[0]
          res.json(message)
        })
        .catch(err => console.log(err))
});

router.put('/', function(req, res, next) {
  knex('messages')
  .where({ id: parseInt(req.body.id) })
  .update({
    msn: req.body.msn,
    username: req.body.username
    })
  .then((data) => {
      if(data == 0){
        return res.status(400).send({error: `El mensaje con id ${req.body.id } no existe`})
      }
      res.json(req.body);
    })
  .catch(err => console.log(err));
});

router.delete('/:id', function(req, res, next) {
  knex('messages')
  .where({ id: parseInt(req.params.id) })
  .del()
  .then(() => { res.json(`El mensaje con id ${req.params.id} fue eliminado`); })
  .catch(err => console.log(err));
});

module.exports = router;
