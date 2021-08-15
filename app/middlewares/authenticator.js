import passport from 'passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import User from '../models/User'


export default class Authenticator {
	/**
	 * Initialize PassportJs
	 * 1) Local Strategy - On login
	 * 2) JWT Stragegy - for restricetd resources
	 * */
	static init() {
		/** Local Strategy */
		passport.use(
			new passportLocal.Strategy(
				{
					usernameField: 'username',
					passwordField: 'password'
				},
				async (username, password, cb) => {
					// get user
					const user = await User.query()
						.orWhere({ username: username, deleted_at: null })
						.first()

					if (!user) return cb(null, false, { msg: 'Invalid credentials' })

					// match password
					const password_check = await bcrypt.compare(password, user.password)
					if (!password_check) return cb(null, false, { msg: 'Invalid credentials' })

					return cb(null, user, { msg: 'success logged in' })
				}
			)
		)
	}

}
