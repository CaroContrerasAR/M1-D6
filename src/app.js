import express from 'express'
import handlebars from 'express-handlebars'
//import {Server} from 'socket.io' //servidor para websocket

import connectDB from './config/db.config.js'
import {__dirname} from './utils.js'
import viewsRouter from './routes/views.routes.js'
import productsRouter from './routes/products.routes.js'

//import ProductManager from './dao/controllers/ProductManager.controller.mdb.js'

//Inicio
const app=express()
const PORT =process.env.PORT || 5000

// const chat_messages =[]  //almacena chat
// const io = new Server(httpServer, {
//     cors:{
//         origin:"*",
//         methods:["PUT","GET","POST","DELETE","OPTIONS"],
//         credentials:false
//     }
// })
// //servidor escuchando
// io.on('connection', socket=>{
//     socket.emit('messagesLogs',chat_messages)
//     console.log(`Chat actual enviado a ${socket.id}`)

//     socket.on('user_connected', data=>{
//         socket.broadcast.emit('user_connected', data)
//     })
//     //escuchamos al cliente, recibimos un objeto y lo almacenamos
//     socket.on('message', data=>{
//         chat_messages.push(data) 
//         io.emit('messagesLogs', chat_messages) //envia a TODOS
//         // console.log(`Chat actual enviado a ${socket.id}`)
//     })
// })

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars',handlebars.engine())
app.set ('views',`${__dirname}/views`)
app.set('view engine', 'handlebars')
// app.set('io',io)

//Routes
app.use('/',viewsRouter)
app.use('/api/products',productsRouter)

app.use('/static', express.static(`${__dirname}/public`))

//Listener
const server = app.listen(PORT,()=>console.log(`Server Online on Port ${PORT}`))

//Called the Database connection
connectDB()