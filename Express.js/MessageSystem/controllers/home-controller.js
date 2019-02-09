const Thread = require('../models/Thread');

module.exports = {
    index: (req, res) => {

        if (req.user && req.user.roles.includes('Admin')) {
            Thread.find()
                .populate('users')
                .then(threads => {
                    res.render('home/home', { threads });
                    return;
                })
                .catch(err => {
                    res.locals.globalError = 'Something went wrong !';
                    console.log(err);
                    res.render('home/home');
                    return;
                })
        } else {
            res.render('home/home');
        }
    }
}