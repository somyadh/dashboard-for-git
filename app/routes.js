import express from 'express'
import cors from 'cors'
import * as UserController from '../app/controllers/v1/UserController'
const router = express.Router()
const routes = express.Router()

router.use('/v1', routes)
router.use(cors())

routes.get('/', (req, res) => {
	res.send('Hello World!')
})

routes.post('/user/add', UserController.addUser)
routes.get('/user', UserController.getUser)
routes.patch('/user', UserController.updateUser)
routes.get('/user/conditions', UserController.getUsersByCondition)
export default router
