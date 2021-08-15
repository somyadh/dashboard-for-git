import moment from 'moment'
import Keyword from '../models/Keyword'
import UserKeywordMap from '../models/UserKeywordMap'
const bcrypt = require('bcrypt')
export class KeywordService {
	/**
	 * Fetch or insert keyword
	 * @param { keywords } list of keywords
	 * @param { object } trx
	 */
	static fetchOrInsertKeyword = async (keywords, trx = null) => {
		// get existed keyword
		let result = {},
			to_add = []
		let existing_keyword = await Keyword.query(trx).whereIn('keyword', keywords)

		//get the values not exiting
		if (existing_keyword.length !== keywords.length) {
			let temp = existing_keyword.map(x => x.keyword)
			to_add = keywords.filter(x => !temp.includes(x))
		}

		//insert new keywords
		let input = to_add.map(x => {
			return { keyword: x }
		})
		let new_keywords = await Keyword.query(trx).insert(input)

		//add all the keywords existing or new to putput
		result = new_keywords.map(x => {
			return { id: x.id, keyword: x.keyword }
		})
		result.push(
			...existing_keyword.map(x => {
				return { id: x.id, keyword: x.keyword }
			})
		)

		return result
	}

	/**
	 * Get existing keywords
	 * @param { keywords }  list of keywords
	 * @param { object } trx
	 */
	static getKeyword = async (keywords, trx = null) => {
		let result = []

		let temp = await Keyword.query(trx).where('Keyword', 'in', keywords)

		if (temp.length === 0) return { code: 'KEYWORD_NOT_FOUND' }

		result = temp.map(x => {
			return { id: x.id, keyword: x.keyword }
		})
		return result
	}

	/**
	 * Map keyword to user
	 * @param { keywords }  list of keywords
	 * @param { object } trx
	 */
	static mapKeywordToUser = async (keywords, user_id, trx = null) => {
		console.log(keywords, user_id)
		let keyword_details = await this.fetchOrInsertKeyword(keywords)

		keyword_details = keyword_details.map(x => x.id)

		//update existing mapping
		let updated = await UserKeywordMap.query(trx)
			.where('user_id', user_id)
			.whereIn('keyword_id', keyword_details)
			.patch({ searched_on: moment() })
			.returning('keyword_id')

		updated = updated.map(x => x.keyword_id)

		//create new mapping
		await Keyword.relatedQuery('users', trx)
			.for(keyword_details.filter(x => !updated.includes(x)))
			.relate({ id: user_id, created_at: moment(), searched_on: moment() })
			.debug()
	}

	/**
	 * Get keyword by user
	 * @param { keywords }  list of keywords
	 * @param { object } trx
	 */
	static getKeywordByUser = async (user_id, trx = null) => {
		let result = []

		let temp = await UserKeywordMap.query(trx).where('user_id', user_id).withGraphFetched('keyword')

		result = temp
		return result
	}
}
