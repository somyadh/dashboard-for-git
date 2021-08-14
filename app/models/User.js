import { Model } from 'objection'
import knex from '../../knex'
import softDelete from 'objection-soft-delete'

Model.knex(knex)

class User extends softDelete({
	columnName: `deleted_at`,
	deletedValue: knex.fn.now(),
	notDeletedValue: null
})(Model) {
	static get tableName() {
		return 'users'
	}
	$beforeInsert() {
		this.created_at = new Date().toISOString()
	}

	static get modifers() {}

	static get relationMappings() {
		const Keyword = require('./Keyword').default
		return {
			keywords: {
				relation: Model.ManyToManyRelation,
				modelClass: Keyword,
				join: {
					from: 'users.id',
					through: {
						from: 'user_keyword_map.user_id',
						to: 'user_keyword_map.keyword_id'
					},
					to: 'keywords.id'
				}
			}
		}
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [],
			properties: {
				id: { type: 'integer' },
				deleted: { type: 'boolean' }
			}
		}
	}
}

export default User
