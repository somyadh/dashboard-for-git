exports.up = function (knex) {
	return knex.schema.createTable(`user_keyword_map`, tb => {
		tb.increments(`id`).primary()
		tb.integer(`user_id`).index().references(`id`).inTable(`users`).onDelete(`SET NULL`)
		tb.integer(`keyword_id`).references(`id`).inTable(`keywords`).onDelete(`SET NULL`)
		tb.timestamps()
		tb.timestamp('searched_on')
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable(`user_keyword_map`)
}
