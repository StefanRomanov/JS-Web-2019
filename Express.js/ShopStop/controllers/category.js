const url = require("url");
const fs = require("fs");
const qs = require("querystring");

const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
    res.render('category/add');
};

        
module.exports.addPost = (req, res) => {
    let category = req.body;
    category.creator = req.user._id;
    Category.create(category)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
    
}

module.exports.byCategory = (req, res) => {
    let categoryName = req.params.category;

    Category.findOne()
        .where('name').equals(categoryName)
        .populate('products')
        .then((category) => {
            if (!category) {
                res.sendStatus(404);
                return;
            }

            res.render('category/products', { category });
        });
};