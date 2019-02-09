const encryption = require('../util/encryption');
const passport = require('passport-local');
const User = require('../models/User');
const Rent = require('../models/Rent');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: async (req, res) => {

        const reqUser = req.body;

        if (!reqUser || !reqUser.repeatPassword) {
            reqUser.error = 'Please fill all fields !';
            res.render('user/register', reqUser);
            return;
        }

        if (reqUser.password !== reqUser.repeatPassword) {
            reqUser.error = 'Passwords does not match !';
            res.render('user/register', reqUser);
            return;
        }

        if (reqUser.password !== reqUser.repeatPassword) {
            reqUser.error = 'Passwords does not match !';
            res.render('user/register', reqUser);
            return;
        }

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, reqUser.password);

        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: ['User']
            })
            req.logIn(user, err => {
                if (err) {
                    userReq.error = err;
                    res.render('user/register', reqUser);
                } else {
                    res.render('/')
                }
            })
        } catch (err) {
            reqUser.error = err;
            res.render('user/register', reqUser);
        }

    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;

        try {
            const user = await User.findOne({
                username: reqUser.username
            })

            if (!user) {
                reqUser.error = 'User not found !';
                res.render('user/login', reqUser);
                return;
            }

            if (!user.authenticate(reqUser.password)) {
                reqUser.error = 'Invalid credentials !';
                res.render('user/login', reqUser);
                return;
            }

            req.logIn(user, err => {
                if (err) {
                    userReq.error = err;
                    res.render('user/login', reqUser);
                } else {
                    res.redirect('/')
                }
            })
        } catch (err) {
            reqUser.error = err;
            res.render('user/login', reqUser);
        }
    },

    rentsGet: (req, res) => {
        let userId = req.user._id;

        Rent.find()
            .where('owner').equals(userId)
            .populate('car')
            .then(rents => {
                let cars = [];

                for (let rent of rents) {
                    let car = rent.car;
                    car.expiresIn = rent.days;
                    cars.push(car);
                }

                res.render('user/rented', { cars })
            })
            .catch(err => {
                console.log(err);
            })
    }
};