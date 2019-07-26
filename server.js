// const peer = require('peer')
// const PeerServer = peer.PeerServer
// const server = PeerServer({ port: 8080, path: '/' })


const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const socketio = require('socket.io')
const qualisys = require('./qualisys.js')
const app = express()
const server = http.Server(app)
const io = socketio(server)

qualisys(io)

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

  socket.on('move', (data) => {
    console.log(data)
  })
})