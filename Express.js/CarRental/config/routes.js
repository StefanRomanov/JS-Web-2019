const restrictedPages = require('./auth');
const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const carController = require('../controllers/car');


module.exports = app => {
    app.get('/', homeController.index);

    app.get('/user/login',restrictedPages.isAnonymous, userController.loginGet);
    app.get('/user/register', restrictedPages.isAnonymous ,userController.registerGet);
    app.post('/user/logout', restrictedPages.isAuthed , userController.logout);
    app.post('/user/login',  restrictedPages.isAnonymous ,userController.loginPost);
    app.post('/user/register', userController.registerPost);
    app.get('/user/rents', restrictedPages.isAuthed, userController.rentsGet);

    app.get('/car/add', restrictedPages.hasRole('Admin'), carController.addGet);
    app.post('/car/add', restrictedPages.hasRole('Admin'), carController.addPost);
    app.get('/car/all', carController.allGet);
    app.get('/search', carController.search);
    app.get('/car/rent/:id', restrictedPages.isAuthed, carController.rentGet);
    app.post('/car/rent/:id', restrictedPages.isAuthed, carController.rentPost);
    app.get('/car/edit/:id', restrictedPages.hasRole('Admin'), carController.editGet);
    app.post('/car/edit/:id', restrictedPages.hasRole('Admin'), carController.editPost);

    

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });

};