const UserController = require('../controller/user')
const extractImage = require('../middleware/multer')
const express = require('express');
const router = express.Router();

router.post('/add', extractImage.user, UserController.createUser)

router.get('/list', UserController.getUserList)

router.get('/userInfo/:id', UserController.getUserById)

router.put('/update/:id', UserController.udpateUser)

router.delete('/delete/:id', UserController.removeUser)

module.exports = router;