const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/user/register', restrictedPages.isAnonymous ,controllers.user.registerGet);
    app.post('/user/register', restrictedPages.isAnonymous ,controllers.user.registerPost);
    app.get('/user/logout', restrictedPages.isAuthed, controllers.user.logout);
    app.get('/user/login', restrictedPages.isAnonymous ,controllers.user.loginGet);
    app.post('/user/login', restrictedPages.isAnonymous ,controllers.user.loginPost);

    app.get('/article/create',restrictedPages.isAuthed, controllers.article.createGet);
    app.post('/article/create',restrictedPages.isAuthed, controllers.article.createPost);
    app.get('/article/all', controllers.article.all);
    app.get('/article/details/:id', controllers.article.details);
    app.get('/article/edit/:id',restrictedPages.isAuthed, controllers.article.editGet);
    app.post('/article/edit/:id',restrictedPages.isAuthed, controllers.article.editPost);
    app.get('/article/history/:id',restrictedPages.isAuthed, controllers.article.history);
    app.get('/article/lock/:id',restrictedPages.isAdmin, controllers.article.lock);
    app.get('/article/unlock/:id', restrictedPages.isAdmin, controllers.article.unlock);
    app.get('/article/latest', controllers.article.latest);

    app.get('/edit/:id',restrictedPages.isAuthed, controllers.edit.detailsGet);

    app.post('/search', controllers.home.search);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};