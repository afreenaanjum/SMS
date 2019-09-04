const express = require('express')
const mongoose = require('./config/database')
const { app } = require('./socket')
const { io } = require('./socket')
const { server } = require('./socket')
const path = require('path')
const router = require('./config/routes')


// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/sms/build")))
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.json())
app.use(express.static(publicDirectoryPath))


app.use('/', router)
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/sms/build/index.html"))
})

const port = process.env.PORT || 3005

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
