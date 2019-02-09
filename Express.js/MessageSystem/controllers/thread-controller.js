const Thread = require('../models/Thread');
const User = require('../models/User');
const Message = require('../models/Message');

module.exports = {
    find: (req, res) => {
        let otherUsername = req.body.username;

        User.findOne()
            .where('username').equals(otherUsername)
            .then(user => {
                if (!user) {
                    res.locals.globalError = 'No such user !';
                    res.redirect('/');
                    return;
                }
                Thread.find({
                    'users': { '$in': user._id }
                })
                    .then(threads => {
                        if (threads.length === 0) {
                            Thread.create({
                                users: [req.user.id, user.id]
                            })
                                .then(() => {
                                    res.redirect(`/threads/${otherUsername}`)
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.locals.globalError = 'Something went wrong !';
                                    res.render('home/home');
                                    return;
                                });
                        } else {
                            res.redirect(`/threads/${otherUsername}`)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.locals.globalError = 'Something went wrong !';
                        res.render('home/home');
                        return;
                    });
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Something went wrong !';
                res.render('home/home');
                return;
            });
    },

    open: (req, res) => {
        let otherUser = req.params.otherUser;
        if (otherUser === req.user.username) {
            res.locals.globalError = 'Do not speak with yourself, brah !';
            res.render('home/home');
            return;
        }
        User.findOne()
            .where('username').equals(otherUser)
            .then(user => {
                Thread.findOne({
                    'users': { '$in': [user._id, req.user._id] }
                })
                    .then(thread => {
                        Message.find()
                            .where('thread').equals(thread._id)
                            .populate('user')
                            .then(messages => {
                                for (let message of messages) {
                                    if (message.user.id === user.id) {
                                        message.isRight = true;
                                    }
                                    if (isImage(message.content)) {
                                        message.isImage = true;
                                    }
                                }
                                let isBlocked = false;
                                let weBlocked = false;

                                if (req.user.blockedUsers.includes(otherUser)) {
                                    isBlocked = true;
                                }
                                if (user.blockedUsers.includes(req.user.username)) {
                                    weBlocked = true;
                                }

                                res.render('chatroom', {
                                    messages,
                                    thread: thread.id,
                                    weBlocked,
                                    isBlocked,
                                    otherUser
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.locals.globalError = 'Oops. Something went wrong :(';
                                res.render('home/home');
                                return;
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.locals.globalError = 'Oops. Something went wrong :(';
                        res.render('home/home');
                        return;
                    })
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Oops. Something went wrong :(';
                res.render('home/home');
                return;
            })
    },
    send: (req, res) => {
        let otherUser = req.params.otherUser;
        let messageContent = req.body.message;
        let threadId = req.body.threadId;

        User.findOne()
            .where('username').equals(otherUser)
            .then(user => {
                Message.create({
                    user: user.id,
                    content: messageContent,
                    thread: threadId
                })
                    .then(() => {
                        res.redirect(`/threads/${otherUser}`)
                    })
                    .catch(err => {
                        console.log(err);
                        res.locals.globalError = 'Oops. Something went wrong :(';
                        res.render('home/home');
                        return;
                    })
            })
    },

    delete: (req, res) => {
        let id = req.params.id;

        Thread.findByIdAndDelete(id)
            .then(thread => {
                Message.deleteMany()
                    .where('thread').equals(thread.id)
                    .then(() => {
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                        res.locals.globalError = 'Oops. Something went wrong :(';
                    })
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Deletion unsuccesful';
                res.render('home/home');
                return;
            })
    }
}

function isImage(string) {
    if (string.endsWith('.jpeg') || string.endsWith('.jpg') || string.endsWith('.png')) {
        return true;
    }
    return false;
}