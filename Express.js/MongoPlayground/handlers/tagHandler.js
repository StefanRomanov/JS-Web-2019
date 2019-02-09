const formidable = require('formidable');
const Tag = require('mongoose').model('Tag');
const responseHandler = require('../web/responseHandler');

module.exports = (req, res) => {
    if (req.pathname === '/generateTag' && req.method === 'POST') {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                responseHandler.Error(res, err);
                return;
            }

            Tag.create({
                name: fields.tagName,
                images: []
            }).then(tag => {
                responseHandler.Redirect(res, '/');
            }).catch(err => {
                responseHandler.Error(res, err);
                return;
            });
        });
    } else {
        return true;
    }
};
