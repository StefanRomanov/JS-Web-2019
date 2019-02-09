const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/users/register',restrictedPages.isAnonymous ,controllers.user.registerGet);
    app.post('/users/register', restrictedPages.isAnonymous , controllers.user.registerPost);
    app.get('/users/logout', restrictedPages.isAuthed , controllers.user.logout);
    app.get('/users/login', restrictedPages.isAnonymous , controllers.user.loginGet);
    app.post('/users/login', restrictedPages.isAnonymous , controllers.user.loginPost);

    app.post('/threads/find',restrictedPages.isAuthed , controllers.thread.find);
    app.post('/threads/remove/:id', restrictedPages.hasRole('Admin') ,controllers.thread.delete);
    app.get('/threads/:otherUser', restrictedPages.isAuthed , controllers.thread.open);
    app.post('/threads/:otherUser', restrictedPages.isAuthed , controllers.thread.send);

    app.post('/block/:otherUser', restrictedPages.isAuthed , controllers.user.block);
    app.post('/unblock/:otherUser', restrictedPages.isAuthed , controllers.user.unblock);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};