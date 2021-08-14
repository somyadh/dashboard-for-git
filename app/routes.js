import express from 'express'
import cors from 'cors'
import { TemperatureConvert } from '../app/controller/Temperature'

const router = express.Router()
const routes = express.Router()

router.use('/v1', routes)
router.use(cors())

routes.get('/', (req, res) => {
	res.send('Hello World!')
})

routes.get('/temperature/convert', TemperatureConvert)

export default router
