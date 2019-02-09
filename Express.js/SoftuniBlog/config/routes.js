const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const articleController = require('../controllers/article');
const auth = require('./auth');

module.exports = (app) => {
    app.get('/', homeController.index);
    app.get('/user/register',auth.isAnonymous, userController.registerGet);
    app.post('/user/register', auth.isAnonymous, userController.registerPost);

    app.get('/user/login', auth.isAnonymous, userController.loginGet);
    app.post('/user/login', auth.isAnonymous, userController.loginPost);

    app.get('/user/logout',auth.isAuthed, userController.logout);

    app.get('/article/create',auth.isAuthed, articleController.createGet);
    app.post('/article/create', auth.isAuthed, articleController.createPost);

    app.get('/article/edit/:id', auth.isAuthed, articleController.editGet);
    app.post('/article/edit/:id', auth.isAuthed, articleController.editPost);
    app.get('/article/delete/:id', auth.isAuthed, articleController.deleteGet);
    app.post('/article/delete/:id', auth.isAuthed, articleController.deletePost);
    app.get('/article/details/:id', articleController.detailsGet);
};

