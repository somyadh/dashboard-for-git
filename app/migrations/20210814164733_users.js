exports.up = function (knex) {
	return knex.schema.createTable(`users`, tb => {
		tb.increments(`id`).primary()
		tb.string(`username`).index()
		tb.string(`email`)
		tb.string(`password`)
		tb.boolean('is_admin').defaultTo(false)
		tb.timestamp('last_logged_in')
		tb.boolean('is_active')
		tb.timestamps()
		tb.timestamp(`deleted_at`).defaultTo(null)
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable(`users`)
}
