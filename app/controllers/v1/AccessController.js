import Respond from '../../helpers/Respond'
import User from '../../models/User'

export const login = async (req, res) => {
	const { username } = req.body

	// get user
	const user = await User.query().where({ username: username, deleted_at: null }).first()

	if (!user) return Respond.err(res, 'INVALID_CREDENTIALS')
	if (user.is_active === false) return Respond.err(res, 'NOT_ALLOWED')

	// login with passport.js
	req.login(user, { session: false }, err => {
		if (err) return Respond.err(res, 'INVALID_CREDENTIALS')

		// format response
		return Respond.reply(res, {
			user: {
				id: user.id,
				username: user.username,
				email: user.email
			}
		})
	})
}
