// import moment from 'moment'
const moment = require('moment')
const bcrypt = require('bcrypt')
exports.seed = async knex => {
	// Inserts seed entries
	// Deletes ALL existing entries
	await knex('users').del()
	return await knex('users').insert({
		username: 'admin',
		email: 'som.dhingra@yahoo.in',
		password: await bcrypt.hash('abc123', 5),
		is_admin: true,
		created_at: moment()
	})
}
