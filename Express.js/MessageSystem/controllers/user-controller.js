const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: []
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({ username: reqUser.username });
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/login');
        }
    },
    block: (req, res) => {
        let blockedUser = req.params.otherUser;

        User.findById(req.user.id)
            .then(user => {
                user.blockedUsers.push(blockedUser);
                user.save()
                    .then(() => {
                        res.redirect(`/threads/${blockedUser}`);
                    })
                    .catch(err => {
                        console.log(err);
                        res.locals.globalError = 'Oops. Something went wrong :('
                        res.render('home/home');
                        return;
                    })
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Oops. Something went wrong :('
                res.render('home/home');
                return;
            })
    },

    unblock: (req, res) => {
        let unblockedUser = req.params.otherUser;

        User.findById(req.user.id)
            .then(user => {
                user.blockedUsers.remove(unblockedUser);
                user.save()
                    .then(() => {
                        res.redirect(`/threads/${unblockedUser}`);
                    })
                    .catch(err => {
                        console.log(err);
                        res.locals.globalError = 'Oops. Something went wrong :('
                        res.render('home/home');
                        return;
                    })
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Oops. Something went wrong :('
                res.render('home/home');
                return;
            })
    }
};