import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ConnectDB from './connectDB.js'
import { Router } from './Routes/index.js';
import { Server as HttpServer } from 'http'
import  { Server as IOServer } from 'socket.io'
import MessageModel from './Models/Messages.model.js'
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)



app.use(express.static('src/public'))  
app.use(cors({exposedHeaders:['*', 'authorization']}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
 //chat con ws

let mensajes = []
MessageModel.find().then(m=> mensajes = m).catch(e=>console.log(e.message))
io.on('connection', socket => {

    socket.emit('mensajes', mensajes)
    socket.on('nuevoMensaje', mensaje => {
        mensajes.push(mensaje)
        io.sockets.emit('mensajes', mensajes)
        const guardar = async () =>{
            MessageModel.create(mensaje)
            .then()
           .catch(e=>console.log(e.message))
        }
        guardar()
    })
})

app.use('/', Router)
//funcion para crear server
export async function createServer(port, dbName){
    await ConnectDB(dbName)
    return httpServer.listen(port, ()=>{
        console.log(`listening on port ${port}`)
    })
}