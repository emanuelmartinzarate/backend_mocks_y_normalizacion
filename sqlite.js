const options = require('./options/sqlite')
const knex = require('knex')(options)

knex.schema.createTable('messages', table =>{
    table.increments('id')
    table.string('msn')
    table.string('username')
})
    .then(() => console.log('table created'))
    .catch(error => {console.log(error); throw error} )
    .finally(()=>{
        knex.destroy()
    })