exports.up = function (knex) {
    return knex.schema.createTable(`keywords`, (tb) => {
      tb.increments(`id`).primary()
      tb.string(`keyword`).index()
    })
  }
  
  exports.down = function (knex) {
    return knex.schema.dropTable(`keywords`)
  }
  