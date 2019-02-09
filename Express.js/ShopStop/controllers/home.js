const url = require("url");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");

const Product = require('../models/Product');

module.exports.index = (req, res) => {

    let queryData = req.query;

    Product.find({ buyer: null })
        .populate('category')
        .then(products => {
            if (queryData.query) {
                products = products.filter(x => x.name.toLowerCase().includes(queryData.query.toLowerCase()));
            }

            let data = {
                products
            };

            if (req.query.error) {
                data.error = req.query.error;
            } else if (req.query.success) {
                data.success = req.query.success;
            }

            res.render('home/index', data);
        })
        .catch(err => {
            console.log(err);
            return;
        });
}