const express = require('express')
const http = require('http')
const path = require('path')
const socketIo = require('socket.io')
const router = require('./config/routes')


const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const port = process.env.PORT || 3005
const publicDirectoryPath = path.join(__dirname, '../public')


app.use(express.json())
app.use(express.static(publicDirectoryPath))
app.use('/', router)

var urlServer = null, connectionCount = 0, playStateServer = true, playedTimeServer = 0; // URL server has the URL of the existing sesssion

io.on('connection', (socket) => {
    connectionCount = connectionCount + 1;
    console.log('New WebSocket connection')

    socket.on('playPause', (playState) => {
        playStateServer = playState
        //Same playPause state is broadcasted to evryone in that socket
        socket.broadcast.emit('playState', playState)
    })

    socket.on('url', (url) => {
        urlServer = url
        //Same URL is broadcasted to everyone in that socket
        socket.broadcast.emit('updateURL', url)
    })

    //It is listening only from host
    socket.on('onProgress', (state) => {
        playedTimeServer = state.played
        //If user stops the video and host is still playing, to sync it with the host we are doing this
        socket.broadcast.emit('sync', { played: state.played, url: urlServer })
    })

    //This will keep the new users joining existing session updated with the URL
    socket.emit('newConnection', { url: urlServer, playStateServer: playStateServer })



    socket.on('disconnect', () => {
        connectionCount = connectionCount - 1;
        console.log("Disconnected")
        if (connectionCount === 0) {
            // If there are no users in the session, on new connection again the URL is set to null
            urlServer = null;
            playedTimeServer = 0
            playStateServer = true

        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
