import { UserService } from './UserServices'
import { KeywordService } from './KeywordService'
const { Octokit } = require('@octokit/rest')
const octokit = new Octokit()

export class SearchService {
	/**
	 * Search repo
	 * @param { user_id } user id
	 * @param { keywords } list of keywords
	 * @param { object } trx
	 */
	static searchByRepo = async (user_id, keywords, trx = null) => {
		let result = {}
		let user = (await UserService.getUser(user_id, trx))[0]
		if (user.code) return result

        //process keywords to create format as per required by GIT API
		let processed_keyword = this._keywordProcessor(keywords)
		if (processed_keyword.length === 0) return { code: 'KEYWORDS_LENGTH_EXCEEDED' }
		let q = 'q=' + processed_keyword

		let data = await octokit.rest.search.repos({
			q
		})

        //process the outpur from GIT API as required
		result = this._SearchAPIResponseFormatter(data.data)
        console.log(result)
		if (result.length > 0) {
			await KeywordService.mapKeywordToUser(keywords, user.id, trx)
		}
		return result
	}

	static _keywordProcessor = keywords => {
		//limitations from GIT API
		//Queries longer than 256 characters are not supported
		//You can't construct a query using more than five AND, OR, or NOT operators
		let result
		result = keywords.join('+')
		if (result.length > 256) return ''
		return result
	}

	static _SearchAPIResponseFormatter = data => {
		let result = []
		for (let i of data.items) {
			result.push({
				name: i.name,
				owner: { login: i.owner.login, url: i.owner.html_url },
				url: i.html_url,
				language: i.language,
				last_updated: i.updated_at,
				licensed_under: i.license ? i.license.name : null
			})
		}
		return result
	}
}
