// import moment from 'moment'
const moment = require('moment')
const bcrypt = require('bcrypt')
exports.seed = async knex => {
	// Inserts seed entries
	// Deletes ALL existing entries
	await knex('users').del()
	return await knex('users').insert({
		username: 'admin',
		email: 'admin@admin.com',
		password: await bcrypt.hash('admin123', 5),
		is_admin: true,
		created_at: moment(),
		is_active: true
	})
}
