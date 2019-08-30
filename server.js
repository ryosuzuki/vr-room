const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const socketio = require('socket.io')
const qualisys = require('./qualisys.js')
const app = express()
const server = http.Server(app)
const io = socketio(server)

const mocap = false
if (mocap) {
  qualisys(io)
}

app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/'))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

server.listen(8080, () => {
  console.log('listening on 8080')
})

io.on('connection', (socket) => {
  console.log('socket connected')

  socket.on('click', (data) => {
    console.log(data)
  })

  socket.on('teleport', (data) => {
    console.log(data)
    socket.broadcast.emit('teleport', data)
  })

  socket.on('move', (data) => {
    console.log(data)
  })
})
