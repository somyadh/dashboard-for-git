import express from 'express'
import cors from 'cors'
import * as UserController from '../app/controllers/v1/UserController'
import * as SearchController from '../app/controllers/v1/SearchController'
const router = express.Router()
const routes = express.Router()

router.use('/v1', routes)
router.use(cors())

routes.get('/', (req, res) => {
	res.send('Hello World!')
})

//user
routes.post('/user/add', UserController.addUser)
routes.get('/user', UserController.getUser)
routes.patch('/user', UserController.updateUser)
routes.get('/user/conditions', UserController.getUsersByCondition)

//search
routes.post('/search', SearchController.searchByRepo)

export default router
