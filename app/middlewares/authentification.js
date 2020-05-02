const { User } = require('../models/user')

const authenticateUser = function (req, res, next) {
    // console.log(req);
    const token = req.header('x-auth')
    User.findByToken(token)
        .then((user) => {
            if (user) {
                req.user = user,
                    req.token = token
                next()
            }
            else {
                res.status('401').send({ notice: 'token not available' })
            }
        })
        .catch((err) => {
            console.log("vatchhhhh");
            const errorData = { message: 'Unauthorised user. Please login again!' }
            res.status('401').json(errorData);
        })
}

module.exports = { authenticateUser }