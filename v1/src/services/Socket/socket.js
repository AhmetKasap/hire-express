const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)

const io = socketio(server, {
    cors : '*', 
    methods : ["GET", "POST"]
})


io.on('connection', (socket) => {  
    console.log(socket.id)

    socket.on('chat', response => { 
        console.log(response)

        socket.emit('chat', response) 
    })

    
})

server.listen(3001, () => {
    console.log("socket running...")
})