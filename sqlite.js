const options = require('./options/sqlite')
const knex = require('knex')(options)

knex.schema
.createTable('author', table =>{
    table.string('id')
    table.string('nombre')
    table.string('apellido')
    table.string('edad')
    table.string('alias')
    table.string('avatar')
})
    .then(() => console.log('table author created'))
    .catch(error => {console.log(error); throw error} )
    .finally(()=>{
        knex.destroy()
    })

knex.schema.createTable('message', table =>{
    table.string('author').unsigned().notNullable().references('id').inTable('author').onDelete('CASCADE').index()
    table.string('message')
})
    .then(() => console.log('table message created'))
    .catch(error => {console.log(error); throw error} )
    .finally(()=>{
        knex.destroy()
    })
