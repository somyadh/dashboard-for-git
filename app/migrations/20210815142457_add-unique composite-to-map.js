exports.up = function (knex) {
	return knex.schema.table(`user_keyword_map`, tb => {
		tb.unique(['user_id', 'keyword_id'])
	})
}

exports.down = function (knex) {
	return knex.schema.table(`user_keyword_map`, tb => {
		tb.dropUnique(['user_id', 'keyword_id'])
	})
}
