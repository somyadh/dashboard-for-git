import knex from '../../../knex'
import Respond from '../../helpers/Respond'
import { UserService } from '../../services/UserServices'

export const addUser = async (req, res) => {
	let user = req.body
	if (!user || !user.username || !user.password) return Respond.err(res, Errors.MISSING_PARAMS)

	return await knex.transaction(async trx => {
		let result = await UserService.addUser(user, trx)
		if (result.code) return Respond.err(res, result.code)
		return Respond.replyNothing(res)
	})
}

export const getUser = async (req, res) => {
	let { user_id } = req.query

	return await knex.transaction(async trx => {
		let result = await UserService.getUser(user_id, trx)
		if (result.code) return Respond.err(res, result.code)
		return Respond.reply(res, result)
	})
}

export const updateUser = async (req, res) => {
	let { admin_id, user_id, update } = req.body
	if (!user_id || !update) return Respond.err(res, Errors.MISSING_PARAMS)

	return await knex.transaction(async trx => {
		let result = await UserService.updateUser(admin_id, user_id, update, trx)
		if (result.code) return Respond.err(res, result.code)
		return Respond.replyNothing(res)
	})
}

export const getUsersByCondition = async (req, res) => {
	let { active, rejected, suspended, deleted, inactive, admin } = req.query
	let conditions = {
		active: active ? true : false,
		rejected: rejected ? true : false,
		suspended: suspended ? true : false,
		deleted: deleted ? true : false,
		admin: admin ? true : false,
		inactive: inactive ? true : false
	}
	return await knex.transaction(async trx => {
		let result = await UserService.getUsersByCondition(conditions, trx)
		if (result.code) return Respond.err(res, result.code)
		return Respond.reply(res, result)
	})
}
