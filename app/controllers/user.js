const { User } = require('../models/user')
const validator = require('validator')

//sms/users/register
module.exports.register = function (req, res) {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.send({ // This is done because even the encrypted password is not sent
                _id: user._id,
                username: user.username,
                email: user.email,
                mobile: user.mobile
            })
        })
        .catch((err) => {
            res.status(406)
            res.send(err)
        })
}

//sms/users/login
//User can login with email or mobile number
//The property name from the front end while posting is mobileOrEmail
module.exports.login = function (req, res) {
    const body = req.body
    var isEmailOrMobile = ''
    if (validator.isEmail(body.mobileOrEmail)) {
        isEmailOrMobile = "email"
    } else {
        isEmailOrMobile = "mobile"
    }
    User.findByCredentials(body.mobileOrEmail, isEmailOrMobile, body.password)
        .then((user) => {
            return user.generateToken()
        })
        .then((token) => {
            res.send({
                token: token //token is string, so we are sending it as an object, because axios cant read it from x-auth headers field
            })
        })
        .catch((err) => {
            res.status(401)
            res.send(err)
        })
}

//sms/users/account 
module.exports.account = function (req, res) {
    const { user } = req
    res.send(user)
}

//sms/users/logout
module.exports.logout = function (req, res) {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(() => {
            res.send("Succesfully logged out")
        })
        .catch((err) => {
            res.send(err)
        })
}


