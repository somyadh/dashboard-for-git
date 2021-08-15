import knex from '../../../knex'
import Respond from '../../helpers/Respond'
import { SearchService } from '../../services/SearchService'

export const searchByRepo = async (req, res) => {
	let { keywords, user_id, domain } = req.body
	if (!keywords || !user_id) return Respond.err(res, 'MISSING_PARAMS')
	let result
	return await knex.transaction(async trx => {
		if (domain === 'repo') {
			result = await SearchService.searchByRepo(user_id, keywords, trx)
		}
		return Respond.reply(res, result)
	})
}
