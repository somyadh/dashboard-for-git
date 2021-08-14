import { Model } from 'objection'
import knex from '../../knex'
import softDelete from 'objection-soft-delete'

Model.knex(knex)

class Keyword extends softDelete({
	columnName: `deleted_at`,
	deletedValue: knex.fn.now(),
	notDeletedValue: null
})(Model) {
	static get tableName() {
		return 'user_keyword_map'
	}
	$beforeInsert() {
		this.created_at = new Date().toISOString()
	}

	static get modifers() {}

	static get relationMappings() {
		const Keyword = require('./Keyword').default
		const User = require('./User').default
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'user_keyword_map.user_id',
					to: 'users.id'
				}
			},
			keyword: {
				relation: Model.BelongsToOneRelation,
				modelClass: Keyword,
				join: {
					from: 'user_keyword_map.keyword_id',
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

export default Keyword
