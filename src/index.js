import {PORT, DATABASE_NAME} from './config.js'
import {createServer} from './server.js'

let server = createServer(PORT, DATABASE_NAME)