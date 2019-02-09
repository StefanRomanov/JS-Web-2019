const User = require('mongoose').model('User');
const encryprtion = require('../util/encryption');

module.exports.registerGet = (req, res) => {
    res.render('user/register');
};

module.exports.registerPost = (req, res) => {
    let user = req.body;

    if (user.password && user.password !== user.confirmedPassword) {
        let error = 'Passwords do not match';

        res.render('user/register', { error });
        return;
    }

    let salt = encryprtion.generateSalt();
    user.salt = salt;

    if (user.password) {
        let hashedPassword = encryprtion.generateHashedPassword(salt, user.password);
        user.password = hashedPassword;

        User.create(user)
            .then(user => {
                req.login(user, (err, user) => {
                    if (err) {
                        res.render('user/register', {
                            error: 'Auth not working !'
                        });
                        return;
                    }
                    res.redirect('/');
                });
            })
            .catch(err => {
                res.render('user/register', {
                    error: 'Something went wrong !'
                });
                return;
            });
    }
};

module.exports.loginGet = (req, res) => {
    res.render('user/login');
};

module.exports.loginPost = (req, res) => {
    let userToLogin = req.body;

    User.findOne({ username: userToLogin.username })
        .then(user => {
            if (!user || !user.authenticate(userToLogin.password)) {
                res.render("user/login", { error: "Invalid credentials!" });
            } else {
                req.logIn(user, (error, user) => {
                    if (error) {
                        res.render("user/login", { error: "Authentication not working!" });

                        return;
                    }

                    res.redirect("/");
                });
            }
        });
};

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}