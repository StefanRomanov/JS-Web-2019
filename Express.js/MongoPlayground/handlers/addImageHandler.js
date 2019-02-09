const formidable = require('formidable');
const Image = require('mongoose').model('Image');
const Tag = require('mongoose').model('Tag');
const responseHandler = require('../web/responseHandler');
const repo = require('../config/repository');

function addImage(req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            responseHandler.Error(res,err);
            return;
        }

        let tagIds = fields.tagsID.split(',').filter(e => e !== '');

        Image.create({
            url: fields.imageUrl,
            title: fields.imageTitle,
            description: fields.description,
            tags: tagIds

        })
        .then(image => {
            return Tag.updateMany(
                { '_id': { '$in': image.tags } },
                { '$push': { 'images': image._id } }
            );

        }).then(() => {
            responseHandler.Redirect(res, '/');
        })
        .catch(err => {
            responseHandler.Error(res, err);
            return;
        });
    });
}

function deleteImg(req, res) {
    repo.deleteImage(req.pathquery.id)
        .then(() => {
            responseHandler.Redirect(res, '/');
        })
        .catch(err => {
            responseHandler.Error(res, err);
            return;
        });
}

module.exports = (req, res) => {
    if (req.pathname === '/addImage' && req.method === 'POST') {
        addImage(req, res);
    } else if (req.pathname === '/delete' && req.method === 'GET') {
        deleteImg(req, res);
    } else {
        return true;
    }
};
