const User = require('../model/user')

exports.createUser = (req, res, next) => {
    const reqBody = req.body;
    const file = req.file;
    console.log('reqimage', file)
    console.log('req', reqBody)
    let imageurl = '';
    if (file) {
        imageurl = `/image/${file.filename}`
    }
    const user = new User({
        firstname: reqBody.firstname,
        lastname: reqBody.lastname,
        email: reqBody.email,
        phone: reqBody.phone,
        profile: imageurl
    })
    user.save()
        .then(user => {
            res
                .status(200)
                .json({
                    message: "User created.",
                    value: user._id
                })
        })
        .catch(error => {
            console.log(error.message)
            res
                .status(400)
                .send(error.message)
        })
}

exports.getUserList = (req, res, next) => {
    User
        .find({})
        .then(users => {
            res
                .status(200)
                .json({
                    message: "User list found.",
                    value: users
                })
        })
        .catch(error => {
            console.log(error.message)
            res
                .status(400)
                .send(error.message)
        })
}

exports.getUserById = (req, res, next) => {
    const id = req.params.id;
    User
        .find({ _id: id })
        .then(user => {
            res
                .status(200)
                .json({
                    message: "User found.",
                    value: user
                })
        })
        .catch(error => {
            console.log(error.message)
            res
                .status(400)
                .send(error.message)
        })
}


exports.udpateUser = (req, res, next) => {
    const id = req.params.id;
    const reqBody = req.body;
    User
        .updateOne({
            _id: id,
            $set: {
                firstname: reqBody.firstname,
                lastname: reqBody.lastname,
                email: reqBody.email,
                phone: reqBody.phone
            }
        })
        .then(users => {
            if (users.nModified > 0) {
                res
                    .status(200)
                    .json({
                        message: 'User updated sucessfully.'
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: 'No such user.'
                    })
            }
        })
        .catch(error => {
            console.log(error.message)
            res
                .status(400)
                .send(error.message)
        })
}


exports.removeUser = (req, res, next) => {
    const id = req.params.id;
    User
        .deleteOne({ _id: id })
        .then(users => {
            if (users.deletedCount > 0) {
                res
                    .status(200)
                    .json({
                        message: "User deleted.",
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: 'No user founf.'
                    })
            }

        })
        .catch(error => {
            console.log(error.message)
            res
                .status(400)
                .send(error.message)
        })
}