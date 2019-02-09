const url = require("url");
const fs = require("fs");
const path = require("path");
const multiparty = require("multiparty");
const shortId = require("shortid");

const Product = require('../models/Product');
const Category = require('../models/Category');


module.exports.addGet = (req, res) => {
    Category.find()
        .then(categories => {
            res.render('product/add', { categories });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.addPost = async (req, res) => {
    let productObj = req.body;
    productObj.image = req.file.destination + '\\' + req.file.originalname;
    productObj.creator = req.user._id;

    let product = await Product.create(productObj);
    let category = await Category.findById(product.category);
    category.products.push(product._id);
    category.save();
    res.redirect('/');
};

module.exports.editGet = (req, res) => {
    let id = req.params.id;
    Product.findById(id)
        .then(product => {
            if (!product) {
                res.sendStatus(404);
                return;
            }

            Category.find()
                .then(categories => {
                    res.render('product/edit', { product, categories });
                });
        });
};

module.exports.editPost = async (req, res) => {
    let id = req.params.id;
    let editedProduct = req.body;

    let product = await Product.findById(id).where('buyer').equals(null);
    if (!product) {
        res.redirect(`/?error=${encodeURIComponent('Product was not found !')}`);
        return;
    }
    if (product.creator.equals(req.user._id) || req.user.roles.indexOf("Admin") >= 0) {
        product.name = editedProduct.name;
        product.description = editedProduct.description;
        product.price = editedProduct.price;

        if (req.file) {
            product.image = req.file.destination + '\\' + req.file.originalname;
        }

        if (product.category.toString() !== editedProduct.category) {

            Category.findById(product.category)
                .then(currentCategory => {
                    Category.findById(editedProduct.category)
                        .then(nextCategory => {
                            let index = currentCategory.products.indexOf(product._id);
                            if (index >= 0) {
                                currentCategory.products.splice(index, 1);
                            }
                            currentCategory.save();

                            nextCategory.products.push(product._id);
                            nextCategory.save();
                            product.category = editedProduct.category;

                            product.save()
                                .then(() => {
                                    res.redirect(`/?success=${encodeURIComponent('Product was edited successfuly !')}`);
                                });
                        });
                })
                .catch(err => {
                    console.log(err);
                });

        } else {
            product.save()
                .then(() => {
                    res.redirect(`/?success=${encodeURIComponent('Product was edited successfuly !')}`);
                });
        }
    } else {
        let error = `error=${encodeURIComponent("Product is not yours!")}`;
        res.redirect(`/?${error}`);
        return;
    }
};

module.exports.deleteGet = (req, res) => {
    let id = req.params.id;

    Product.findById(id)
        .where('buyer').equals(null)
        .then(product => {
        if (!product) {
            res.sendStatus(404);
            return;
        }
        if (product.creator.equals(req.user._id) || req.user.roles.indexOf("Admin") >= 0) {
            Category.find().then((categories) => {
                res.render("product/delete", {
                    product: product,
                    categories: categories
                });
            });
        } else {
            let error = `error=${encodeURIComponent("Product is not yours!")}`;
            res.redirect(`/?${error}`);
            return;
        }
    }).catch((err) => {
        console.log(err.name);
        res.redirect(
            `/?error=${encodeURIComponent('Product was not found!')}`);
    });
};

module.exports.deletePost = (req, res) => {
    let id = req.params.id;

    Product.findById(id)
        .where('buyer').equals(null)
        .then((product) => {
        if (product.creator.equals(req.user._id) || req.user.roles.indexOf("Admin") >= 0) {
            Category.findById(product.category).then((category) => {
                let index = category.products.indexOf(id);
                if (index >= 0) {
                    category.products.splice(index, 1);
                }

                let filePath = path.normalize(
                    path.join(__dirname, "../" + product.image)
                );


                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });

                category.save();
                Product.findByIdAndRemove(id).then(() => {
                    res.redirect("/?success=" + encodeURIComponent("Product was deleted successfully!"))
                });
            });
        } else {
            let error = `error=${encodeURIComponent("Product is not yours!")}`;
            res.redirect(`/?${error}`);
            return;
        }
    });
};

module.exports.buyGet = (req, res) => {
    let id = req.params.id;

    Product.findById(id).then(product => {
        if (!product) {
            res.sendStatus(404);
            return;
        }

        Category.find().then((categories) => {
            res.render("product/buy", {
                product: product,
                categories: categories
            });
        });
    }).catch((err) => {
        console.log(err.name);
        res.redirect(
            `/?error=${encodeURIComponent('Product was not found!')}`);
    });
};

module.exports.buyPost = (req, res) => {
    let productId = req.params.id;

    Product.findById(productId).then(product => {
        if (product.buyer) {
            let error = `error=${encodeURIComponent("Product was already bought!")}`;
            res.redirect(`/?${error}`);
            return;
        }

        product.buyer = req.user._id;
        product.save().then(() => {
            req.user.boughtProducts.push(productId);
            req.user.save().then(() => {
                res.redirect("/");
            });
        });
    });
};