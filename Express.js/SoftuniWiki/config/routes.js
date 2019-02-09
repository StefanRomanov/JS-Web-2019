const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/user/register', controllers.user.registerGet);
    app.post('/user/register', controllers.user.registerPost);
    app.get('/user/logout', controllers.user.logout);
    app.get('/user/login', controllers.user.loginGet);
    app.post('/user/login', controllers.user.loginPost);

    app.get('/article/create', controllers.article.createGet);
    app.post('/article/create', controllers.article.createPost);
    app.get('/article/all', controllers.article.all);
    app.get('/article/details/:id', controllers.article.details);
    app.get('/article/edit/:id', controllers.article.editGet);
    app.post('/article/edit/:id', controllers.article.editPost);
    app.get('/article/history/:id', controllers.article.history);
    app.get('/article/lock/:id', controllers.article.lock);
    app.get('/article/unlock/:id', controllers.article.unlock);
    app.get('/article/latest', controllers.article.latest);

    app.get('/edit/:id', controllers.edit.detailsGet);

    app.post('/search', controllers.home.search);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};