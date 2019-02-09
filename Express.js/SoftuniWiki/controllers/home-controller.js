const Article = require('../models/Article');
const Edit = require('../models/Edit');
const User = require('../models/User');

const placeHolder = { title: 'No articles so far !', content: 'Empty !'}

module.exports = {
    index: (req, res) => {
        Article.find()
            .sort({ creationDate: 'descending' })
            .limit(3)
            .then(articles => {
                let latest = articles[0];
                if (!latest) {
                    latest = placeHolder;
                } else {
                    let contentString = latest.content.split(' ')
                        .slice(0,50)
                        .join(' ');
                    latest.content = contentString;
                }

                res.render('home/index', { recentArticles: articles, latest});
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Oops.Something went wrong !';
                res.render('home/index');
            })
        
    },
    search: (req, res) => {
        let { search } = req.body;
        Article.find()
            .where('title').regex(new RegExp(`.*${search}.*`,'i'))
            .then(articles => {
                res.render('article/search-results', { articles, search })
            })
            .catch(err => {
                console.log(err);
                res.locals.globalError = 'Oops.Something went wrong !';
                res.render('home/index');
            })
    }
};