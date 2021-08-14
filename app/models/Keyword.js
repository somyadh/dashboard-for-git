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
		return 'keywords'
	}
	$beforeInsert() {
		this.created_at = new Date().toISOString()
	}

	static get modifers() {}

	static get relationMappings() {
		const User = require('./User').default
		return {
			users: {
				relation: Model.ManyToManyRelation,
				modelClass: User,
				join: {
					from: 'keywords.id',
					through: {
						from: 'user_keyword_map.keyword_id',
						to: 'user_keyword_map.user_id'
					},
					to: 'users.id'
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
