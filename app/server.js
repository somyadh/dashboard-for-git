import app from './app'
import http from 'http'

const server = http.Server(app)

server.listen(app.get('port'), () => {
	console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`)
	console.log('Press CTRL-C to stop\n')
})

module.exports = server
