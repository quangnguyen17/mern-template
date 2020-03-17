const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { secret } = require('../config/jwt.config');
const User = require('../models/User');

module.exports = {
    // User
    getAllUsers(req, res) {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.json(err));
    },
    getCurrentUser(req, res) {
        const decoded = jwt.decode(req.cookies.usertoken, { complete: true });
        const id = decoded.payload._id;

        User.findOne({ _id: id })
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },
    getUserById(req, res) {
        User.findOne(req.body)
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },
    // Login, Register, Logout
    register(req, res) {
        const user = new User(req.body);
        user.save()
            .then(() => {
                res.cookie("usertoken", jwt.sign({ _id: user._id }, secret), { httpOnly: true })
                    .json({ msg: "success", user: user });
            })
            .catch(err => res.json(err));
    },
    login(req, res) {
        const { username, password } = req.body;
        User.findOne({ username: username })
            .then(user => {
                if (user === null) {
                    res.json({ msg: `User not found with username ${username}` });
                } else {
                    bcrypt.compare(password, user.password)
                        .then(passwordValid => {
                            if (passwordValid) {
                                res.cookie("usertoken", jwt.sign({ _id: user._id }, secret), { httpOnly: true })
                                    .json({ msg: "success" });
                            } else {
                                res.json({ msg: "Invalid Password, Please try again! :(" });
                            }
                        }).catch(err => res.json({ msg: "Invalid Login Attempt, Please try again! :(" }));
                }
            }).catch(err => res.json(err));
    },
    logout(req, res) {
        res.clearCookie("usertoken", { path: '/' });
        res.json({ msg: "cookies cleared, user logged out." });
    }
}
