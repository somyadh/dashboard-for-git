import knex from '../../../knex'
import Respond from '../../helpers/Respond'
import { ReportService } from '../../services/ReportService'

export const userReport = async (req, res) => {
	let { admin_id, user_id, frequency } = req.query
	if (!admin_id || !user_id) return Respond.err(res, 'MISSING_PARAMS')
	let result
	return await knex.transaction(async trx => {
		result = await ReportService.getUserReport(parseInt(admin_id), parseInt(user_id), frequency, trx)
		if (result.code) return Respond.err(res, result.code)
		return Respond.reply(res, result)
	})
}
