const { Session } = require('../models/session')
const validator = require('validator')

//sms/users/register
module.exports.createSession = function (req, res) {
    const body = req.body
    const session = new Session(body)
    console.log("REGISTERRRRR =>", session);
    session.save()
        .then((session) => {
            console.log("REGISTERRRRR =>", session);
            res.send({
                room: session.room
            })
        })
        .catch((err) => {
            res.status(406)
            res.send(err)
        })
}

module.exports.getSessionDetails = function (req, res) {
    const id = req.params.id

    Session.findById(id)
        .then((session) => {
            console.log("GET DETAILS =>", session);
            res.send({
                room: session.room
            })
        })
        .catch((err) => {
            res.status(406)
            res.send(err)
        })
}


module.exports.updateSessionDetails = function (req, res) {
    const id = req.params.id;
    const body = req.body;

    Session.findByIdAndUpdate(id, { $push: body }, { new: true, runValidators: true })
        .then((session) => {
            if (session) {
                res.json({})
            } else {
                res.json(session)
            }
        })
}