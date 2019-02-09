const multer = require('multer');
const controllers = require('../controllers');
const auth = require('./auth');

let upload = multer({ dest: '/content/images' });

module.exports = (app) => {
    app.get('/', controllers.home.index);

    app.get('/product/add',auth.isAuthenticated ,controllers.product.addGet);
    app.post('/product/add', auth.isAuthenticated ,upload.single('image'), controllers.product.addPost);
    app.get('/product/edit/:id', auth.isAuthenticated ,controllers.product.editGet);
    app.post('/product/edit/:id', auth.isAuthenticated ,upload.single('image'), controllers.product.editPost);
    app.get('/product/delete/:id', auth.isAuthenticated ,controllers.product.deleteGet);
    app.post('/product/delete/:id', auth.isAuthenticated , controllers.product.deletePost);

    app.get('/category/add', auth.isInRole('Admin') , controllers.category.addGet);
    app.get('/category/:category/products', controllers.category.byCategory);
    app.post('/category/add', auth.isInRole('Admin'),controllers.category.addPost);

    app.get("/user/register", controllers.user.registerGet);
    app.post("/user/register", controllers.user.registerPost);
    app.get("/user/login", controllers.user.loginGet);
    app.post("/user/login", controllers.user.loginPost);
    app.post("/user/logout", auth.isAuthenticated, controllers.user.logout);
};