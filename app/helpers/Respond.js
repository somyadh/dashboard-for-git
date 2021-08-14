// const _ = require('lodash')
// const Helpers = require('../helpers/httpAdapter')

module.exports = class Respond {
	static reply(res, data, code = 200) {
		return res.status(code).json({ data: data })
	}

	static err(res, code, data, status_code = 400) {
		return res.status(status_code).json({
			code: code,
			data: data
		})
	}
	static replyNothing(res) {
		return this.reply(res, {})
	}

	static unauthorized(res, msg = Errors.ACCESS_DENIED) {
		return res.status(401).json({
			code: msg
		})
	}
}
