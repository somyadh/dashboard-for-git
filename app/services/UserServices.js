import moment from 'moment'
import User from '../models/User'
const bcrypt = require('bcrypt')
export class UserService {
	/**
	 * Add new user
	 * @param { user } user obj
	 * @param { object } trx
	 */
	static addUser = async (user, trx = null) => {
		// get existed user
		let result = {}
		let existingUser = await User.query(trx).where('username', user.username)

		if (existingUser.length > 0) {
			result = { code: 'USER_EXISTS' }
		} else {
			//insert user
			await User.query(trx).insert({
				username: user.username,
				email: user.email,
				password: await bcrypt.hash(user.password, 5)
			})
		}
		return result
	}

	/**
	 * Get list of users or specifc user details
	 * @param { user_id } user id
	 * @param { object } trx
	 */
	static getUser = async (user_id, trx = null) => {
		let result = [],
			users
		if (user_id) {
			users = await User.query(trx).where({ id: user_id, is_active: true, deleted_at: null })
		} else {
			users = await User.query(trx).where({ is_active: true, deleted_at: null })
		}

		if (users.length === 0) return { code: 'USER_NOT_FOUND' }
		result = users.map(x => {
			return { id: x.id, username: x.username }
		})
		return result
	}

	/**
	 * Update user
	 * @param { user_id } user id
	 * @param { object } new values
	 * @param { object } trx
	 */
	static updateUser = async (admin_id, user_id, update, trx = null) => {
		let result = {},
			user,
			admin
		try {
			admin = await User.query(trx).findById(admin_id)
			if (!admin.is_admin) return { code: 'USER_NOT_AUTHORISED' }

			user = await User.query(trx).findById(user_id)
			if (!user) return { code: 'USER_NOT_FOUND' }
			if (update.approve) await user.$query(trx).patch({ is_active: true })
			if (update.reject) await user.$query(trx).patch({ is_active: false, is_rejected: true })
			if (update.suspend) await user.$query(trx).patch({ is_active: false })
			if (update.delete) await user.$query(trx).patch({ is_active: false, deleted_at: moment() })
			if (update.admin) {
				if (user.is_active && user.deleted_at === null) await user.$query(trx).patch({ is_admin: true })
			}

			return result
		} catch (error) {
			return { code: error }
		}
	}

	/**
	 * Get list of users or specifc user details
	 * @param { object } conditions
	 * @param { object } trx
	 */
	static getUsersByCondition = async (conditions, trx = null) => {
		let result = [],
			users

		users = User.query(trx)
		console.log(conditions)
		if (conditions.active === true) users.where({ is_active: true, deleted_at: null })
		if (conditions.rejected === true) users.where({ is_rejected: true, deleted_at: null })
		if (conditions.suspended === true) users.where({ is_active: false, deleted_at: null })
		if (conditions.deleted === true) users.whereNot({ deleted_at: null })
		if (conditions.inactive === true) users.where({ is_active: false, deleted_at: null, is_rejected: false })

		if (conditions.admin === true) users.where({ is_admin: true, is_active: true, deleted_at: null })
		else users.where({ is_admin: false })

		let qr = await users

		if (qr.length === 0) return { code: 'USER_NOT_FOUND' }
		result = qr.map(x => {
			return { id: x.id, username: x.username }
		})
		return result
	}
}
