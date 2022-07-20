const options = require('./options/mariaDB')
const knex = require('knex')(options)

knex.schema.createTable('products', table =>{
    table.increments('id')
    table.string('name')
    table.integer('price')
    table.string('thumbnail')
    table.string('username')
})
    .then(() => console.log('table created'))
    .catch(error => {console.log(error); throw error} )
    .finally(()=>{
        knex.destroy()
    })