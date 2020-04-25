const mongoose = require('mongoose')

//db configuration
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/sms', { userNewUrlParser: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connected to db")
    })
    .catch((err) => {
        console.log('Error connectong to the db', err)
    })

module.exports = mongoose