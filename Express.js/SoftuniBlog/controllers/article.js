const Article = require('../models/Article');
const User = require('../models/User');


module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },

    createPost: (req, res) => {
        let newArticle = req.body;
        newArticle.author = req.user._id;
        newArticle.date = Date.now();

        Article.create(newArticle)
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
                let error = 'Something went wrong !';
                res.render('article/create');
            });
    },

    editGet: (req, res) => {
        let id = req.params.id;

        Article.findById(id)
            .populate('author')
            .then(article => {
                if (article.author.id !== req.user.id && req.user.roles.indexOf('Admin') === -1) {
                    res.redirect('/');
                    return;
                }
                res.render('article/edit', article);
            })
            .catch(err => {
                console.log(err);
                res.redirect('/');
                return;
            });

    },

    editPost: (req, res) => {
        let id = req.params.id;
        let updatedArticle = req.body;
        Article.findById(id)
            .populate('author')
            .then(article => {
                if (article.author.id !== req.user.id && req.user.roles.indexOf('Admin') === -1) {
                    res.redirect('/');
                    return;
                }

                if (!updatedArticle.title || !updatedArticle.content) {
                    updatedArticle.error = 'Fill all fields !';
                    res.render('article/edit', updatedArticle);
                }

                article.title = updatedArticle.title;
                article.content = updatedArticle.content;

                article.save()
                    .then(() => {
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                        res.redirect('/');
                    });
            })
            .catch(err => {
                console.log(err);
                res.redirect('/');
            });
    },

    detailsGet: (req, res) => {
        let id = req.params.id;
        Article.findById(id)
            .populate('author')
            .then(article => {
                if (req.user) {
                    article.canEdit = article.author.id === req.user.id || req.user.roles.indexOf('Admin') > -1;
                } else {
                    article.canEdit = false;
                }

                res.render('article/details', article);
            })
            .catch(err => {
                console.log(err);
                res.redirect('/');
            });
    },
    deleteGet: (req, res) => {
        let id = req.params.id;

        Article.findById(id)
            .populate('author')
            .then(article => {
                if (article.author.id !== req.user.id && req.user.roles.indexOf('Admin') === -1) {
                    res.redirect('/');
                    return;
                }
                res.render('article/delete', article);
            })
            .catch(err => {
                console.log(err);
                res.redirect('/');
                return;
            });

    },

    deletePost: (req, res) => {
        let id = req.params.id;
        Article.findById(id)
            .populate('author')
            .then(article => {
                if (article.author.id !== req.user.id && req.user.roles.indexOf('Admin') === -1) {
                    res.redirect('/');
                    return;
                }
                article.remove()
                    .then(() => {
                        res.redirect('/');
                    })
                    .catch(err => {
                        let error = 'Something went wrong !';
                        console.log(err);
                        res.render('home/index', { error });
                    });
            })
            .catch(err => {
                let error = 'Something went wrong !';
                console.log(err);
                res.render('home/index', { error });
            });
    }
};