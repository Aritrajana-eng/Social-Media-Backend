const router = require('express').Router()
const Joi = require('joi')
const verifyToken = require('../middleware/tokenVerification')

const userController = require('../controllers/user.controller')
const friendController = require('../controllers/friend.controller')

router.post('/create-user', userController.createUser)

router.post('/user-login', userController.userLogin)

router.get('/user-detail/:id',verifyToken, userController.userDetails)

router.post('/send-friend-request', verifyToken, friendController.sendFriendRequest)

router.get('/user-notification', verifyToken, userController.notification)

router.put('/friend-request-update', verifyToken, friendController.friendRequestUpdate)

router.get('/get-mutual-friend', verifyToken, friendController.mutualFriendList)

module.exports = router
