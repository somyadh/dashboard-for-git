import express from 'express'
import cors from 'cors'
import passport from 'passport'
import * as UserController from '../app/controllers/v1/UserController'
import * as SearchController from '../app/controllers/v1/SearchController'
import * as AccessController from './controllers/v1/AccessController'
import Respond from './helpers/Respond'

const router = express.Router()
const routes = express.Router()

router.use('/v1', routes)
router.use(cors())

routes.get('/', (req, res) => {
	res.send('Hello World!')
})

/* access */
routes.post(
	'/user/login',
	(req, res, next) => {
		passport.authenticate('local', { session: false }, (err, user, info) => {
			if (err) return next(err)
			if (!user) {
				return Respond.unauthorized(res, 'INVALID_CREDENTIALS')
			}
			next()
		})(req, res, next)
	},
	AccessController.login
)

//user
routes.post('/user/add', UserController.addUser)
routes.get('/user', UserController.getUser)
routes.patch('/user', UserController.updateUser)
routes.get('/user/conditions', UserController.getUsersByCondition)

//search
routes.post('/search', SearchController.searchByRepo)

export default router
