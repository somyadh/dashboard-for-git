import { config } from 'dotenv'
import cors from 'cors'
import express, { json, urlencoded } from 'express'
import routes from './routes'
import passport from 'passport'
import Authenticator from './middlewares/authenticator'

/** Load environment variables. */
config()

/** Instantiate ExpressJS */
const app = express()

/** Configure server settings. */
app.set('host', '0.0.0.0')
app.set('port', process.env.PORT)

/** Setup api settings. */
app.use(json())
app.use(urlencoded({ extended: true }))
app.options('*', cors())

/** Configure api routing strategies. */
app.use('/', routes)

app.use(passport.initialize())
Authenticator.init()

export default app
