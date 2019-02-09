const Article = require('../models/Article');
const Edit = require('../models/Edit');
const User = require('../models/User');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },
    createPost: (req, res) => {
        let { title,content} = req.body;

        let article = new Article({
            title,
            edits: [],
            content
        });
        let edit = new Edit({
            content,
            author: req.user.id,
            article: article
        })

        article.edits.push(edit);

        Promise.all([article.save(), edit.save()])
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Creation unsuccessful !';
                res.render('home/index');
            })
    },
    latest: (req, res) => {
        Article.find()
            .sort({ creationDate: 'descending' })
            .limit(1)
            .then(articles => {
                if (articles.length === 0) {
                    res.locals.globalError = 'There are no articles present !'
                    res.render('home/index')
                    return;
                }
                res.redirect(`/article/details/${articles[0].id}`);
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Oops. Something went wrong !';
                res.render('home/index');
            })
    },
    editGet: (req, res) => {
        let id = req.params.id;

        Article.findById(id)
            .then(article => {
                res.render('article/edit', article);
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Creation unsuccessful !';
                res.render('home/index');
            })
    },
    editPost: (req, res) => {
        let id = req.params.id;
        let { content } = req.body;

        Article.findById(id)
            .then(article => {
                if (content === "") {
                    res.locals.globalError = 'Please enter content !';
                    res.render('article/edit', article)
                    return;
                }

                if (article.isLocked) {
                    res.locals.globalError = 'Cannot edit locked article !';
                    res.render('article/edit', article)
                    return;
                }

                let edit = new Edit({
                    content,
                    article,
                    author: req.user.id
                })

                edit.save()
                    .then(edit => {
                        article.edits.push(edit);
                        article.content = content;

                        article.save()
                            .then(() => {
                                res.redirect(`/article/details/${id}`);
                            })
                            .catch(err => {
                                console.log(err);
                                res.locals.globalError = 'Article was not updated !';
                                res.render('home/index');
                                return;
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.locals.globalError = 'Edit was not created !';
                        res.render('home/index');
                        return;
                    })
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Edit unsuccessful !';
                res.render('home/index');
            })
    },
    all: (req, res) => {
        Article.find()
            .then(articles => {
                res.render('article/all-articles', { articles } );
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Oops. Something went wrong !';
                res.render('home/index');
            })
    },
    details: (req, res) => {
        let id = req.params.id;
        Article.findById(id)
            .then(article => {
                res.render('article/article', article);
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Oops. Something went wrong !';
                res.render('home/index');
            })
    },
    history: (req, res) => {
        let id = req.params.id;
        Edit.find()
            .where('article').equals(id)
            .sort({creationDate : 'descending'})
            .populate('author')
            .populate('article')
            .then(edits => {
                let articleTitle = edits[0].article.title;
                res.render('article/history', { edits , articleTitle });
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Oops. Something went wrong !';
                res.render('home/index');
            });
    },
    lock: (req, res) => {
        let id = req.params.id;
        Article.findById(id)
            .then(article => {
                article.isLocked = true;
                return article.save();
            })
            .then(() => {
                res.redirect(`/article/edit/${id}`);
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Oops. Something went wrong !';
                res.render('home/index');
            })
    },
    unlock: (req, res) => {
        let id = req.params.id;
        Article.findById(id)
            .then(article => {
                article.isLocked = false;
                return article.save();
            })
            .then(() => {
                res.redirect(`/article/edit/${id}`);
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Oops. Something went wrong !';
                res.render('home/index');
            })
    }
}