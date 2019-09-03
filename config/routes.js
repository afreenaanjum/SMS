const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../app/middlewares/authentification')


const userController = require('../app/controllers/user')


router.post('/sms/users/register', userController.register)
router.post('/sms/users/login', userController.login)
router.post('/sms/users/account', authenticateUser, userController.account)
router.post('/sms/users/logout', authenticateUser, userController.logout)

module.exports = router