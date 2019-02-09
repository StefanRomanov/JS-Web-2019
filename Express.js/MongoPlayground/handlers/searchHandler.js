const formidable = require('formidable');
const responseHandler = require('../web/responseHandler');
const repo = require('../config/repository');
const imageDrawer = require('../util/imageDrawer');
const fs = require('fs');


const resultshHtmlPath = './views/results.html';


module.exports = (req, res) => {
    if (req.pathname === '/search') {

        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                responseHandler.Error(res, err);
                return;
            }

            if (!fields.limit) {
                fields.limit = 10;
            }

            if (!fields.tagName && !fields.afterDate && !fields.beforeDate) {
                repo.findAll(fields,res)
                    .then(images => {
                        fs.readFile(resultshHtmlPath, (err, data) => {
                            if (err) {
                                responseHandler.Error(res, err);
                                return;
                            }
                            let html = imageDrawer(images, data);

                            responseHandler.OK(res, html);
                        });
                    })
                    .catch(err => {
                        responseHandler.Error(res, err);
                    });
            } else {
                repo.findByTagsAndDate(fields,res)
                    .then(images => {
                        fs.readFile(resultshHtmlPath, (err, data) => {
                            if (err) {
                                responseHandler.Error(res, err);
                                return;
                            }
                            let html = imageDrawer(images, data);

                            responseHandler.OK(res, html);
                        });
                    })
                    .catch(err => {
                        responseHandler.Error(res, err);
                    });
            }
            
        });
    } else {
        return true;
    }
};
