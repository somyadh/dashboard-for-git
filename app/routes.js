import express from 'express'
import cors from 'cors'

const router = express.Router()
const routes = express.Router()

router.use('/v1', routes)
router.use(cors())

routes.get('/', (req, res) => {
	res.send('Hello World!')
})

export default router
