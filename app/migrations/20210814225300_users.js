exports.up = function (knex) {
    return knex.schema.table('users', (table) => {
      table.boolean('is_rejected')
            .default(false)
    })
  }
  
  exports.down = function (knex) {
    return knex.schema.table('sources', (table) => {
      table.dropColumn('is_rejected')
    })
  }
  