const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const env = process.env.NODE_ENV || 'development';


const config = require('./config')[env];

module.exports = app => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        secret: '123456',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
            if (req.user.roles.indexOf('Admin') !== -1) {
                res.locals.isAdmin = true;
            }
        }
        next();
    });

    app.set('view engine', '.hbs');

    app.use(express.static(path.join(config.rootPath, 'static')));
};