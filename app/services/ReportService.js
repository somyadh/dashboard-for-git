import { UserService } from './UserServices'
import { KeywordService } from './KeywordService'
import moment from 'moment'
import User from '../models/User'

export class ReportService {
	/**
	 * Search repo
	 * @param { user_id } user id
	 * @param { keywords } list of keywords
	 * @param { object } trx
	 */
	static getUserReport = async (admin_id, user_id, frequency, trx = null) => {
		let result = {}
		let admin = await User.query(trx).findById(admin_id)
		if (!admin || !admin.is_admin) return { code: 'USER_NOT_AUTHORISED' }

		let user = (await UserService.getUser(user_id, trx))[0]
		if (user.code) return result

		let list_of_keywords = await KeywordService.getKeywordByUser(user_id, trx)

		//process the outpur from GIT API as required
		result = this._keywordsByFrequency(list_of_keywords, frequency)

		if (result.length > 0) {
			await KeywordService.mapKeywordToUser(keywords, user.id, trx)
		}
		return result
	}

	static _keywordsByFrequency = (keywords, frequency) => {
		let temp
		if (frequency === 'daily') {
			let dates_so_far = []
			for (let i of keywords) {
				let current_date = moment(i.searched_on).format('DD-MM-YYYY')
				if (dates_so_far.includes(current_date)) {
					temp[current_date].push(i.keyword.keyword)
				} else {
					temp[current_date] = [i.keyword.keyword]
					dates_so_far.push(current_date)
				}
			}
			return temp
		} else if (frequency === 'monthly') {
			let dates_so_far = []
			for (let i of keywords) {
				let current_month = moment(i.searched_on).format('MM-YYYY')
				if (dates_so_far.includes(current_month)) {
					temp[current_month].push(i.keyword.keyword)
				} else {
					temp[current_month] = [i.keyword.keyword]
					dates_so_far.push(current_month)
				}
			}
			return temp
		} else if (frequency === 'weekly') {
			let dates_so_far = []
			for (let i of keywords) {
				let current_week = moment(i.searched_on).format('Wo')
				if (dates_so_far.includes(current_week)) {
					temp[current_week].push(i.keyword.keyword)
				} else {
					temp[current_week] = [i.keyword.keyword]
					dates_so_far.push(current_week)
				}
			}
			return temp
		}
	}
}
