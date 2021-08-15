exports.up = function (knex) {
	return knex.schema.table('keywords', table => {
		table.timestamp('created_at')
	})
}

exports.down = function (knex) {
	return knex.schema.table('keywords', table => {
		table.dropColumn('created_at')
	})
}
